import cv2
import os

capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
path = '/Users/kang-yechan/Desktop/jhipster-frs/src/main/webapp/content/faceimages'

while True:
    ret, frame = capture.read()
    camera = cv2.flip(frame, 1)

    cv2.imwrite(os.path.join(path, 'test.jpeg'), camera)

    video = cv2.imread(os.path.join(path, 'test.jpeg'))
    cv2.imshow('TEST', video)
    if cv2.waitKey(1) > 0: break;

capture.release()
cv2.destroyAllWindows()
