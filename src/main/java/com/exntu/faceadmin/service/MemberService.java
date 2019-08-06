package com.exntu.faceadmin.service;

import com.exntu.faceadmin.domain.Members;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;

/**
 * Service for memver
 * <p>
 * We use the {@link Async} annotation to member manages asynchronously.
 */
@Service
public class MemberService {

    private final Logger log = LoggerFactory.getLogger(MemberService.class);
    private String membersFolderPath;

    public MemberService() {
        this.membersFolderPath = "src/main/resources/members/";
    }

    public Object readRootFolder() {
        ArrayList<Members> initMembers = new ArrayList<>();
        File rootFolder = new File(membersFolderPath);
        if(!rootFolder.exists()) {
            log.error("Root Folder is not found");
        } else {
            File[] arrRootFolder = rootFolder.listFiles();
            if(arrRootFolder != null) {
                for(int i = 0; i < arrRootFolder.length; ++i) {
                    Members membersList = new Members(String.valueOf(i), arrRootFolder[i].getName());
                    if(arrRootFolder[i].getName().startsWith(".")) {
                        log.debug(arrRootFolder[i].getName() + "is NOT Directory.");
                        continue;
                    } else {
                        File memList = new File(membersFolderPath + arrRootFolder[i].getName() + "/");
                        File[] memListFolder = memList.listFiles();
                        if(memListFolder != null) {
                            if(memListFolder.length < 1) {
                                membersList.setHasChildren(false);
                                log.debug(arrRootFolder[i].getName() + " This folder has not children.");
                            } else {
                                membersList.setHasChildren(true);
                                log.debug(arrRootFolder[i].getName() + " This folder has children.");
                            }
                        } else {
                            log.error("MembersListFolder NULL Point Exception.");
                        }
                    }
                    initMembers.add(membersList);
                }
            } else {
                log.debug("arrRootFolder is NULL Point Exception.");
            }
        }
        return initMembers;
    }

    @Async
    public boolean makeNewFolder(String folderName) {
        File newFolder = new File(membersFolderPath + folderName + "/");
        if(!newFolder.exists()) {
            try {
                newFolder.mkdir();
                log.debug("new folder make success.");
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            log.debug("Already folder exists..");
            return false;
        }
        return true;
    }

    public Object readMemberList(String folderId, String folderName) {
        String readMembersFolderPath = membersFolderPath + folderName + "/";
        ArrayList<Members> readMembers = new ArrayList<>();
        File memberFolder = new File(readMembersFolderPath);
        if(!memberFolder.exists()) {
            log.error(folderName + " is not found");
        } else {
            File[] arrMemFolder = memberFolder.listFiles();
            if(arrMemFolder != null) {
                for(int i = 0; i < arrMemFolder.length; ++i) {
                    Members memList =  new Members(folderId + "-" + String.valueOf(i), arrMemFolder[i].getName());
                    if(arrMemFolder[i].getName().startsWith(".")) {
                        log.debug(arrMemFolder[i].getName() + "is NOT Directory.");
                        continue;
                    } else {
                        File memListFolder = new File(readMembersFolderPath + arrMemFolder[i].getName() + "/");
                        File[] memListFolderChildren = memListFolder.listFiles();
                        if(memListFolderChildren != null) {
                            if(memListFolderChildren.length < 1) {
                                memList.setHasChildren(false);
                                log.debug(arrMemFolder[i].getName() + " This folder has not children.");
                            } else {
                                memList.setHasChildren(true);
                                log.debug(arrMemFolder[i].getName() + " This folder has children.");
                            }
                        } else {
                            log.error("memListFolderChildren is NULL Point Exception.");
                        }
                    }
                    readMembers.add(memList);
                }
            } else {
                log.debug("arrMemberFolder is NULL Point Exception.");
            }
        }
        return readMembers;
    }
}
