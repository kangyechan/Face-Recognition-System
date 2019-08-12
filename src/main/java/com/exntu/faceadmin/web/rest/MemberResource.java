package com.exntu.faceadmin.web.rest;

import com.exntu.faceadmin.domain.Members;
import com.exntu.faceadmin.service.MemberService;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

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
     * @param folderPath new folderPath include '/'.
     */
    @GetMapping(path = "/member/make-members-folder")
    public String makeMembersFolder(@RequestParam String folderPath, String folderName) {
        log.debug("Make member folder Get Request.");
        if(memberService.makeNewFolder(folderPath, folderName)) {
            return folderPath + folderName;
        } else {
            return "fail";
        }
    }

    /**
     * {@code GET   /member/read-member-folder-list} : read member folder lists.
     * @param folderName MembersFolderName.
     * @param folderId MembersFolderId.
     * @param folderPath MembersFolderPath.
     */
    @GetMapping(path = "/member/read-member-folder-list")
    public Object readMemberFolder(@RequestParam String folderId, String folderName, String folderPath) {
        log.debug("read " + folderName + "'s all member read Get Request.");
        return memberService.readMemberList(folderId, folderName, folderPath);
    }

    /**
     * {@code GET   /member/delete-members-folder} : delete members folder.
     * @param selectedList delete selected list.
     */
    @GetMapping(path = "/member/delete-members-folder")
    public String deleteMembersFolder(@RequestParam ArrayList<String> selectedList) {
        log.debug("Delete Members folder selected List.");
        if(memberService.deleteFolder(selectedList)) {
            return "success";
        } else {
            return "fail";
        }
    }

    /**
     * {@code GET   /member/get-member-image} : get member image path.
     * @param selectPath select folder path.
     */
    @GetMapping(path = "/member/get-member-image")
    public ArrayList<String> getImagePath(@RequestParam String selectPath) {
        log.debug("Get ImagePath function call.");
        return memberService.getImagePathList(selectPath);
    }

    /**
     * {@code GET   /member/image-list/ imagePath} : get imageSrc.
     */
    @GetMapping(
        path = "/member/image-list",
        produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody byte[] getImageSrc(@RequestParam() String imagePath) throws IOException {
        return memberService.getImgSrc(imagePath);
    }
}
