import cv2
import os
import sys
import base64
import requests
from time import sleep

capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)


while True:
    ret, frame = capture.read()
    camera = cv2.flip(frame, 1)

    cv2.imshow('TEST', camera)

    cv2.imwrite('live.jpg', camera)

    with open('live.jpg', 'rb') as imageFile:
        str = base64.b64encode(imageFile.read())

    data = {
        'img64': str
    }
    headers = {'Content-type': 'application/json; charset=UTF-8'}

    # byte_frame = cv2.imencode('.jpg', camera)[1].tobytes()
    # print(byte_frame)
    # files = open(os.path.join(path, 'live.jpg'), 'rb')
    # obj = {"temperature": byte_frame}
    # upload = {'file': files}
    # res = requests.get('http://localhost:8080/api/camera/live', data = obj)
    # res = requests.post('http://localhost:8080/api/camera/live', data = data, headers = headers)
    sleep(2)
    if cv2.waitKey(1) > 0: break;

capture.release()
cv2.destroyAllWindows()
