# # -*- coding: utf-8 -*-

# import cv2
# import numpy as np

# capture = cv2.VideoCapture(0)
# capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
# capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# while True:
#     ret, frame = capture.read()
#     img_encode = cv2.imencode('.jpg', frame)[1]

#     data_encode = np.array(img_encode)
#     str_encode = data_encode.tostring()

#     with open('img_encode.txt', 'w') as f:
#         f.write(str_encode)
#         f.flush

#     with open('img_encode.txt', 'r') as f:
#         str_encode = f.read()

#     nparr = np.fromstring(str_encode, np.uint8)
#     img_decode = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#     cv2.imshow("VideoFrame", img_decode)
#     if cv2.waitKey(1) > 0: break;

# capture.release()
# cv2.destroyAllWindows()

import cv2
import numpy as np

capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

count = 0

while True:
    ret, frame = capture.read()

    cv2.imwrite("testing.jpeg", frame)

    video = cv2.imread("testing%.jpeg", count)
    cv2.imshow("TEST", video)
    if cv2.waitKey(1) > 0: break;

capture.release()
cv2.destroyAllWindows()