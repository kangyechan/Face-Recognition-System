package com.exntu.faceadmin.service;

import com.exntu.faceadmin.domain.Members;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Service for member
 */
@Service
public class MemberService {

    private final Logger log = LoggerFactory.getLogger(MemberService.class);

    @Value("${flask.root.path}")
    private String rootFolderPath;

    public MemberService() { }

    public Object readRootFolder() {
        int folderId = 0;
        ArrayList<Members> initMembers = new ArrayList<>();
        ArrayList<String> rootMemberNameList = new ArrayList<>();
        File rootFolder = new File(rootFolderPath);
        if(!rootFolder.exists()) {
            log.error("Root Folder is not found");
        } else {
            File rootUnknownFolder = new File(rootFolderPath + "Unknown/");
            if(!rootUnknownFolder.exists()) {
                rootUnknownFolder.mkdir();
                log.debug("Unknown folder make success.");
            }
            rootMemberNameList.add("Unknown");
            File[] arrRootFolder = rootFolder.listFiles();
            if(arrRootFolder != null) {
                for(File rootFolderName: arrRootFolder) {
                    if(!rootFolderName.isDirectory()) {
                        log.debug(rootFolderName.getName() + "is NOT Directory.");
                    } else {
                        Members member = new Members();
                        if(!rootFolderName.getName().equals("Unknown")) {
                            String[] arrRootFolderName = rootFolderName.getName().split(" ");
                            if(!rootMemberNameList.contains(arrRootFolderName[0])) {
                                rootMemberNameList.add(arrRootFolderName[0]);
                                member.setId(String.valueOf(folderId));
                                member.setName(arrRootFolderName[0]);
                                member.setPath("root/" + arrRootFolderName[0]);
                                member.setHasChildren(true);
                            } else {
                                continue;
                            }
                        } else {
                            member.setId(String.valueOf(folderId));
                            member.setName(rootFolderName.getName());
                            member.setPath("root/" + rootFolderName.getName());
                            File memList = new File(rootFolderPath + rootFolderName.getName() + "/");
                            File[] memListFolder = memList.listFiles();
                            if(memListFolder != null) {
                                if(memListFolder.length < 1) {
                                    member.setHasChildren(false);
                                    log.debug(rootFolderName.getName() + " This folder has not children.");
                                } else if(memListFolder.length == 1 && memListFolder[0].getName().startsWith(".")) {
                                    member.setHasChildren(false);
                                    log.debug(rootFolderName.getName() + " This folder has not children. only one file : .DS_Storeis.");
                                } else {
                                    member.setHasChildren(true);
                                    log.debug(rootFolderName.getName() + " This folder has children.");
                                }
                            } else {
                                log.error("MembersListFolder NULL Point Exception.");
                            }
                        }
                        folderId++;
                        initMembers.add(member);
                    }
                }
            } else {
                log.debug("arrRootFolder is NULL Point Exception.");
            }
        }
        return initMembers;
    }

