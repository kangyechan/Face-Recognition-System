import cv2

capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    ret, frame = capture.read()
    camera = cv2.flip(frame, 1)

    cv2.imshow('TEST', camera)

    cv2.imwrite('live.jpg', camera)

    if cv2.waitKey(1) > 0: break;

capture.release()
cv2.destroyAllWindows()
