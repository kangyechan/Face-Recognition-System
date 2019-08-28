package com.exntu.faceadmin.service;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Service for member
 */
@Service
public class DetectCaptureService {
    private final Logger log = LoggerFactory.getLogger(MemberService.class);

    @Value("${flask.root.path}")
    private String rootFolderPath;

    @Value("${flask.detect.path}")
    private String detectPath;

    public DetectCaptureService() { }

    public HashMap<String, Object> getDetectImagePath(String infoName, ArrayList<String> nameList, ArrayList<Boolean> checkList) {
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("src", "api/detect/image-detect?imagePath=" + infoName + ".jpg");
        String[] infoNameSplit = infoName.split("-");
        hashMap.put("name", infoNameSplit[1]);
        String[] detectTypeName = infoNameSplit[1].split(" ");
        if(!infoNameSplit[0].equals("Unknown")) {
            hashMap.put("type", detectTypeName[0]);
            if(checkList.get(nameList.indexOf(detectTypeName[0].toLowerCase()))) {
                hashMap.put("show", true);
            } else {
                hashMap.put("show", false);
            }
        } else {
            hashMap.put("type", "Unknown");
            if(checkList.get(nameList.indexOf("unknown"))) {
                hashMap.put("show", true);
            } else {
                hashMap.put("show", false);
            }
        }
        return hashMap;
    }

    public byte[] getDetectImgSrc(String imagePath) throws IOException {
        FileInputStream fin = new FileInputStream(this.detectPath + imagePath);
        return IOUtils.toByteArray(fin);
    }
}
