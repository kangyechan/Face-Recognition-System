import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from './member.service';
import { MemberLiveComponent } from './member-live/member-live.component';
import { ITreeOptions, TreeComponent, TreeNode } from 'angular-tree-component';
import { MatDialog } from '@angular/material/dialog';
import { CustomModalComponent } from 'app/custom-modal/custom-modal.component';
import { CustomComfirmModalComponent } from 'app/custom-modal/custom-comfirm-modal.component';

@Component({
  selector: 'jhi-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.scss']
})
export class MemberComponent implements OnInit {
  inputName: string;
  inputCompanyName: string;
  inputMemberName: string;

  folder_state = true;
  member_state = false;

  member_folder = [{}];
  del_checkbox = false;
  selectedTreeList: any = [];
  selectedTreePathList: any = [];
  activateId: string;
  activatePath: string;
  selectedCard: Array<any> = [];
  selectedCardName = [];
  selectedCardPath = [];
  selectedCardState = true;

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

  constructor(private memberService: MemberService, public dialog: MatDialog) {}

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
    this.memberService.initMembersFolder().subscribe(data => {
      this.member_folder = data;
    });
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
      this.confirmAlertSet('Confirm', '정말 삭제하시겠습니까?');
    } else {
      console.log('SelectedTreeList is null');
      this.alertSet('Warning', '삭제할 폴더를 선택해주세요.');
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
    this.memberLiveComponent.cardCount = 50;
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
          this.memberLiveComponent.emptyMessage = this.activatePath + ' 폴더에 이미지가 존재하지 않습니다.';
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
    this.memberLiveComponent.emptyMessage = '폴더를 선택해주세요.';
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

  onSubmit() {
    if (
      this.inputMemberName === undefined ||
      this.inputCompanyName === undefined ||
      this.inputMemberName === '' ||
      this.inputCompanyName === ''
    ) {
      this.alertSet('Warning', '저장 경로를 입력해주세요.');
      this.inputMemberName = undefined;
      this.inputCompanyName = undefined;
    } else {
      if (this.inputCompanyName.toLowerCase() === 'unknown') {
        this.alertSet('Warning', 'unknown 폴더로 복사할 수 없습니다.');
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
        this.alertSet('Complete', '저장되었습니다.');
        this.componentInsideModals.close();
      }
    }
  }

  deleteCard(face: any) {
    this.selectedCard.splice(this.selectedCard.indexOf(face), 1);
  }

  alertSet(alertTitle: string, alertContents: string) {
    this.dialog.open(CustomModalComponent, {
      data: {
        title: alertTitle,
        contents: alertContents
      }
    });
  }

  confirmAlertSet(alertTitle: string, alertContents: string) {
    const dialogRef = this.dialog.open(CustomComfirmModalComponent, {
      data: {
        title: alertTitle,
        contents: alertContents
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
        this.alertSet('Complete', '삭제되었습니다.');
        this.selectedTreeList = [];
        this.selectedTreePathList = [];
        this.del_checkbox = false;
        this.options.useCheckbox = false;
      }
    });
  }

  getChangeState(isChange) {
    if (isChange) {
      this.memberService.initMembersFolder().subscribe(refresh => {
        this.member_folder = refresh;
        this.tree.treeModel.expandedNodes.forEach(expandNode => {
          this.tree.treeModel.setExpandedNode(expandNode, true);
        });
        this.tree.treeModel.setActiveNode(this.tree.treeModel.getActiveNode(), true);
        this.tree.treeModel.update();
      });
      this.memberService.getImagePath(this.activatePath).subscribe(imagePathList => {
        if (imagePathList.toString() !== '') {
          this.memberLiveComponent.emptyImage = false;
          this.memberLiveComponent.faceList = imagePathList;
        } else {
          this.memberLiveComponent.emptyImage = true;
          this.memberLiveComponent.emptyMessage = this.activatePath + ' 폴더에 이미지가 존재하지 않습니다.';
        }
      });
    }
  }
}
