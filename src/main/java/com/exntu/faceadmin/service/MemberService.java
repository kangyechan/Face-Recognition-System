package com.exntu.faceadmin.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Service for memver
 * <p>
 * We use the {@link Async} annotation to memver manages asynchronously.
 */
@Service
public class MemberService {

    public MemberService() {

    }

    private final Logger log = LoggerFactory.getLogger(MemberService.class);

    @Async
    public void main() {

    }
}
