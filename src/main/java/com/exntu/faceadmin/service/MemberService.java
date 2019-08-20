package com.exntu.faceadmin.service;

import com.exntu.faceadmin.domain.Members;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Service for member
 * <p>
 * We use the {@link Async} annotation to member manages asynchronously.
 */
@Service
public class MemberService {

    private final Logger log = LoggerFactory.getLogger(MemberService.class);
    private String membersFolderPath;

    public MemberService() {
        this.membersFolderPath = "/Users/kang-yechan/Desktop/frs/flask-frs/dataset/";
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
                            } else if(memListFolder.length < 2 && memListFolder[0].getName().startsWith(".")) {
                                membersList.setHasChildren(false);
                                log.debug(rootFolderName.getName() + " This folder has not children. only one file : .DS_Storeis.");
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

    public boolean makeNewFolder(String folderPath, String folderName) {
        File newFolder = new File(membersFolderPath + folderPath + folderName + "/");
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
                        if(isImageFile(memFolderName.getName())) {
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
                            } else if(memListFolderChildren.length < 2 && memListFolderChildren[0].getName().startsWith(".")) {
                                memList.setHasChildren(false);
                                log.debug(memFolderName.getName() + " This folder has not children. only one file : .DS_Storeis.");
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
                if(folder.isFile()) {
                    folder.delete();
                    log.debug(folder.getName() + " file is delete.");
                } else {
                    File[] folder_list = folder.listFiles();
                    if(folder_list != null) {
                        for(File folderlistName: folder_list) {
                            recursiveDeleteFolder(folderlistName.getPath());
                            log.debug(folderlistName.getName() + " folder is delete.");
                            folderlistName.delete();
                        }
                        folder.delete();
                    } else {
                        log.error("recursive function NULL Point Exception.");
                        return false;
                    }
                }
            } else {
                log.debug(path + "'s file or folder already deleted.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("recursive Delete Error");
            return false;
        }
        return true;
    }

    public ArrayList<HashMap<String, Object>> getImagePathList(String selectPath) {
        ArrayList<HashMap<String, Object>> pathList = new ArrayList<>();
        String folderPath = membersFolderPath + selectPath;
        File selectFolder = new File(folderPath);
        if(!selectFolder.exists()) {
            log.error(selectPath + " is not exists.");
        } else {
            File[] arrAllSelectFolder = selectFolder.listFiles();
            if(arrAllSelectFolder != null) {
                for(File inFile: arrAllSelectFolder) {
                    HashMap<String, Object> hashMap = new HashMap<>();
                    if(isImageFile(inFile.getName())) {
                        hashMap.put("name", inFile.getName());
                        hashMap.put("realPath", selectPath + inFile.getName());
                        hashMap.put("getPath", "api/member/image-list?imagePath=" + selectPath + inFile.getName());
                        hashMap.put("isActive", false);
                        pathList.add(hashMap);
                    }
                }
            } else {
                log.debug("arrAllSelectFolder is NULL Point Exception.");
            }
        }
        return pathList;
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

    public byte[] getImgSrc(String imagePath) throws IOException {
        FileInputStream fin = new FileInputStream(this.membersFolderPath + imagePath);
        return IOUtils.toByteArray(fin);
    }

    public boolean copyMember(ArrayList<String> copyList, ArrayList<String> copyNameList, String destPath) {
        FileInputStream sourceF = null;
        FileOutputStream destF = null;
        File copyFolder = new File(membersFolderPath + destPath);
        if(!copyFolder.exists()) {
            try {
                copyFolder.mkdir();
                log.debug(destPath + " folder make success.");
            } catch (Exception e) {
                e.printStackTrace();
                log.error("copyMember Mkdir Exception.");
                return false;
            }
        }
        log.debug("Your selectCard List alive destPath.");
        System.out.println(copyList);
        for(int i = 0; i < copyList.size(); i++) {
            File sourceFile = new File(membersFolderPath + copyList.get(i));
            try {
                sourceF = new FileInputStream(sourceFile);
                destF = new FileOutputStream(new File(membersFolderPath + destPath + copyNameList.get(i)));
                int readBuffer = 0;
                while ((readBuffer = sourceF.read()) != -1) {
                    destF.write(readBuffer);
                }
                log.debug(copyList.get(i) + copyNameList.get(i) + " image file copy success.");
                sourceF.close();
                destF.close();
            } catch (IOException e) {
                e.printStackTrace();
                log.error("copyMember IOException.");
                return false;
            }
        }
        return true;
    }
}
