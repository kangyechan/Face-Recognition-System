from flask import Flask, Response
import imutils
import cv2
app = Flask(__name__)

def streaming():
    print('streaming start')
    vs = cv2.VideoCapture(0)
    while True:
        ret, frame = vs.read()
        frame = imutils.resize(frame, width=900)
        frame = cv2.flip(frame, 1)
        byte_frame = cv2.imencode('.jpeg', frame)[1].tobytes()
        yield (b'--frame\r\n' \
               b'Content-Type: image/jpeg\r\n\r\n' + byte_frame + b'\r\n')

    cv2.destroyAllWindows()
    print("[INFO] Stream Empty")
    yield (b'--frame\r\n'
           b'Content-Type: image/jpeg\r\n\r\n' + bytes(0) + b'\r\n')

@app.route('/streaming/live')
def get_streaming():
    return Response(streaming(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9001)
