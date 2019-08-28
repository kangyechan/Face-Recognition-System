package com.exntu.faceadmin.web.rest;

import com.exntu.faceadmin.service.DetectCaptureService;
import com.exntu.faceadmin.service.MemberCaptureService;
import com.exntu.faceadmin.service.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * REST controller for Face Recognition.
 */
@RestController
@RequestMapping("/api")
public class FaceResource {

    private final Logger log = LoggerFactory.getLogger(FaceResource.class);

    private final MemberService memberService;
    private final MemberCaptureService memberCaptureService;
    private final DetectCaptureService detectCaptureService;

    public FaceResource(MemberService memberService, MemberCaptureService memberCaptureService, DetectCaptureService detectCaptureService) {
        this.memberService = memberService;
        this.memberCaptureService = memberCaptureService;
        this.detectCaptureService = detectCaptureService;
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
    public String makeMembersFolder(@RequestParam String folderPath, @RequestParam String folderName) {
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
    public Object readMemberFolder(@RequestParam String folderId, @RequestParam String folderName, @RequestParam String folderPath) {
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
    public ArrayList<HashMap<String, Object>> getImagePath(@RequestParam String selectPath) {
        log.debug("Get ImagePath function call.");
        return memberService.getImagePathList(selectPath);
    }

    /**
     * {@code GET   /member/get-single-member-image} : get single member image path.
     * @param selectPath select folder path.
     */
    @GetMapping(path = "/member/get-single-member-image")
    public HashMap<String, Object> getSingleImagePath(@RequestParam String selectPath) {
        log.debug("Get ImagePath function call.");
        return memberService.getImagePath(selectPath);
    }

    /**
     * {@code GET   /member/image-list/ imagePath} : get imageSrc.
     */
    @GetMapping(
        path = "/member/image-list",
        produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody
    byte[] getImageSrc(@RequestParam String imagePath) throws IOException {
        return memberService.getImgSrc(imagePath);
    }

    /**
     * {@code GET   /member/copy-member-list} : copy selectMember to other folder.
     * @param destPath copy destPath.
     * @param copyList select member image card.
     * @param copyNameList select member name.
     */
    @GetMapping(path = "/member/copy-member-list")
    public boolean copyMemberList(@RequestParam ArrayList<String> copyList, @RequestParam ArrayList<String> copyNameList, @RequestParam String destPath) {
        log.debug("copyMemberList from Member Resource");
        return memberService.copyMember(copyList, copyNameList, destPath);
    }


    /**
     * {@code GET   /match/get-origin-image} : match member origin image.
     * @param name match MemberName.
     */
    @GetMapping(path = "/match/get-origin-image")
    public HashMap<String, Object> getOriginImagePath(@RequestParam String name) {
        log.debug("Get Match Origin ImagePath function call.");
        return memberCaptureService.getOriginImagePath(name);
    }

    /**
     * {@code GET   /match/image-origin/ imagePath} : get imageSrc.
     */
    @GetMapping(
        path = "/match/image-origin",
        produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody byte[] getOriginImageSrc(@RequestParam String imagePath) throws IOException {
        return memberCaptureService.getImgSrc(imagePath);
    }

    /**
     * {@code GET   /match/image-origin/ imagePath} : get imageSrc.
     */
    @GetMapping(
        path = "/match/image-match",
        produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody byte[] getMatchImageSrc(@RequestParam String imagePath) throws IOException {
        return memberCaptureService.getMatchImgSrc(imagePath);
    }


    /**
     * {@code GET   /detect/get-detect-image} : match member origin image.
     * @param info match MemberName.
     * @param nameList name List.
     * @param checkList check State.
     */
    @GetMapping(path = "/detect/get-detect-image")
    public HashMap<String, Object> getDetectImagePath(@RequestParam String info, @RequestParam ArrayList<String> nameList, @RequestParam ArrayList<Boolean> checkList) {
        log.debug("Get Detect ImagePath function call.");
        System.out.println(checkList);
        System.out.println(nameList);
        return detectCaptureService.getDetectImagePath(info, nameList, checkList);
    }

    /**
     * {@code GET   /match/image-origin/ imagePath} : get imageSrc.
     */
    @GetMapping(
        path = "/detect/image-detect",
        produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody byte[] getDetectImageSrc(@RequestParam String imagePath) throws IOException {
        return detectCaptureService.getDetectImgSrc(imagePath);
    }
}
