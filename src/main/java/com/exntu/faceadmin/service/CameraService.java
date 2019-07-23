package com.exntu.faceadmin.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
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

    private static Process mProcess;
    private static Process process;

    Image capture = null;
    public CameraService(Environment env) {
        if(this.environment == null) {
            this.environment = env;
        }
    }

    private final Logger log = LoggerFactory.getLogger(CameraService.class);

    public void cameraOnOff(String state) {

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

            if(state.equals("ON")) {
                log.debug("camera on button click!");
                if(process == null) process = bld.start();
                else log.debug("Already exist Process!");

                mProcess = process;

                BufferedReader in = new BufferedReader(new InputStreamReader(mProcess.getInputStream()));

                String line;

                try{
                    while((line = in.readLine()) != null) {
                        log.error("out: "+ line);
                    }
                } catch(IOException e) {
                    log.error("Exception in reading python file"+ e.toString());
                }
            } else {
                log.debug("camera off button click!");
                process.destroy();
                process = null;
            }

        } catch (Exception e) {
            e.printStackTrace();
            log.error("Exception Raised loading python" + e.toString());
        }
    }
}
