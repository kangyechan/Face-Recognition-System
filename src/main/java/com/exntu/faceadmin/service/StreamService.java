package com.exntu.faceadmin.service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
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

/**
 * Service for Live Streaming.
 * We use th {@link Async} annotyateion to live streaming manages asynchronously.
 */
@Service
public class StreamService {
    private Environment environment = null;

    private Process process;

    public StreamService(Environment env) {
        this.environment = env;
    }

    private final Logger log = LoggerFactory.getLogger(StreamService.class);

    public void startCheck() {
        if (this.environment == null) {
            log.error("StreamService start fail.");
        } else {
            log.debug("StreamService start success.");
        }
    }

    @Async
    public void liveStreaming(String state) {
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

            if(state.equals("ON")) {
                log.debug("streaming start!");
                if(this.process == null) this.process = bld.start();
                else log.debug("Already exist!!");
            } else {
                if(this.process != null) {
                    this.process.destroy();
                    this.process = null;
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
            log.error("Exception Raised loading python" + e.toString());
        }
    }
}
