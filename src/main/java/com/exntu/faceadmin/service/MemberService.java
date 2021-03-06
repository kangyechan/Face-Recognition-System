package com.exntu.faceadmin.service;

import com.exntu.faceadmin.domain.Members;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Service for member
 * We use the {@link Async} annotation to get image srcs asynchronously.
 */
@Service
public class MemberService {

    private final Logger log = LoggerFactory.getLogger(MemberService.class);

    @Value("${flask.root.path}")
    private String rootFolderPath;

    @Value("${flask.collect.path}")
    private String collectFolderPath;

    public MemberService() { }

    public Object readRootFolder() {
        int folderId = 0;
        ArrayList<Members> initMembers = new ArrayList<>();
        ArrayList<String> rootMemberNameList = new ArrayList<>();

        File collectFolder = new File(collectFolderPath);
        if(!collectFolder.exists()) {
            log.debug("collect_images Folder is not found so folder mkdir...");
            collectFolder.mkdir();
        }
        Members unknownMember = new Members();
        File collectUnknownFolder = new File(collectFolderPath + "unknown/");
        if(!collectUnknownFolder.exists()) {
            collectUnknownFolder.mkdir();
            log.error("unknown folder is not exists so I make.");
        }
        unknownMember.setId(String.valueOf(folderId));
        unknownMember.setName("unknown");
        unknownMember.setPath("root/unknown");
        unknownMember.setHasChildren(false);
        folderId++;
        initMembers.add(unknownMember);
        rootMemberNameList.add("unknown");

        File rootFolder = new File(rootFolderPath);
        if(!rootFolder.exists()) {
            log.error("Dataset Folder is not found");
        } else {
            File[] arrRootFolder = rootFolder.listFiles();
            if(arrRootFolder != null) {
                for(File rootFolderName: arrRootFolder) {
                    if(!rootFolderName.isDirectory()) {
                        log.debug(rootFolderName.getName() + "is NOT Directory.");
                    } else {
                        Members member = new Members();
                        if(!rootFolderName.getName().equalsIgnoreCase("unknown")) {
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
                            continue;
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
        File newFolder;
        if(folderPath.equalsIgnoreCase("unknown")) {
            newFolder = new File(collectFolderPath + folderPath + "/" + folderName);
        } else {
            newFolder = new File(rootFolderPath + folderPath + folderName + "/");
        }
        if(!newFolder.exists()) {
            newFolder.mkdir();
            log.debug("new unknown child folder make success.");
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
            if(folderPath.equalsIgnoreCase("root/unknown")) {
                String unknownFolderPath = collectFolderPath + "unknown/";
                File unknownFolder = new File(unknownFolderPath);
                File[] arrUnknownFolder = unknownFolder.listFiles();
                if(arrUnknownFolder != null) {
                    for(File unknownFolderChild: arrUnknownFolder) {
                        if(!unknownFolderChild.isDirectory()) {
                            Members member = new Members(
                                folderId + "-" + String.valueOf(memFolderId), unknownFolderChild.getName(),
                                "unknown/" + unknownFolderChild.getName());
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
                        if(rootFolderChild.isDirectory() && !rootFolderChild.getName().equalsIgnoreCase("unknown")) {
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
                            if(arrRootFolderChildName[0].equalsIgnoreCase(folderName)) {
                                Members member = new Members(
                                    folderId + "-" + String.valueOf(memFolderId), folderChildName.toString(),
                                    rootFolderChild.getName() + "/");
                                File childFolder = new File(rootFolderPath + rootFolderChild.getName() + "/");
                                File[] arrChildFolder = childFolder.listFiles();
                                if (arrChildFolder != null) {
                                    setFolderHasChildren(arrChildFolder, member, rootFolderChild);
                                } else {
                                    log.error("arrChildFolder is Null point Exception.");
                                }
                                memFolderId++;
                                readMembers.add(member);
                            }
                        } else {
                            log.debug(rootFolderChild.getName() + " is not directory or Unknown Folder.");
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
                                setFolderHasChildren(memListFolderChildren, memList, memFolderName);
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
            if(delFolderPathSplit[0].equalsIgnoreCase("root")) {
                if(delFolderPathSplit[1].equalsIgnoreCase("unknown")) {
                    if (recursiveDeleteFolder(collectFolderPath + "unknown")) {
                        log.debug(delFolderPath + " is Unknown folder. delete success.");
                    } else return false;
                } else {
                    File rootFolder = new File(rootFolderPath);
                    File[] rootFolderList = rootFolder.listFiles();
                    if (rootFolderList != null) {
                        for (File rootFolderAllList : rootFolderList) {
                            if (rootFolderAllList.getName().split(" ")[0].equalsIgnoreCase(delFolderPathSplit[1])) {
                                if (recursiveDeleteFolder(rootFolderPath + rootFolderAllList.getName())) {
                                    log.debug(delFolderPath + " is delete success.");
                                } else return false;
                            }
                        }
                    } else {
                        log.error("Delete RootFolderList Null Point Exception.");
                    }
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
        File selectFile = new File(checkUnknownPath(selectPath));
        if(!selectFile.exists()) {
            log.error(selectPath + " is not exists.");
        } else {
            hashMap.put("name", selectFile.getName());
        }
        hashMap.put("realPath", selectPath);
        hashMap.put("getPath", "api/member/image-list?imagePath="+ selectPath);
        hashMap.put("isActive", false);
        return hashMap;
    }

    public ArrayList<HashMap<String, Object>> getImagePathList(String selectPath) {
        ArrayList<HashMap<String, Object>> pathList = new ArrayList<>();
        File selectFolder = new File(checkUnknownPath(selectPath));
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

    public boolean copyMember(ArrayList<String> copyList, ArrayList<String> copyNameList, String destPath) {
        FileInputStream sourceF = null;
        FileOutputStream destF = null;
        String destFolder;
        if(destPath.split(" ")[0].equalsIgnoreCase("unknown")) {
            destFolder = collectFolderPath + destPath;
        } else {
            destFolder = rootFolderPath + destPath;
        }
        File copyFolder = new File(destFolder);
        if(!copyFolder.exists()) {
            copyFolder.mkdir();
            log.debug(destPath + " mkdir success.");
        }
        for(int i = 0; i < copyList.size(); i++) {
            File sourceFile;
            if(copyList.get(i).split("/")[0].equalsIgnoreCase("unknown")) {
                sourceFile = new File(collectFolderPath + copyList.get(i));
            } else {
                sourceFile = new File(rootFolderPath + copyList.get(i));
            }
            try {
                sourceF = new FileInputStream(sourceFile);
                destF = new FileOutputStream(new File(destFolder + copyNameList.get(i)));
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

    private String checkUnknownPath(String selectPath) {
        String filePath;
        if(selectPath.toLowerCase().startsWith("unknown/")) {
            filePath = collectFolderPath + selectPath;
        } else {
            filePath = rootFolderPath + selectPath;
        }
        return filePath;
    }

    private void setFolderHasChildren (File[] folderList, Members members, File folder) {
        if(folderList.length < 1) {
            members.setHasChildren(false);
            log.debug(folder.getName() + " This folder has not children.");
        } else if(folderList.length == 1 && folderList[0].getName().startsWith(".")) {
            members.setHasChildren(false);
            log.debug(folder.getName() + " This folder has not children. only one file : .DS_Storeis.");
        } else {
            members.setHasChildren(true);
            log.debug(folder.getName() + " This folder has children.");
        }
    }
}
