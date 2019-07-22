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
        if(state.equals("on")) {
            cameraService.onCamera(state);
        } else {
            log.debug("camera off button");
        }
    }
}
