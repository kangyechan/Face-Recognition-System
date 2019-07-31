package com.exntu.faceadmin.web.rest;

import com.exntu.faceadmin.service.CameraService;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * REST controller for managing the web camera.
 */
@RestController
@RequestMapping("/api")
public class CameraResource {

    private final Logger log = LoggerFactory.getLogger(CameraResource.class);

    private final CameraService cameraService;

    public CameraResource(CameraService cameraService) {
        this.cameraService = cameraService;
    }

    /**
     * {@code POST  /camera/camera-state} : Control Camera
     * @param state the state of camera power.
     */
    @PostMapping(path = "/camera/camera-state")
    public void cameraStateOnOff(@RequestBody String state) {
        log.debug("------------------- camera -------------------");
        log.debug(state);
        log.debug("------------------- camera -------------------");
        cameraService.cameraOnOff();
    }

//    /**
//     * {@code GET   /camera/live} : live Camera
//     */
//    @GetMapping(
//        value = "/camera/live",
//        produces = MediaType.IMAGE_JPEG_VALUE
//    )
//    public byte[] getImage() throws InterruptedException, IOException {
//        log.debug("accessed this methods");
//        cameraService.liveCamera("ON");
//        Thread.sleep(5000);
//        log.debug("12312312312312321");
//        byte[] name = cameraService.imgQ.poll();
//        while (!cameraService.imgQ.isEmpty()) {
//            Thread.sleep(2000);
//            return cameraService.imgQ.poll();
//        }
//        return name;
//    }

    /**
     * {@code POST  /camera/door-open} : Door Control
     * @param state the state of Door.
     */
    @PostMapping(path = "/camera/door-open")
    public void cameraDoorOpen(@RequestBody String state) {
        log.debug("------------------- door open -------------------");
        cameraService.doorOpen();
    }
}
