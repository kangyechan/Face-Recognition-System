package com.exntu.faceadmin.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
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
        String[] infoNameSplit = infoName.split("-");
        hashMap.put("src", "api/detect/image-detect?imagePath=" + infoNameSplit[0] + ".jpg");
        hashMap.put("name", infoNameSplit[1]);
        String[] detectTypeName = infoNameSplit[1].split(" ");
        if(!infoNameSplit[1].equalsIgnoreCase("unknown.jpg")) {
            hashMap.put("type", detectTypeName[0]);
            if(checkList.get(nameList.indexOf(detectTypeName[0].toLowerCase()))) {
                hashMap.put("show", true);
            } else {
                hashMap.put("show", false);
            }
        } else {
            hashMap.put("type", "unknown");
            if(checkList.get(nameList.indexOf("unknown"))) {
                hashMap.put("show", true);
            } else {
                hashMap.put("show", false);
            }
        }
        return hashMap;
    }

    public void getDetectImgSrc(String imagePath, HttpServletResponse response) throws IOException {
        BufferedInputStream bis = null;
        ServletOutputStream sos = null;
        response.setContentType("image/jpeg");
        try {
            bis = new BufferedInputStream(new FileInputStream(this.detectPath + imagePath));
            sos = response.getOutputStream();

            byte[] buf = new byte[1024];
            int readByte = 0;
            while((readByte = bis.read(buf)) != -1) {
                sos.write(buf, 0, readByte);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if(bis != null) bis.close();
            if(sos != null) sos.close();
        }
    }
}
