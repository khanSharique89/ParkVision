import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)

model = YOLO("yolov8s.pt")

def generate_labels(count):
    labels = []
    rows = ["A","B","C","D","E","F","G","H","I","J"]
    for r in rows:
        for c in range(1, 21):
            labels.append(f"{r}{c}")
            if len(labels) == count:
                return labels
    return labels

def detect_cars_yolo(image):
    results = model(image, verbose=False)
    car_boxes = []
    vehicle_classes = [2, 3, 5, 7]
    for result in results:
        for box in result.boxes:
            cls = int(box.cls[0])
            conf = float(box.conf[0])
            if cls in vehicle_classes and conf > 0.10:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                car_boxes.append((x1, y1, x2, y2))
    return car_boxes

def is_occupied_opencv(roi_bgr, roi_gray, roi_hsv, threshold):
    if roi_bgr is None or roi_bgr.size == 0:
        return False
    edges = cv2.Canny(roi_gray, 30, 100)
    edge_density = np.sum(edges > 0) / edges.size
    sat = roi_hsv[:, :, 1]
    avg_sat = np.mean(sat)
    variance = np.var(roi_gray)
    bright = roi_hsv[:, :, 2]
    dark_pixels = np.sum(bright < 100) / bright.size
    white_pixels = np.sum((sat < 30) & (bright > 200)) / bright.size
    car_score = (edge_density * 150) + (avg_sat / 3) + (variance / 300) + (dark_pixels * 80)
    empty_score = (white_pixels * 100) + (30 - min(avg_sat, 30))
    return car_score > empty_score + threshold

def slot_overlaps_car(slot, car_boxes, overlap_threshold=0.25):
    sx, sy, sw, sh = slot
    slot_area = sw * sh
    if slot_area == 0:
        return False
    for (cx1, cy1, cx2, cy2) in car_boxes:
        ix1 = max(sx, cx1)
        iy1 = max(sy, cy1)
        ix2 = min(sx + sw, cx2)
        iy2 = min(sy + sh, cy2)
        if ix2 > ix1 and iy2 > iy1:
            overlap = (ix2 - ix1) * (iy2 - iy1) / slot_area
            if overlap > overlap_threshold:
                return True
    return False

def detect_slots(image, rows, cols):
    height, width = image.shape[:2]
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    car_boxes = detect_cars_yolo(image)
    yolo_found = len(car_boxes) > 0

    margin_x = int(width * 0.02)
    margin_y = int(height * 0.02)
    usable_w = width - 2 * margin_x
    usable_h = height - 2 * margin_y
    slot_w = usable_w // cols
    slot_h = usable_h // rows

    labels = generate_labels(rows * cols)
    results = []

    avg_variance = np.var(gray)
    if avg_variance > 1500:
        threshold = 40
    elif avg_variance > 800:
        threshold = 25
    else:
        threshold = 15

    for r in range(rows):
        for c in range(cols):
            x = margin_x + c * slot_w
            y = margin_y + r * slot_h
            w = slot_w - 4
            h = slot_h - 4
            idx = r * cols + c

            middle = rows // 2
            if rows > 2 and r == middle:
                results.append({
                    "id": labels[idx],
                    "status": "free",
                    "x": int(x), "y": int(y),
                    "w": int(w), "h": int(h),
                })
                continue

            if yolo_found:
                occupied = slot_overlaps_car((x, y, w, h), car_boxes)
            else:
                roi_bgr = image[y:y+h, x:x+w]
                roi_gray = gray[y:y+h, x:x+w]
                roi_hsv = hsv[y:y+h, x:x+w]
                occupied = is_occupied_opencv(roi_bgr, roi_gray, roi_hsv, threshold)

            results.append({
                "id": labels[idx],
                "status": "occupied" if occupied else "free",
                "x": int(x), "y": int(y),
                "w": int(w), "h": int(h),
            })

    return results, len(car_boxes)


@app.route('/detect', methods=['POST'])
def detect():
    try:
        data = request.json
        image_data = data['image'].split(',')[1]
        image_bytes = base64.b64decode(image_data)
        np_arr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image"}), 400

        rows = data.get('rows', 2)
        cols = data.get('cols', 4)

        image = cv2.resize(image, (640, 480))

        results, cars_detected = detect_slots(image, rows, cols)
        occupied = sum(1 for s in results if s["status"] == "occupied")

        return jsonify({
            "success": True,
            "slots": results,
            "total": len(results),
            "cars_detected": cars_detected,
            "occupied": occupied,
            "free": len(results) - occupied,
            "method": "YOLO" if cars_detected > 0 else "OpenCV"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ParkVision Detection API running"})


if __name__ == '__main__':
    app.run(port=5001, debug=True)