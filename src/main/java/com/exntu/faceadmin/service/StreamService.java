package com.exntu.faceadmin.service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * Service for Live Streaming.
 * We use th {@link Async} annotyateion to live streaming manages asynchronously.
 */
@Service
public class StreamService {
    private Environment environment;

    private Process process;

    public StreamService(Environment env) {
        this.environment = env;
        this.process = null;
    }

    private final Logger log = LoggerFactory.getLogger(StreamService.class);


    @Async
    public void liveStreaming() {
        try {
            List<String> cmd = new ArrayList<>();
            cmd.add(environment.getProperty("python.path"));

            // Path
            Path currentPath = Paths.get(System.getProperty("user.dir"));
            Path filePath = Paths.get(currentPath.toString(), "src", "main", "python", environment.getProperty("python.fileName.stream"));
            cmd.add(filePath.toString());

            ProcessBuilder bld = new ProcessBuilder(cmd);

            // Add Directory Info
            bld.directory(new File(Paths.get(currentPath.toString(), "src", "main", "python").toString()));

            log.debug("streaming start!");
            if(this.process == null) this.process = bld.start();
            else log.debug("Already exist!!");

        } catch (IOException e) {
            e.printStackTrace();
            log.error("Exception Raised loading python" + e.toString());
        }
    }
}
