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
        for c in range(1, 11):
            labels.append(f"{r}{c}")
            if len(labels) == count:
                return labels
    return labels

def detect_slots_from_cars(image, total_slots):
    """
    Uses YOLO to detect cars, then infers free slots
    based on the parking area layout
    """
    height, width = image.shape[:2]

    # Detect cars with YOLO
    results = model(image, verbose=False)
    car_boxes = []
    vehicle_classes = [2, 3, 5, 7]

    for result in results:
        for box in result.boxes:
            cls = int(box.cls[0])
            conf = float(box.conf[0])
            if cls in vehicle_classes and conf > 0.10:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cx = (x1 + x2) // 2
                cy = (y1 + y2) // 2
                car_boxes.append({
                    "x1": x1, "y1": y1,
                    "x2": x2, "y2": y2,
                    "cx": cx, "cy": cy,
                    "w": x2 - x1, "h": y2 - y1
                })

    # Sort cars by position (left to right, top to bottom)
    car_boxes.sort(key=lambda c: (c["cy"] // 100, c["cx"]))

    occupied_count = len(car_boxes)
    free_count = max(0, total_slots - occupied_count)

    # Build slot results
    slot_results = []
    labels = generate_labels(total_slots)

    # Mark detected car positions as occupied
    for i, car in enumerate(car_boxes[:total_slots]):
        slot_results.append({
            "id": labels[i],
            "status": "occupied",
            "x": car["x1"],
            "y": car["y1"],
            "w": car["w"],
            "h": car["h"],
        })

    # Fill remaining slots as free
    for i in range(len(slot_results), total_slots):
        slot_results.append({
            "id": labels[i],
            "status": "free",
            "x": 0,
            "y": 0,
            "w": 0,
            "h": 0,
        })

    return slot_results, occupied_count


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
        total_slots = rows * cols

        # Resize
        image = cv2.resize(image, (640, 480))

        slot_results, cars_detected = detect_slots_from_cars(image, total_slots)

        return jsonify({
            "success": True,
            "slots": slot_results,
            "total": len(slot_results),
            "cars_detected": cars_detected
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "Python YOLO API is running"})


if __name__ == '__main__':
    app.run(port=5001, debug=True)