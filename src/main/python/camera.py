import cv2
import os
import sys
import requests
from time import sleep

capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
path = '/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images'

while True:
    ret, frame = capture.read()
    camera = cv2.flip(frame, 1)

    cv2.imwrite(os.path.join(path, 'live.jpg'), camera)
    video = cv2.imread(os.path.join(path, 'live.jpg'))
    cv2.imshow('TEST', video)

    # files = open(os.path.join(path, 'live.jpg'), 'rb')
    obj = {"temperature": '23.5'}
    # upload = {'file': files}

    res = requests.get('http://localhost:8080/api/camera/live', params = obj)
    # print(res.json())
    # print(res.url)

    # res = requests.post('http://localhost:8080/api/camera/live', files = upload)
    # sleep(2)
    if cv2.waitKey(1) > 0: break;

capture.release()
cv2.destroyAllWindows()
