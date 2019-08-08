import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MemberService } from 'app/face/member/member.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITreeNode, ITreeOptions, TreeNode } from 'angular-tree-component/dist/defs/api';
import { request } from 'http';
import { TreeComponent } from 'angular-tree-component';

@Component({
  selector: 'jhi-list',
  templateUrl: './member.component.html',
  styleUrls: ['./member.scss']
})
export class MemberComponent implements OnInit {
  folder_state;
  member_state;
  folderName: string;
  memberName: string;
  fWarning: string;
  mWarning: string;
  addRootPath: string;

  member_folder = [{}];
  del_checkbox = false;
  selectedTreeList: any = [];
  selectedTreePathList: any = [];
  deletePathList: any = [];
  delParentFolderId: string;
  activateId: string;
  activatePath: string;

  @ViewChild('componentInsideModal', { static: false }) componentInsideModals: any;
  @ViewChild(TreeComponent, { static: false }) private tree: TreeComponent;

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

  readMemberFolderRecursive(hasChildFolder: any, nodePath: string, data: any) {
    hasChildFolder.forEach(childFolder => {
      if (childFolder.hasChildren && nodePath.startsWith(childFolder.path)) {
        if (childFolder.path === nodePath) {
          childFolder.children = data;
          this.tree.treeModel.update();
        } else {
          this.readMemberFolderRecursive(childFolder.children, nodePath, data);
        }
      } else {
      }
    });
  }

  ngOnInit() {
    this.folder_state = true;
    this.member_state = false;
    this.memberService.initMembersFolder().subscribe(data => {
      this.member_folder = data;
    });
  }

  memberAdd() {
    // console.log(this.memberPath);
    // this.memberService.makeFolder().subscribe(data => {
    //   console.log(data);
    // });
  }

  openAddModal() {
    this.folderName = undefined;
    this.memberName = undefined;
    this.componentInsideModals.open();
    if (this.activatePath === undefined) {
      this.addRootPath = 'Members/';
    } else {
      this.addRootPath = 'Members/' + this.activatePath;
    }
    console.log(this.addRootPath);
  }

  deleteCheckboxToggle(use: boolean) {
    this.del_checkbox = use;
    this.options.useCheckbox = use;
  }

  selectedIdToPath(selectedList: any, memberFolder: any) {
    selectedList.forEach(selectedId => {
      memberFolder.forEach(folder => {
        if (folder.id === selectedId && this.selectedTreePathList.indexOf(folder.path) === -1) {
          this.selectedTreePathList.push(folder.path);
        } else if (selectedId.startsWith(folder.id) && selectedId.indexOf('-') !== -1) {
          if (folder.hasChildren) {
            this.selectedIdToPath(selectedList, folder.children);
          }
        }
      });
    });
  }

  deleteUpdateTree(checkFolder: any) {
    checkFolder.forEach((folder, index) => {
      this.selectedTreePathList.forEach(selectedData => {
        if (folder.path === selectedData) {
          checkFolder.splice(index, 1);
        } else {
          if (selectedData.startsWith(folder.path)) {
            this.deleteUpdateTree(folder.children);
          }
        }
      });
    });
  }

  deleteConfirm() {
    if (this.selectedTreeList.toString() !== '') {
      this.selectedIdToPath(this.selectedTreeList, this.member_folder);
      this.memberService.delMemberFolder(this.selectedTreePathList).subscribe(data => {
        console.log('delete ' + data);
      });
      // this.deleteUpdateTree(this.member_folder);
      // this.tree.treeModel.update();
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
        console.log('Activate Path : ' + this.activatePath);
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
    console.log(this.selectedTreeList);
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
  }

  deActivate(event) {
    this.activatePath = undefined;
  }

  toggle_state(menu: string) {
    if (menu === 'folder') {
      this.folder_state = true;
      this.member_state = false;
      this.memberName = undefined;
    } else {
      this.folder_state = false;
      this.member_state = true;
      this.folderName = undefined;
    }
  }

  onSubmit() {
    if (this.folder_state) {
      if (this.folderName === undefined) {
        this.fWarning = 'input folder name';
      } else {
        if (this.activatePath === undefined) {
          this.memberService.makeMembersFolder(this.folderName).subscribe(newFolderName => {
            if (newFolderName !== 'fail') {
              console.log(newFolderName + ' mkdir success.');
              this.member_folder.push({ id: this.member_folder.length.toString(), name: newFolderName });
              this.tree.treeModel.update();
            } else {
              console.log('mkdir failed.');
            }
          });
        } else {
          console.log(this.activatePath + this.folderName + '/');
        }
        this.componentInsideModals.close();
      }
    } else {
      if (this.memberName === undefined) {
        this.mWarning = 'input member name';
      } else {
        this.componentInsideModals.close();
      }
    }
  }
}
