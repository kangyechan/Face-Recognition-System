import { Component, OnInit } from '@angular/core';
import { LiveService } from 'app/face/live/live.service';

@Component({
  selector: 'jhi-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.scss']
})
export class LiveComponent implements OnInit {
  bAction: string;
  cameraState;
  imageToShow: any;

  constructor(private liveService: LiveService) {}

  ngOnInit() {
    this.bAction = 'OFF';
    this.cameraState = false;
  }

  toggleCamera() {
    if (this.bAction === 'OFF') {
      this.bAction = 'ON';
      this.cameraState = true;
      this.liveService.save('OFF').subscribe(data => {
        console.log(data);

        live: data;
      });
    } else {
      this.bAction = 'OFF';
      this.cameraState = false;
      this.liveService.save('ON').subscribe(data => {
        console.log(data);
        live: data;
      });
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
      },
      false
    );
    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
