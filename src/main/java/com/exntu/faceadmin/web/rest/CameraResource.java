package com.exntu.faceadmin.web.rest;

import com.exntu.faceadmin.service.CameraService;
import com.exntu.faceadmin.service.StreamService;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * REST controller for managing the web camera.
 */
@RestController
@RequestMapping("/api")
public class CameraResource {

    private final Logger log = LoggerFactory.getLogger(CameraResource.class);

    private final CameraService cameraService;
    private final StreamService streamService;

    public CameraResource(CameraService cameraService, StreamService streamService) {
        this.cameraService = cameraService;
        this.streamService = streamService;
    }

    /**
     * {@code GET  /camera/door-open} : Door Control
     */
    @GetMapping(path = "/camera/door-open")
    public void cameraDoorOpen() {
        log.debug("------------------- door open -------------------");
        cameraService.doorOpen();
    }

    /**
     * {@code POST   /camera/live} : live Camera
     * @param state the state of live stream.
     */
    @PostMapping(path = "/stream/live")
    public void streamOnOff(@RequestBody String state) {
        log.debug("------------------- stream -------------------");
        log.debug(state);
        log.debug("------------------- stream -------------------");
        streamService.liveStreaming(state);
//        log.debug("accessed live methods");
//
//        response.setContentType("image/jpeg; charset=UTF-8");
//        OutputStream out = response.getOutputStream();
//
//        // 바로 image를 사용하는 로직
//        while (this.state.equals("ON")) {
//            Thread.sleep(10);
//
//            byte[] image = IOUtils.toByteArray(new FileInputStream("src/main/python/live.jpg"));
//
//            out.write(image);
//
//            out.flush();
//        }
    }

}
