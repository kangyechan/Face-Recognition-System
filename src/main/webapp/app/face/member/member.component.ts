import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from './member.service';
import { MemberLiveComponent } from './member-live/member-live.component';
import { ITreeOptions, TreeComponent, TreeNode } from 'angular-tree-component';

@Component({
  selector: 'jhi-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.scss']
})
export class MemberComponent implements OnInit {
  folder_state;
  member_state;
  inputName: string;
  inputCompanyName: string;
  inputMemberName: string;

  member_folder = [{}];
  del_checkbox = false;
  selectedTreeList: any = [];
  selectedTreePathList: any = [];
  activateId: string;
  activatePath: string;
  selectedCard: Array<any> = [];
  selectedCardName = [];
  selectedCardPath = [];
  selectedCardState: boolean;

  @ViewChild('componentInsideModal', { static: false }) componentInsideModals: any;
  @ViewChild(TreeComponent, { static: false }) private tree: TreeComponent;
  @ViewChild(MemberLiveComponent, { static: false }) private memberLiveComponent: MemberLiveComponent;

  public options: ITreeOptions = {
    useTriState: false,
    useCheckbox: this.del_checkbox,
    getChildren: (node: TreeNode) => {
      this.memberService.readMemberFolderLists(node.data.id, node.data.name, node.data.path).subscribe(data => {
        this.readMemberFolderRecursive(this.member_folder, node.data.path, data);
      });
    }
  };

  constructor(private memberService: MemberService) {}

  readMemberFolderRecursive(hasChildFolder: any[], nodePath: string, data: any) {
    if (nodePath.startsWith('root/')) {
      hasChildFolder.forEach(childFolder => {
        if (childFolder.hasChildren && nodePath.endsWith(childFolder.name)) {
          childFolder.children = data;
          this.tree.treeModel.update();
        }
      });
    } else {
      hasChildFolder.forEach(childFolder => {
        if (childFolder.hasChildren) {
          if (childFolder.path === nodePath) {
            childFolder.children = data;
            this.tree.treeModel.update();
          } else if (nodePath.startsWith(childFolder.name)) {
            this.readMemberFolderRecursive(childFolder.children, nodePath, data);
          } else {
          }
        }
      });
    }
  }

  ngOnInit() {
    this.folder_state = true;
    this.member_state = false;
    this.memberService.initMembersFolder().subscribe(data => {
      this.member_folder = data;
    });
    this.selectedCardState = false;
  }

  deleteCheckboxToggle(use: boolean) {
    this.del_checkbox = use;
    this.options.useCheckbox = use;
  }

  selectedIdToPath(selectedId: string, memberFolder: any[]) {
    memberFolder.forEach(folder => {
      if (folder.id === selectedId && this.selectedTreePathList.indexOf(folder.path) === -1) {
        this.selectedTreePathList.push(folder.path);
      } else {
        if (selectedId.startsWith(folder.id) && selectedId.indexOf('-') !== -1) {
          if (folder.hasChildren) {
            this.selectedIdToPath(selectedId, folder.children);
          }
        }
      }
    });
  }

  deleteConfirm() {
    if (this.selectedTreeList.length !== 0) {
      this.selectedTreeList.forEach(selectedId => {
        this.selectedIdToPath(selectedId, this.member_folder);
      });
      this.memberService.delMemberFolder(this.selectedTreePathList).subscribe(data => {
        console.log('delete ' + data);
        this.memberService.initMembersFolder().subscribe(refresh => {
          this.member_folder = refresh;
          this.tree.treeModel.selectedLeafNodes.forEach(node => {
            this.tree.treeModel.setSelectedNode(node, false);
          });
          this.tree.treeModel.expandedNodes.forEach(expandNode => {
            this.tree.treeModel.setExpandedNode(expandNode, false);
          });
          this.tree.treeModel.setActiveNode(this.tree.treeModel.getActiveNode(), false);
          this.tree.treeModel.update();
        });
      });
      this.selectedTreeList = [];
      this.selectedTreePathList = [];
    } else {
      console.log('SelectedTreeList is null');
    }
  }

  activateRecursive(checkFolder: any, id: string) {
    checkFolder.forEach(folder => {
      if (folder.id === id) {
        this.activatePath = folder.path;
      } else if (id.startsWith(folder.id) && id.indexOf('-') !== -1) {
        if (folder.hasChildren) {
          this.activateRecursive(folder.children, id);
        }
      }
    });
  }

  onSelect(event) {
    this.selectedTreeList = Object.entries(event.treeModel.selectedLeafNodeIds)
      .filter(([key, value]) => {
        return value === true;
      })
      .map(node => node[0]);
  }

  deSelect(event) {
    this.selectedTreeList = Object.entries(event.treeModel.selectedLeafNodeIds)
      .filter(([key, value]) => {
        return value === true;
      })
      .map(node => node[0]);
  }

