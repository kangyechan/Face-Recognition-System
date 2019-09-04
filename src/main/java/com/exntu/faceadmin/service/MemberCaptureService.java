package com.exntu.faceadmin.service;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Service for member
 */
@Service
public class MemberCaptureService {
    private final Logger log = LoggerFactory.getLogger(MemberService.class);

    @Value("${flask.root.path}")
    private String rootFolderPath;

    @Value("${flask.match.path}")
    private String matchPath;

    @Value("${flask.collect.path}")
    private String collectFolderPath;

    public MemberCaptureService() { }

    public HashMap<String, Object> getOriginImagePath(String name) {
        HashMap<String, Object> hashMap = new HashMap<>();
        String memberPath = rootFolderPath + name;
        File matchMember = new File(memberPath);
        if(!matchMember.exists()) {
            log.error(name + " Match is not exists.");
        } else {
            File[] matchAllFileList = matchMember.listFiles();
            if(matchAllFileList != null) {
                for(File matchFile: matchAllFileList) {
                    if(isImageFile(matchFile.getName())){
                        hashMap.put("name", name);
                        hashMap.put("matchPath", "api/match/image-match?imagePath=" + name + ".jpg");
                        hashMap.put("getPath", "api/match/image-origin?imagePath=" + name + "/" + matchFile.getName());
                        break;
                    }
                }
            } else {
                log.error("MatchAllFileList is Null point Exception.");
            }
        }
        return hashMap;
    }

    private boolean isImageFile(String fileName) {
        return (fileName.toLowerCase().endsWith(".png") ||
            fileName.toLowerCase().endsWith(".jpg") ||
            fileName.toLowerCase().endsWith(".jpeg") ||
            fileName.toLowerCase().endsWith(".gif") ||
            fileName.toLowerCase().endsWith(".bmp") ||
            fileName.toLowerCase().endsWith(".tif") ||
            fileName.toLowerCase().endsWith(".tiff"));
    }

    public void getImgSrc(String imagePath, HttpServletResponse response) throws IOException {
        BufferedInputStream bis = null;
        ServletOutputStream sos = null;
        response.setContentType("image/jpeg");
        FileInputStream fin;
        if(imagePath.toLowerCase().startsWith("unknown/")) {
            fin = new FileInputStream(this.collectFolderPath + imagePath);
        } else {
            fin = new FileInputStream(this.rootFolderPath + imagePath);
        }
        try {
            bis = new BufferedInputStream(fin);
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

    public void getMatchImgSrc(String imagePath, HttpServletResponse response) throws IOException {
        BufferedInputStream bis = null;
        ServletOutputStream sos = null;
        response.setContentType("image/jpeg");
        try {
            bis = new BufferedInputStream(new FileInputStream(this.matchPath + imagePath));
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
