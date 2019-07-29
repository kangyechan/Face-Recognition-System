package com.exntu.faceadmin.web.rest;

import com.exntu.faceadmin.service.CameraService;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import javax.activation.FileTypeMap;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;

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
        cameraService.cameraOnOff(state);
    }

    /**
     * {@code GET  /camera/live} : Control Camera
     * @param temperature the activation key.
     */
    @GetMapping(path = "/camera/live")
    @Async
    public String uploadImage(@RequestParam(value = "temperature") String temperature){
        log.debug("------------------- live -------------------");
        log.debug(temperature);
        log.debug("------------------- live -------------------");
        temperature = temperature;
        return temperature;
    }
}
