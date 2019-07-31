package com.exntu.faceadmin.web.rest;

import com.exntu.faceadmin.domain.Encode;
import com.exntu.faceadmin.service.CameraService;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
     * {@code POST  /camera/live} : Control Camera
     * @param encode the activation param.
     */
    @PostMapping(path = "/camera/live")
    public String uploadImage(@RequestBody Encode encode) {

        return encode.get;
    }

    @GetMapping(path = "/camera/live")
    public void getImages(@RequestParam(value = "temperature", required = false) byte[] temperature) throws Exception {


        // return temperature;
    }
}
