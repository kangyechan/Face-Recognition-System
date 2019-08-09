import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.scss']
})
export class MatchComponent implements OnInit {
  peopleList: Array<any> = [];
  constructor() {}

  ngOnInit() {
    this.peopleList = [
      {
        name: 'member1',
        type: 'member',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/123.jpg'),
        show: true
      },
      {
        name: 'whitelist1',
        type: 'whiteList',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/live.jpg'),
        show: true
      },
      {
        name: 'blacklist1',
        type: 'blackList',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/live1.jpg'),
        show: true
      },
      {
        name: 'unknown1',
        type: 'unknown',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/live2.jpg'),
        show: true
      },
      {
        name: 'member2',
        type: 'member',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/1234.jpg'),
        show: true
      },
      {
        name: 'whitelist2',
        type: 'whiteList',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/12345.jpg'),
        show: true
      },
      {
        name: 'blacklist2',
        type: 'blackList',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/live.jpg'),
        show: true
      },
      {
        name: 'unknown2',
        type: 'unknown',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/live.jpg'),
        show: true
      },
      {
        name: 'member3',
        type: 'member',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/live1.jpg'),
        show: true
      },
      {
        name: 'whitelist3',
        type: 'whiteList',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/live2.jpg'),
        show: true
      },
      {
        name: 'blacklist3',
        type: 'blackList',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/123.jpg'),
        show: true
      },
      {
        name: 'unknown3',
        type: 'unknown',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/live.jpg'),
        show: true
      },
      {
        name: 'member4',
        type: 'member',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/1234.jpg'),
        show: true
      },
      {
        name: 'whitelist4',
        type: 'whiteList',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/live.jpg'),
        show: true
      },
      {
        name: 'blacklist4',
        type: 'blackList',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/12345.jpg'),
        show: true
      },
      {
        name: 'unknown4',
        type: 'unknown',
        src: require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/live.jpg'),
        show: true
      }
    ];
  }
}
