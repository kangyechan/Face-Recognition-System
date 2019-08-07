package com.exntu.faceadmin.service;

import com.exntu.faceadmin.domain.Members;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

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
        int folderId = 0;
        ArrayList<Members> initMembers = new ArrayList<>();
        File rootFolder = new File(membersFolderPath);
        if(!rootFolder.exists()) {
            log.error("Root Folder is not found");
        } else {
            File[] arrRootFolder = rootFolder.listFiles();
            if(arrRootFolder != null) {
                for(File rootFolderName: arrRootFolder) {
                    Members membersList = new Members(String.valueOf(folderId), rootFolderName.getName(), rootFolderName.getName() + "/");
                    if(!rootFolderName.isDirectory()) {
                        log.debug(rootFolderName.getName() + "is NOT Directory.");
                        continue;
                    } else {
                        File memList = new File(membersFolderPath + rootFolderName.getName() + "/");
                        File[] memListFolder = memList.listFiles();
                        if(memListFolder != null) {
                            if(memListFolder.length < 1) {
                                membersList.setHasChildren(false);
                                log.debug(rootFolderName.getName() + " This folder has not children.");
                            } else {
                                membersList.setHasChildren(true);
                                log.debug(rootFolderName.getName() + " This folder has children.");
                            }
                        } else {
                            log.error("MembersListFolder NULL Point Exception.");
                        }
                        folderId++;
                    }
                    initMembers.add(membersList);
                }
            } else {
                log.debug("arrRootFolder is NULL Point Exception.");
            }
        }
        return initMembers;
    }

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

    public Object readMemberList(String folderId, String folderName, String folderPath) {
        int memFolderId = 0;
        String readMembersFolderPath = membersFolderPath + folderPath;
        ArrayList<Members> readMembers = new ArrayList<>();
        File memberFolder = new File(readMembersFolderPath);
        if(!memberFolder.exists()) {
            log.error(folderName + " is not found");
        } else {
            File[] arrMemFolder = memberFolder.listFiles();
            if(arrMemFolder != null) {
                for(File memFolderName: arrMemFolder) {
                    Members memList =  new Members(
                        folderId + "-" + String.valueOf(memFolderId), memFolderName.getName(),
                        folderPath + memFolderName.getName() + "/" );
                    if(!memFolderName.isDirectory()) {
                        log.debug(memFolderName.getName() + "is NOT Directory.");
                        if(memFolderName.getName().toLowerCase().endsWith(".png") ||
                            memFolderName.getName().toLowerCase().endsWith(".jpg") ||
                            memFolderName.getName().toLowerCase().endsWith(".jpeg") ||
                            memFolderName.getName().toLowerCase().endsWith(".gif") ||
                            memFolderName.getName().toLowerCase().endsWith(".bmp") ||
                            memFolderName.getName().toLowerCase().endsWith(".tif") ||
                            memFolderName.getName().toLowerCase().endsWith(".tiff")) {
                            memList.setPath(folderPath + memFolderName.getName().toLowerCase());
                            memFolderId++;
                        } else {
                            continue;
                        }
                    } else {
                        File memListFolder = new File(readMembersFolderPath + memFolderName.getName() + "/");
                        File[] memListFolderChildren = memListFolder.listFiles();
                        if(memListFolderChildren != null) {
                            if(memListFolderChildren.length < 1) {
                                memList.setHasChildren(false);
                                log.debug(memFolderName.getName() + " This folder has not children.");
                            } else {
                                memList.setHasChildren(true);
                                log.debug(memFolderName.getName() + " This folder has children.");
                            }
                        } else {
                            log.error("memListFolderChildren is NULL Point Exception.");
                        }
                        memFolderId++;
                    }
                    readMembers.add(memList);
                }
            } else {
                log.debug("arrMemberFolder is NULL Point Exception.");
            }
        }
        return readMembers;
    }

    public boolean deleteFolder(ArrayList<String> selectedList) {
        for(String delFolderPath: selectedList) {
            if(recursiveDeleteFolder(membersFolderPath + delFolderPath)) {
                log.debug(delFolderPath + " is delete success.");
            }
            else return false;
        }
        return true;
    }

    private boolean recursiveDeleteFolder(String path) {
        File folder = new File(path);
        try {
            if(folder.exists()) {
                File[] folder_list = folder.listFiles();
                if(folder_list != null) {
                    for(int i = 0; i < folder_list.length; i++) {
                        if(folder_list[i].isFile()) {
                            folder_list[i].delete();
                            log.debug(folder_list[i].getName() + " file is delete.");
                        } else {
                            recursiveDeleteFolder(folder_list[i].getPath());
                            log.debug(folder_list[i].getName() + " folder is delete.");
                        }
                        folder_list[i].delete();
                    }
                    folder.delete();
                } else {
                    log.error("recursive function NULL Point Exception.");
                    return false;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("recursive Delete Error");
            return false;
        }
        return true;
    }
}
