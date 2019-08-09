import { Component, OnInit, ViewChild } from '@angular/core';
import { PictureComponent } from 'app/face/picture/picture.component';

@Component({
  selector: 'jhi-detect',
  templateUrl: './detect.component.html',
  styleUrls: ['./detect.scss']
})
export class DetectComponent implements OnInit {
  @ViewChild(PictureComponent, { static: false }) private picture: PictureComponent;

  allCheckbox = true;
  memCheckbox = true;
  whiteCheckbox = true;
  blackCheckbox = true;
  unknownCheckbox = true;

  constructor() {}

  ngOnInit() {}

  checkAll() {
    if (this.allCheckbox) {
      this.memCheckbox = true;
      this.whiteCheckbox = true;
      this.blackCheckbox = true;
      this.unknownCheckbox = true;
      this.picture.allType = true;
      this.picture.peopleList.forEach(people => {
        people.show = true;
      });
    } else {
      this.memCheckbox = false;
      this.whiteCheckbox = false;
      this.blackCheckbox = false;
      this.unknownCheckbox = false;
      this.picture.allType = false;
      this.picture.peopleList.forEach(people => {
        people.show = false;
      });
    }
  }

  checkMem() {
    if (this.memCheckbox) {
      console.log('mem: ' + this.memCheckbox);
      this.picture.peopleList.forEach(people => {
        if (people.type === 'member') {
          people.show = true;
        }
      });
    } else {
      console.log('mem: ' + this.memCheckbox);
      this.picture.peopleList.forEach(people => {
        if (people.type === 'member') {
          people.show = false;
        }
      });
      this.allCheckbox = false;
      this.picture.allType = false;
    }
  }

  checkWhite() {
    if (this.whiteCheckbox) {
      console.log('white: ' + this.whiteCheckbox);
      this.picture.peopleList.forEach(people => {
        if (people.type === 'whiteList') {
          people.show = true;
        }
      });
    } else {
      console.log('white: ' + this.whiteCheckbox);
      this.picture.peopleList.forEach(people => {
        if (people.type === 'whiteList') {
          people.show = false;
        }
      });
      this.allCheckbox = false;
      this.picture.allType = false;
    }
  }

  checkBlack() {
    if (this.blackCheckbox) {
      console.log('black: ' + this.blackCheckbox);
      this.picture.peopleList.forEach(people => {
        if (people.type === 'blackList') {
          people.show = true;
        }
      });
    } else {
      console.log('black: ' + this.blackCheckbox);
      this.picture.peopleList.forEach(people => {
        if (people.type === 'blackList') {
          people.show = false;
        }
      });
      this.allCheckbox = false;
      this.picture.allType = false;
    }
  }

  checkUnknown() {
    if (this.unknownCheckbox) {
      console.log('unKnown: ' + this.unknownCheckbox);
      this.picture.peopleList.forEach(people => {
        if (people.type === 'unknown') {
          people.show = true;
        }
      });
    } else {
      console.log('unKnown: ' + this.unknownCheckbox);
      this.picture.peopleList.forEach(people => {
        if (people.type === 'unknown') {
          people.show = false;
        }
      });
      this.allCheckbox = false;
      this.picture.allType = false;
    }
  }
}
