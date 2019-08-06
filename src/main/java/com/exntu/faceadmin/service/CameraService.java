package com.exntu.faceadmin.service;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.xml.ws.Action;
import java.awt.*;
import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

// # Python Path
//python.path=/Library/Frameworks/Python.framework/Versions/3.5/bin/python3.5

/**
 * Service for camera
 * <p>
 * We use the {@link Async} annotation to camera manages asynchronously.
 */
@Service
public class CameraService {
    private Environment environment;

    private static Process process;
    private static Process dProcess;

    public CameraService(Environment env) {
        this.environment = env;
    }

    private final Logger log = LoggerFactory.getLogger(CameraService.class);

    @Async
    public void cameraOnOff() {

        try {
            List<String> cmd = new ArrayList<String>();
            cmd.add(environment.getProperty("python.path"));

            // Path
            Path currentPath = Paths.get(System.getProperty("user.dir"));
            Path filePath = Paths.get(currentPath.toString(), "src", "main", "python", environment.getProperty("python.fileName.camera"));
            cmd.add(filePath.toString());

            // Add Argument1
            cmd.add("arg1");
            // Add Argument2
            cmd.add("arg2");
            ProcessBuilder bld = new ProcessBuilder(cmd);

            // Add Directory Info
            bld.directory(new File(Paths.get(currentPath.toString(), "src", "main", "python").toString()));

            log.debug("camera on button click!");
            if(process == null) process = bld.start();
            else log.debug("Already exist Process!");

        } catch (Exception e) {
            e.printStackTrace();
            log.error("Exception Raised loading python" + e.toString());
        }
    }

    public void doorOpen() {
        try {
            List<String> doorCmd = new ArrayList<>();
            doorCmd.add(environment.getProperty("python.path"));

            // Path
            Path currentPath = Paths.get(System.getProperty("user.dir"));
            Path filePath = Paths.get(currentPath.toString(), "src", "main", "python", environment.getProperty("python.fileName.door"));
            doorCmd.add(filePath.toString());

            ProcessBuilder doorBld = new ProcessBuilder(doorCmd);

            doorBld.directory(new File(Paths.get(currentPath.toString(), "src", "main", "python").toString()));

            log.debug("Door OPEN Click");
            if(dProcess == null) {
                dProcess = doorBld.start();

                Thread.sleep(3000);

                dProcess.destroy();
                dProcess = null;
            }
            else log.debug("Already open door...");


        } catch (Exception e) {
            e.printStackTrace();
            log.error("Exception Raised loading python" + e.toString());
        }
    }
}
