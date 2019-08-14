import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.scss']
})
export class PictureComponent implements OnInit {
  peopleList: Array<any> = [];
  allType: boolean;

  constructor() {}

  ngOnInit() {
    this.allType = true;
    this.peopleList = [
      {
        name: 'member1',
        type: 'member',
        src: '',
        show: true
      },
      {
        name: 'whitelist1',
        type: 'whiteList',
        src: '',
        show: true
      },
      {
        name: 'blacklist1',
        type: 'blackList',
        src: '',
        show: true
      },
      {
        name: 'unknown1',
        type: 'unknown',
        src: '',
        show: true
      },
      {
        name: 'member2',
        type: 'member',
        src: '',
        show: true
      },
      {
        name: 'whitelist2',
        type: 'whiteList',
        src: '',
        show: true
      },
      {
        name: 'blacklist2',
        type: 'blackList',
        src: '',
        show: true
      },
      {
        name: 'unknown2',
        type: 'unknown',
        src: '',
        show: true
      },
      {
        name: 'member3',
        type: 'member',
        src: '',
        show: true
      },
      {
        name: 'whitelist3',
        type: 'whiteList',
        src: '',
        show: true
      },
      {
        name: 'blacklist3',
        type: 'blackList',
        src: '',
        show: true
      },
      {
        name: 'unknown3',
        type: 'unknown',
        src: '',
        show: true
      }
    ];
  }
}
