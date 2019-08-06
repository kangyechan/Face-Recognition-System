package com.exntu.faceadmin.web.rest;

import com.exntu.faceadmin.domain.Members;
import com.exntu.faceadmin.service.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.ArrayList;

/**
 * REST controller for managing the member folder items.
 */
@RestController
@RequestMapping("/api")
public class MemberResource {

    private final Logger log = LoggerFactory.getLogger(MemberResource.class);

    private final MemberService memberService;

    public MemberResource(MemberService memberService) {
        this.memberService = memberService;
    }

    /**
     * {@code Get   /member/init-members} : member items
     */
    @GetMapping(path = "/member/init-members")
    public Object initMembersFolder() {
        log.debug("Member folder init Get Request.");
        return memberService.readRootFolder();
    }

    /**
     * {@code GET   /member/make-members-folder} : members folder make function.
     * @param folderName new folderName.
     */
    @GetMapping(path = "/member/make-members-folder")
    public String makeMembersFolder(@RequestParam String folderName) {
        log.debug("Make member folder Post Request.");
        if(memberService.makeNewFolder(folderName)) {
            return folderName;
        } else {
            return "fail";
        }
    }

    /**
     * {@code GET   /member/read-member-folder-list} : read member folder lists.
     * @param folderName MembersFolderName.
     */
    @GetMapping(path = "/member/read-member-folder-list")
    public Object readMemberFolder(@RequestParam String folderId, String folderName) {
        log.debug("read " + folderName + "'s all member read Get Request.");
        return memberService.readMemberList(folderId, folderName);
    }
}
