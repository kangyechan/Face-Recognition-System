package com.exntu.faceadmin.service;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.Queue;

/**
 * Service for camera
 * <p>
 * We use the {@link Async} annotation to live queue manages asynchronously.
 */
@Service
public class CaptureService {

    private Queue<byte[]> imgQ = new LinkedList<>();

    private final Logger log = LoggerFactory.getLogger(CameraService.class);

    private String state;
    private String onOff;

    public CaptureService() {
        this.state = "ON";
        this.onOff = "STOP";
    }

    @Async
    public void liveCamera() throws IOException, InterruptedException {

        FileInputStream in = new FileInputStream("src/main/python/live.jpg");

        while(this.state.equals("ON")) {
            Thread.sleep(10);
            this.imgQ.offer(IOUtils.toByteArray(in));

            if(this.onOff.equals("STOP")) {
                this.imgQ.poll();
            }
            log.debug(Integer.toString(this.imgQ.size()));
        }
        log.debug("끝났음");
    }

    public byte[] getFrame() {
        return this.imgQ.poll();
    }

    public byte[] getPeek() {
        return this.imgQ.peek();
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setOnOff(String state) {
        this.onOff = state;
    }

    public Queue getQueue() {
        return this.imgQ;
    }
}
