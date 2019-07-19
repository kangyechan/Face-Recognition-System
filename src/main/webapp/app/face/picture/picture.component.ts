import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.scss']
})
export class PictureComponent implements OnInit {
  peopleList: Array<any> = [];
  showType: string;
  allType: boolean;

  constructor() {}

  ngOnInit() {
    this.allType = true;
    this.peopleList = [
      { name: 'member1', type: 'member', show: true },
      { name: 'whitelist1', type: 'whiteList', show: true },
      { name: 'blacklist1', type: 'blackList', show: true },
      { name: 'unknown1', type: 'unknown', show: true },
      { name: 'member2', type: 'member', show: true },
      { name: 'whitelist2', type: 'whiteList', show: true },
      { name: 'blacklist2', type: 'blackList', show: true },
      { name: 'unknown2', type: 'unknown', show: true },
      { name: 'member3', type: 'member', show: true },
      { name: 'whitelist3', type: 'whiteList', show: true },
      { name: 'blacklist3', type: 'blackList', show: true },
      { name: 'unknown3', type: 'unknown', show: true },
      { name: 'member4', type: 'member', show: true },
      { name: 'whitelist4', type: 'whiteList', show: true },
      { name: 'blacklist4', type: 'blackList', show: true },
      { name: 'unknown4', type: 'unknown', show: true }
    ];
  }
}
