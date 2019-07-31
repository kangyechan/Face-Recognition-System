# -*- coding: UTF-8 -*-
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import os

import requests
from multiprocessing.dummy import Pool
from threading import Timer

# Arduino Address URL
ARDUINO_API = 'http://192.168.100.101/'
ARDUINO_ID = 'exntu'
ARDUINO_PASS = 'pass'
ARDUINO_FLAG = False
ARDUINO_TIME = 5.0
pool = Pool(10)

path_collect = './collect_images'

bytes=b''


def arduino_timer():
    global ARDUINO_FLAG
    ARDUINO_FLAG = False

def open_door():
    global ARDUINO_FLAG
    if ARDUINO_FLAG:
        return
    ARDUINO_FLAG = True

    # Open door through Aruduino
    pool.apply_async(requests.get, [ARDUINO_API], dict(auth=(ARDUINO_ID, ARDUINO_PASS)))

    # Timer
    Timer(ARDUINO_TIME, arduino_timer).start()


def main():
    open_door()



if __name__ == '__main__':
    main()
