package com.exntu.faceadmin.web.rest;

import com.exntu.faceadmin.service.CameraService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

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
     * {@code GET  /camera/door-open} : Door Control
     */
    @GetMapping(path = "/camera/door-open")
    public void cameraDoorOpen() {
        log.debug("------------------- door open -------------------");
        cameraService.doorOpen();
    }
}