  onActivate(event) {
    this.activateId = Object.entries(event.treeModel.activeNodeIds)
      .filter(([key, value]) => {
        return value === true;
      })
      .map(node => node[0])
      .toString();
    this.activateRecursive(this.member_folder, this.activateId);
    this.memberLiveComponent.faceList = [];
    if (
      this.activatePath.toLowerCase().endsWith('.jpg') ||
      this.activatePath.toLowerCase().endsWith('.png') ||
      this.activatePath.toLowerCase().endsWith('.jpeg') ||
      this.activatePath.toLowerCase().endsWith('.gif') ||
      this.activatePath.toLowerCase().endsWith('.bmp') ||
      this.activatePath.toLowerCase().endsWith('.tif') ||
      this.activatePath.toLowerCase().endsWith('.tiff')
    ) {
      this.memberLiveComponent.isSelectImage = true;
      this.memberService.getSingleImagePath(this.activatePath).subscribe(imagePathList => {
        if (imagePathList.toString() !== '') {
          this.memberLiveComponent.emptyImage = false;
          this.memberLiveComponent.selectImage = imagePathList;
        } else {
          this.memberLiveComponent.emptyImage = true;
        }
      });
    } else {
      if (this.activatePath.startsWith('root/')) {
        this.activatePath = this.activatePath.split('/')[1] + '/';
      }
      this.memberLiveComponent.isSelectImage = false;
      this.memberService.getImagePath(this.activatePath).subscribe(imagePathList => {
        if (imagePathList.toString() !== '') {
          this.memberLiveComponent.emptyImage = false;
          this.memberLiveComponent.faceList = imagePathList;
        } else {
          this.memberLiveComponent.emptyImage = true;
        }
      });
    }
  }

  deActivate(event) {
    this.activatePath = undefined;
    this.memberLiveComponent.isSelectImage = false;
    this.memberLiveComponent.emptyImage = true;
    this.memberLiveComponent.faceList = [];
    this.memberLiveComponent.targetCardList.forEach(target => {
      target.isActive = false;
    });
    this.memberLiveComponent.targetCardList = [];
    this.selectedCard = [];
  }

  toggle_state(menu: string) {
    if (menu === 'folder') {
      this.folder_state = true;
      this.member_state = false;
      this.inputName = undefined;
      this.inputCompanyName = undefined;
      this.inputMemberName = undefined;
      this.selectedCard = [];
      this.selectedCardState = false;
    } else {
      this.folder_state = false;
      this.member_state = true;
      this.inputName = undefined;
      this.inputCompanyName = undefined;
      this.inputMemberName = undefined;
    }
  }

  openAddModal() {
    this.inputCompanyName = undefined;
    this.inputMemberName = undefined;
    this.inputName = undefined;
    this.selectedCard = [];
    this.componentInsideModals.open();
    if (this.memberLiveComponent.targetCardList.length !== 0) {
      this.member_state = true;
      this.folder_state = false;
      this.selectedCard = this.memberLiveComponent.targetCardList;
      this.memberLiveComponent.targetCardList.forEach(target => {
        target.isActive = false;
      });
      this.memberLiveComponent.targetCardList = [];
      this.selectedCardState = true;
    } else {
      this.selectedCardState = false;
    }
  }

  recursiveAddFolder(memberFolder: any, destPath: string, newFolder: string) {
    memberFolder.forEach(folder => {
      if (destPath === folder.path) {
        if (!folder.hasChildren) {
          folder.hasChildren = true;
          folder.children = [{ id: folder.id + '-0', name: newFolder, path: destPath + newFolder + '/', hasChildren: false }];
        } else {
          folder.children.push({
            id: folder.id + '-' + folder.children.length.toString(),
            name: newFolder,
            path: destPath + newFolder + '/',
            hasChildren: false
          });
        }
      } else {
        if (destPath.startsWith(folder.path) && folder.hasChildren) {
          this.recursiveAddFolder(folder.children, destPath, newFolder);
        }
      }
    });
  }

  onSubmit() {
    if (
      this.inputMemberName === undefined ||
      this.inputCompanyName === undefined ||
      this.inputMemberName === '' ||
      this.inputCompanyName === ''
    ) {
      this.inputMemberName = undefined;
      this.inputCompanyName = undefined;
    } else {
      this.inputName = this.inputCompanyName + ' ' + this.inputMemberName;
      if (this.folder_state) {
        this.memberService.makeMembersFolder('', this.inputName).subscribe(newFolderName => {
          if (newFolderName !== 'fail') {
            console.log(newFolderName + ' mkdir success.');
            this.memberService.initMembersFolder().subscribe(refresh => {
              this.member_folder = refresh;
              this.tree.treeModel.update();
            });
          } else {
            console.log(newFolderName + ' mkdir failed.');
          }
        });
      } else {
        this.selectedCard.forEach(card => {
          this.selectedCardName.push(card.name);
          this.selectedCardPath.push(card.realPath);
        });
        this.memberService.copySelectMember(this.inputName + '/', this.selectedCardPath, this.selectedCardName).subscribe(result => {
          if (result === 'true') {
            this.memberService.initMembersFolder().subscribe(refresh => {
              this.member_folder = refresh;
              this.tree.treeModel.update();
            });
          } else {
            console.log('copy error');
          }
        });
      }
      this.selectedCardName = [];
      this.selectedCardPath = [];
      this.selectedCard = [];
      this.memberLiveComponent.targetCardList.forEach(target => {
        target.isActive = false;
      });
      this.memberLiveComponent.targetCardList = [];
      this.componentInsideModals.close();
    }
  }

  deleteCard(face: any) {
    this.selectedCard.splice(this.selectedCard.indexOf(face), 1);
  }
}
