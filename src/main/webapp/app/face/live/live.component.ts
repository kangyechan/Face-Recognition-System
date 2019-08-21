import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveService } from 'app/face/live/live.service';
import { SelectContainerComponent } from 'ngx-drag-to-select';
import { FLASK_SERVER_API_URL } from 'app/app.constants';

@Component({
  selector: 'jhi-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.scss']
})
export class LiveComponent implements OnInit {
  @ViewChild(SelectContainerComponent, { static: false }) private selectContainer: SelectContainerComponent;

  imgURL: string;
  cameraText: string;
  doorText: string;
  sectionState: string;
  sectionTitle: string;
  cameraState: boolean;
  imageSection: boolean;
  liveSection: boolean;
  faceList: Array<any> = [];
  emptyImage: boolean;
  isSelectImage: boolean;
  selectImage: any;
  targetCardList: Array<any> = [];

  constructor(private liveService: LiveService) {}

  ngOnInit() {
    this.cameraText = 'OFF';
    this.doorText = 'OPEN';
    this.sectionState = 'IMAGE';
    this.sectionTitle = 'Live On';
    this.cameraState = true;
    this.imageSection = false;
    this.liveSection = true;
    this.faceList = [];
    this.emptyImage = false;
    this.selectImage = {};
    this.isSelectImage = false;
    this.imgURL = FLASK_SERVER_API_URL + 'streaming/live';
  }

  toggleSection() {
    if (this.liveSection) {
      this.cameraText = 'ON';
      this.liveSection = false;
    } else {
      this.cameraText = 'OFF';
      this.liveSection = true;
    }
  }

  toggleDoor() {
    this.liveService.doorOpen().subscribe();
  }

  dtsSelected(selectedCard) {
    selectedCard.isActive = !selectedCard.isActive;
    if (this.targetCardList.indexOf(selectedCard) === -1) {
      this.targetCardList.push(selectedCard);
    } else {
      this.targetCardList.splice(this.targetCardList.indexOf(selectedCard), 1);
    }
    console.log(this.targetCardList);
  }

  toggleState() {
    if (this.sectionState === 'IMAGE') {
      if (this.isSelectImage) {
        this.emptyImage = false;
      } else {
        this.emptyImage = this.faceList.toString() === '';
      }
      this.cameraState = false;
      this.imageSection = true;
      this.sectionState = 'LIVE';
      this.sectionTitle = 'Folder Contents';
    } else {
      if (this.targetCardList.length !== 0) {
        this.cancelSelect();
      }
      this.emptyImage = false;
      this.cameraState = true;
      this.imageSection = false;
      this.sectionState = 'IMAGE';
      this.sectionTitle = 'Live On';
    }
  }

  cardClick(face) {
    face.isActive = !face.isActive;
    if (face.isActive) {
      this.targetCardList.push(face);
    } else {
      this.targetCardList.splice(this.targetCardList.indexOf(face), 1);
    }
    console.log(this.targetCardList);
  }

  cancelSelect() {
    this.targetCardList
      .filter(selectCard => {
        return selectCard.isActive === true;
      })
      .map(selectCard => {
        return (selectCard.isActive = false);
      });
    this.targetCardList = [];
    this.selectContainer.clearSelection();
  }
}
