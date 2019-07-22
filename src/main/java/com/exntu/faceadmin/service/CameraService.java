package com.exntu.faceadmin.service;

import org.python.util.PythonInterpreter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

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
// package com.skt.compass.util;
//
//
//public class RunPythonUtil {
//
//   private final Logger log = LoggerFactory.getLogger(this.getClass());
//
   
/**
 * Service for camera
 * <p>
 * We use the {@link Async} annotation to camera manages asynchronously.
 */
@Service
public class CameraService {

    private final Logger log = LoggerFactory.getLogger(CameraService.class);

    private static PythonInterpreter interpreter;

    private static Process mProcess;

    @Async
    public void onCamera(String state) {
        log.debug("camera on button click!");

//        interpreter = new PythonInterpreter();
//        interpreter.execfile("test.py");
        run("camera.py", "/Library/Frameworks/Python.framework/Versions/3.4/bin/python3.4");

    }

    public void run(String python, String env){

        Process process;

        try{
            List<String> cmd = new ArrayList<String>();
            cmd.add("/Library/Frameworks/Python.framework/Versions/3.4/bin/python3.4");

                // Path
            Path currentPath = Paths.get(System.getProperty("user.dir"));
            Path filePath = Paths.get(currentPath.toString(), "src", "main", "python", python);
            cmd.add(filePath.toString());

            // Add Argument1
            cmd.add("arg1");
            // Add Argument2
            cmd.add("arg2");
            ProcessBuilder bld = new ProcessBuilder(cmd);

            // Add Directory Info
            bld.directory(new File(Paths.get(currentPath.toString(), "src", "main", "python").toString()));

            process = bld.start();

            // 싱글톤 먹일껏.
            mProcess = process;

        } catch(Exception e) {

            log.error("Exception Raised loading python" + e.toString());
        }

        BufferedReader in = new BufferedReader(new InputStreamReader(mProcess.getInputStream()));
        String line;
        try{

            while((line = in.readLine()) != null) {
                log.error("out: "+ line);
            }

        } catch(IOException e) {
            log.error("Exception in reading python file"+ e.toString());
        }
    }
}
