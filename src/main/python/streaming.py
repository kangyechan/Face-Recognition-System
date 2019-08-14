import cv2
import socket
import numpy

capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    ret, frame = capture.read()
    stream = cv2.flip(frame, 1)

    cv2.imshow('Streaming', stream)

    if cv2.waitKey(1) > 0: break;

stream.release()
cv2.destroyAllWindows()
