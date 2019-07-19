package com.exntu.faceadmin.web.rest;

import com.exntu.faceadmin.service.CameraService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for managing the web camera.
 */
@RestController
@RequestMapping("/api")
public class CameraResource {

    private final Logger log = LoggerFactory.getLogger(CameraResource.class);


    /**
     * {@code POST  /camera/camera-state-onoff} : Control Camera
     *
     *
     */
    @PostMapping(path = "/camera/camera-state-onoff")
    public void cameraStateOnOff() {
        log.debug("zzzzzzzzzzzzzz------");
        System.out.println("TESTESDAFDASF");
    }
}
