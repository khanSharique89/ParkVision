import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app)

def generate_labels(count):
    labels = []
    rows = ["A","B","C","D","E","F","G","H","I","J"]
    for r in rows:
        for c in range(1, 11):
            labels.append(f"{r}{c}")
            if len(labels) == count:
                return labels
    return labels

def detect_slots(image, rows, cols):
    height, width = image.shape[:2]
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Generate grid
    margin_x = int(width * 0.02)
    margin_y = int(height * 0.02)
    usable_w = width - 2 * margin_x
    usable_h = height - 2 * margin_y
    slot_w = usable_w // cols
    slot_h = usable_h // rows

    labels = generate_labels(rows * cols)
    results = []

    for r in range(rows):
        for c in range(cols):
            x = margin_x + c * slot_w
            y = margin_y + r * slot_h
            w = slot_w - 4
            h = slot_h - 4

            roi_bgr = image[y:y+h, x:x+w]
            roi_gray = gray[y:y+h, x:x+w]
            roi_hsv = hsv[y:y+h, x:x+w]

            if roi_bgr.size == 0:
                continue

            # Feature 1: Edge density
            edges = cv2.Canny(roi_gray, 30, 100)
            edge_density = np.sum(edges > 0) / edges.size

            # Feature 2: Color saturation
            sat = roi_hsv[:, :, 1]
            avg_sat = np.mean(sat)

            # Feature 3: Variance
            variance = np.var(roi_gray)

            # Feature 4: Brightness
            bright = roi_hsv[:, :, 2]
            avg_bright = np.mean(bright)

            # Feature 5: Dark pixel ratio (cars are darker than ground)
            dark_pixels = np.sum(bright < 100) / bright.size

            # Feature 6: White line detection
            # Empty slots have more white lines visible
            white_pixels = np.sum((sat < 30) & (bright > 200)) / bright.size

            # Score
            # Cars: high edge density, high variance, high saturation, dark pixels
            # Empty: white lines visible, uniform gray
            car_score = (edge_density * 150) + (avg_sat / 3) + (variance / 300) + (dark_pixels * 80)
            empty_score = (white_pixels * 100) + (30 - min(avg_sat, 30))

            occupied = car_score > empty_score + 25

            idx = r * cols + c
            results.append({
                "id": labels[idx],
                "status": "occupied" if occupied else "free",
                "x": int(x),
                "y": int(y),
                "w": int(w),
                "h": int(h),
            })

    return results


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

        results = detect_slots(image, rows, cols)
        occupied = sum(1 for s in results if s["status"] == "occupied")

        return jsonify({
            "success": True,
            "slots": results,
            "total": len(results),
            "cars_detected": occupied
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "OpenCV API is running"})


if __name__ == '__main__':
    app.run(port=5001, debug=True)