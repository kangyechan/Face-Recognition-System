package com.exntu.faceadmin.service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Service for Left navigation bar.
 * We use the {@link Async} annotation to left navigation bar manages asynchronously.
 */
@Service
public class LnbService {
    private Environment environment;

    private Process process;

    public LnbService(Environment env) {
        this.environment = env;
        this.process = null;
    }

    private final Logger log = LoggerFactory.getLogger(LnbService.class);

    @Async
    public void preWork() {

    }
}