    public boolean makeNewFolder(String folderPath, String folderName) {
        File newFolder = new File(rootFolderPath + folderPath + folderName + "/");
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
        ArrayList<Members> readMembers = new ArrayList<>();

        if(folderPath.startsWith("root/")) {
            if(folderPath.equals("root/Unknown")) {
                String unknownFolderPath = rootFolderPath + "Unknown/";
                File unknownFolder = new File(unknownFolderPath);
                File[] arrUnknownFolder = unknownFolder.listFiles();
                if(arrUnknownFolder != null) {
                    for(File unknownFolderChild: arrUnknownFolder) {
                        if(!unknownFolderChild.isDirectory()) {
                            Members member = new Members(
                                folderId + "-" + String.valueOf(memFolderId), unknownFolderChild.getName(),
                                "Unknown/" + unknownFolderChild.getName());
                            memFolderId++;
                            readMembers.add(member);
                        } else {
                            log.debug(unknownFolderChild.getName() + " is directory.");
                        }
                    }
                } else {
                    log.error("arrUnknownFolder Null point Exception.");
                }
            } else {
                File rootFolder = new File(rootFolderPath);
                File[] arrRootFolder = rootFolder.listFiles();
                if(arrRootFolder != null) {
                    for(File rootFolderChild: arrRootFolder) {
                        if(rootFolderChild.isDirectory() && !rootFolderChild.getName().equals("Unknown")) {
                            String[] arrRootFolderChildName = rootFolderChild.getName().split(" ");
                            StringBuilder folderChildName = new StringBuilder();
                            for(int i = 1; i < arrRootFolderChildName.length; i++) {
                                if(i == 1) {
                                    folderChildName.append(arrRootFolderChildName[i]);
                                } else {
                                    folderChildName.append(" ");
                                    folderChildName.append(arrRootFolderChildName[i]);
                                }
                            }
                            if(arrRootFolderChildName[0].equals(folderName)) {
                                Members member = new Members(
                                    folderId + "-" + String.valueOf(memFolderId), folderChildName.toString(),
                                    rootFolderChild.getName() + "/");
                                File childFolder = new File(rootFolderPath + rootFolderChild.getName() + "/");
                                File[] arrChildFolder = childFolder.listFiles();
                                if (arrChildFolder != null) {
                                    if(arrChildFolder.length < 1) {
                                        member.setHasChildren(false);
                                        log.debug(rootFolderChild.getName() + " This folder has not children.");
                                    } else if(arrChildFolder.length == 1 && arrChildFolder[0].getName().startsWith(".")) {
                                        member.setHasChildren(false);
                                        log.debug(rootFolderChild.getName() + " This folder has not children. only one file : .DS_Storeis.");
                                    } else {
                                        member.setHasChildren(true);
                                        log.debug(rootFolderChild.getName() + " This folder has children.");
                                    }
                                } else {
                                    log.error("arrChildFolder is Null point Exception.");
                                }
                                memFolderId++;
                                readMembers.add(member);
                            }
                        } else {
                            log.error(rootFolderChild.getName() + " is not directory or Unknown Folder.");
                        }
                    }
                } else {
                    log.error("arrRootFolder Null point Exception.");
                }
            }
        } else {
            String readMembersFolderPath = rootFolderPath + folderPath;
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
        }
        return readMembers;
    }

    public boolean deleteFolder(ArrayList<String> selectedList) {
        for(String delFolderPath: selectedList) {
            String[] delFolderPathSplit = delFolderPath.split("/");
            if(delFolderPathSplit[0].equals("root")) {
                File rootFolder = new File(rootFolderPath);
                File[] rootFolderList = rootFolder.listFiles();
                if(rootFolderList != null) {
                    for(File rootFolderAllList: rootFolderList) {
                        if(rootFolderAllList.getName().split(" ")[0].equals(delFolderPathSplit[1])) {
                            if(recursiveDeleteFolder(rootFolderPath + rootFolderAllList.getName())) {
                                log.debug(delFolderPath + " is delete success.");
                            } else return false;
                        }
                    }
                } else {
                    log.error("Delete RootFolderList Null Point Exception.");
                }
            } else {
                if(recursiveDeleteFolder(rootFolderPath + delFolderPath)) {
                    log.debug(delFolderPath + " is delete success.");
                } else return false;
            }
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
                        for(File folderListName: folder_list) {
                            recursiveDeleteFolder(folderListName.getPath());
                            log.debug(folderListName.getName() + " folder is delete.");
                            folderListName.delete();
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

    public HashMap<String, Object> getImagePath(String selectPath) {
        HashMap<String, Object> hashMap = new HashMap<>();
        String folderPath = rootFolderPath + selectPath;
        File selectFile = new File(folderPath);
        if(!selectFile.exists()) {
            log.error(selectFile + " is not exists.");
        } else {
            hashMap.put("name", selectFile.getName());
            hashMap.put("realPath", selectPath);
            hashMap.put("getPath", "api/member/image-list?imagePath="+ selectPath);
            hashMap.put("isActive", false);
        }
        return hashMap;
    }

    public ArrayList<HashMap<String, Object>> getImagePathList(String selectPath) {
        ArrayList<HashMap<String, Object>> pathList = new ArrayList<>();
        String folderPath = rootFolderPath + selectPath;
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
                log.error("arrAllSelectFolder is NULL Point Exception.");
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
        FileInputStream fin = new FileInputStream(this.rootFolderPath + imagePath);
        return IOUtils.toByteArray(fin);
    }

    public boolean copyMember(ArrayList<String> copyList, ArrayList<String> copyNameList, String destPath) {
        FileInputStream sourceF = null;
        FileOutputStream destF = null;
        File copyFolder = new File(rootFolderPath + destPath);
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
            File sourceFile = new File(rootFolderPath + copyList.get(i));
            try {
                sourceF = new FileInputStream(sourceFile);
                destF = new FileOutputStream(new File(rootFolderPath + destPath + copyNameList.get(i)));
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
