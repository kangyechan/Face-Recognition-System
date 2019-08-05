import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MemberService } from 'app/face/member/member.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreeNode } from 'angular-tree-component/dist/defs/api';
import { request } from 'http';

@Component({
  selector: 'jhi-list',
  templateUrl: './member.component.html',
  styleUrls: ['./member.scss']
})
export class MemberComponent implements OnInit {
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
          children: [{ id: 2 - 2 - 1, name: 'subsub' }]
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
    },
    {
      id: '05',
      name: 'unknown',
      hasChildren: true
    }
  ];
  options = {
    getChildren: (node: TreeNode) => {
      return request('/api/children/' + node.id);
    }
  };

  folder_state;
  member_state;
  folderName: string;
  memberName: string;
  fwarning: string;
  mwarning: string;

  @ViewChild('componentInsideModal', { static: false })
  componentInsideModals: ElementRef<any>;

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.folder_state = true;
    this.member_state = false;
  }

  memberAdd() {
    // console.log(this.memberPath);
    this.memberService.makeFolder().subscribe(data => {
      console.log(data);
    });
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
        this.fwarning = 'input folder name';
      } else {
        console.log(this.folderName);
        this.folderName = undefined;
        this.componentInsideModals.close();
      }
    } else {
      if (this.memberName === undefined) {
        this.mwarning = 'input member name';
      } else {
        this.memberName = undefined;
        this.componentInsideModals.close();
      }
    }
  }
}
