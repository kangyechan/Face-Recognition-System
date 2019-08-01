package com.exntu.faceadmin.web.rest;

import com.exntu.faceadmin.service.CameraService;
import com.exntu.faceadmin.service.CaptureService;
import com.exntu.faceadmin.web.rest.errors.FieldErrorVM;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.*;

/**
 * REST controller for managing the web camera.
 */
@RestController
@RequestMapping("/api")
public class CameraResource extends HttpServlet {

    private final Logger log = LoggerFactory.getLogger(CameraResource.class);

    private final CameraService cameraService;
    private final CaptureService captureService;
    private String state;

    public CameraResource(CameraService cameraService, CaptureService captureService) {
        this.cameraService = cameraService;
        this.captureService = captureService;
        this.state = "ON";
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

    /**
     * {@code GET   /camera/live} : live Camera
     */
    @GetMapping(
        path = "/camera/live"
//        produces = MediaType.IMAGE_JPEG_VALUE
    )
    public void getImage(HttpServletResponse response) throws IOException, InterruptedException {
        log.debug("accessed live methods");

        response.setContentType("image/jpeg; charset=UTF-8");
        OutputStream out = response.getOutputStream();

        // 바로 image를 사용하는 로직
        while(this.state.equals("ON")){
            Thread.sleep(10);

            byte[] image = IOUtils.toByteArray(new FileInputStream("src/main/python/live.jpg"));

            out.write(image);

            out.flush();
        }
//         CaptureService의 queue를 이용한 로직
//        response.setContentType("image/jpeg; charset=UTF-8");
//        OutputStream out = response.getOutputStream();
//        captureService.liveCamera();
//        Thread.sleep(50);
//        captureService.setOnOff("START");
//
//        while(this.state.equals("ON")){
//            Thread.sleep(10);
//
//            log.debug(captureService.getPeek().toString());
//            out.write(captureService.getFrame());
//            Thread.sleep(500);
//        }
    }
//            FileInputStream in = new FileInputStream("src/main/python/live.jpg");


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
