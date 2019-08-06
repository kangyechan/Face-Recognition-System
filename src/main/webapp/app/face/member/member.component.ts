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
  member_folder = [{}];
  del_checkbox = false;
  selectedTreeList: any;

  @ViewChild(TreeComponent, { static: false }) private tree: TreeComponent;

  nodes = [
    {
      id: '01',
      name: 'exntu',
      children: [{ id: '01-1', name: 'child1' }, { id: '01-2', name: 'child2' }]
    },
    {
      id: '02',
      name: 'magenta',
      children: [
        { id: '02-1', name: 'child2.1' },
        {
          id: '02-2',
          name: 'child2.2',
          children: [{ id: '02-2-1', name: 'subsub' }]
        }
      ]
    },
    {
      id: '03',
      name: 'whitelist',
      children: [{ id: '03-1', name: 'child3.1' }, { id: '03-2', name: 'child3.2' }]
    },
    {
      id: '04',
      name: 'blacklist',
      children: [{ id: '04-1', name: 'blacklist4.1' }, { id: '04-2', name: 'blakclist4.2' }]
    }
    // {
    //   id: '05',
    //   name: 'unknown',
    //   hasChildren: true
    // }
  ];
  options: ITreeOptions = {
    useCheckbox: this.del_checkbox,
    getChildren: (node: TreeNode) => {
      this.memberService.readMemberFolderLists(node.data.id, node.data.name).subscribe(data => {
        this.member_folder.forEach(folder => {
          if (folder.id === node.data.id) {
            folder.children = data;
            this.tree.treeModel.update();
          }
        });
      });
    }
  };

  folder_state;
  member_state;
  folderName: string;
  memberName: string;
  fWarning: string;
  mWarning: string;

  @ViewChild('componentInsideModal', { static: false })
  componentInsideModals: ElementRef<any>;

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.folder_state = true;
    this.member_state = false;
    this.memberService.initMembersFolder().subscribe(data => {
      this.member_folder = data;
      console.log(this.member_folder);
    });
  }

  memberAdd() {
    // console.log(this.memberPath);
    // this.memberService.makeFolder().subscribe(data => {
    //   console.log(data);
    // });
  }

  del_checkbox_toggle(use: boolean) {
    this.del_checkbox = use;
    this.options.useCheckbox = use;
  }

  del_confirm() {
    console.log('selectedTreeList 의 구성요소를 삭제');
  }

  onSelect(event) {
    this.selectedTreeList = Object.entries(event.treeModel.selectedLeafNodeIds)
      .filter(([key, value]) => {
        return value === true;
      })
      .map(node => node[0]);
    console.log(this.selectedTreeList);
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
        this.memberService.makeMembersFolder(this.folderName).subscribe(newFolderName => {
          if (newFolderName !== 'fail') {
            console.log(newFolderName + ' mkdir success.');
            this.member_folder.push({ name: newFolderName });
            this.tree.treeModel.update();
          } else {
            console.log('mkdir failed.');
          }
          this.folderName = undefined;
          this.componentInsideModals.close();
        });
      }
    } else {
      if (this.memberName === undefined) {
        this.mWarning = 'input member name';
      } else {
        this.memberName = undefined;
        this.componentInsideModals.close();
      }
    }
  }
}
