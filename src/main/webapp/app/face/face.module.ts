import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FaceAdminSharedModule } from 'app/shared';
import { FaceComponent } from './face.component';
import { FACE_ROUTE } from './face.route';
import { ListComponent } from './list/list.component';
import { LiveComponent } from './live/live.component';
import { MatchComponent } from './match/match.component';
import { PictureComponent } from './picture/picture.component';
import { DetectComponent } from './detect/detect.component';
import { LnbComponent } from './lnb/lnb.component';
import { LearningModalComponent, PreworkModalComponent } from './modal/modal.component';
import { WebcamModule } from 'ngx-webcam';
// import { WebCamModule } from 'ack-angular-webcam';

@NgModule({
  imports: [FaceAdminSharedModule, RouterModule.forChild([FACE_ROUTE]), WebcamModule],
  declarations: [
    FaceComponent,
    ListComponent,
    LiveComponent,
    MatchComponent,
    PictureComponent,
    DetectComponent,
    LnbComponent,
    LearningModalComponent,
    PreworkModalComponent
  ],
  entryComponents: [LearningModalComponent, PreworkModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaceAdminFaceModule {}
