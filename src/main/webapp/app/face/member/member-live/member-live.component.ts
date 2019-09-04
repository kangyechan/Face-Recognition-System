import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MemberLiveService } from './member-live.service';
import { FLASK_SERVER_API_URL } from 'app/app.constants';
import { SelectContainerComponent } from 'ngx-drag-to-select';
import { CustomModalComponent } from 'app/custom-modal/custom-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'jhi-member-live',
  templateUrl: './member-live.component.html',
  styleUrls: ['./member-live.scss']
})
export class MemberLiveComponent {
  @ViewChild(SelectContainerComponent, { static: false }) private selectContainer: SelectContainerComponent;
  @Output() sendChangeState = new EventEmitter<boolean>();

  imgURL = FLASK_SERVER_API_URL + 'streaming/live';
  cameraText = 'OFF';
  doorText = 'OPEN';
  sectionState = 'IMAGE';
  sectionTitle = 'Live On';
  cameraState = true;
  imageSection = false;
  liveSection = true;
  faceList = [];
  emptyImage = false;
  emptyMessage = '폴더를 선택해주세요.';
  isSelectImage = false;
  selectImage = { name: '', getPath: '', realPath: '', isActive: false };
  targetCardList = [];
  targetCardPathList = [];
  selectText = '전체 선택';
  deleteText = '선택 삭제';
  cardMore = '더 보기';
  cardCount = 50;

  constructor(private memberLiveService: MemberLiveService, public dialog: MatDialog) {}

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
    this.memberLiveService.doorOpen().subscribe();
  }

  dtsSelected(selectedCard) {
    selectedCard.isActive = undefined;
    if (this.targetCardList.indexOf(selectedCard) === -1) {
      this.targetCardList.push(selectedCard);
    }
    selectedCard.isActive = true;
  }

  dtsDeSelected(deSelectedCard) {
    deSelectedCard.isActive = undefined;
    if (this.targetCardList.indexOf(deSelectedCard) !== -1) {
      this.targetCardList.splice(this.targetCardList.indexOf(deSelectedCard), 1);
    }
    deSelectedCard.isActive = false;
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

  cardSelectAll() {
    if (this.emptyImage) {
      this.alertSet('Warning', '이미지가 없습니다.\n 폴더를 선택하세요.');
    } else if (this.isSelectImage) {
      if (this.selectText === '전체 선택') {
        this.targetCardList.push(this.selectImage);
        this.selectImage.isActive = true;
        this.selectText = '선택 해제';
      } else {
        this.targetCardList.splice(0, 1);
        this.selectImage.isActive = false;
        this.selectText = '전체 선택';
      }
    } else {
      if (this.selectText === '전체 선택') {
        this.selectContainer.selectAll();
        this.selectText = '선택 해제';
      } else {
        this.selectContainer.clearSelection();
        this.selectText = '전체 선택';
      }
    }
  }

  selectDelete() {
    if (this.targetCardList.length === 0) {
      this.alertSet('Warning', '선택된 이미지가 없습니다.');
    } else {
      this.targetCardList.forEach(target => {
        this.targetCardPathList.push(target.realPath);
      });
      this.memberLiveService.delMember(this.targetCardPathList).subscribe(data => {
        console.log('delete ' + data);
      });
      this.selectContainer.clearSelection();
      this.alertSet('Complete', '삭제되었습니다.');
      this.sendChangeState.emit(true);
    }
  }

  alertSet(alertTitle: string, alertContents: string) {
    this.dialog.open(CustomModalComponent, {
      data: {
        title: alertTitle,
        contents: alertContents
      }
    });
  }

  cardMoreCall() {
    this.cardCount = this.cardCount + 50;
  }
}
