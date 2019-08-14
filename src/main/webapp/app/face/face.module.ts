import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FaceAdminSharedModule } from 'app/shared';
import { FaceComponent } from './face.component';
import { FACE_ROUTE } from './face.route';
import { MemberComponent } from './member/member.component';
import { LiveComponent } from './live/live.component';
import { MatchComponent } from './match/match.component';
import { PictureComponent } from './picture/picture.component';
import { DetectComponent } from './detect/detect.component';
import { LnbComponent } from './lnb/lnb.component';
import { LearningModalComponent, PreworkModalComponent } from './modal/modal.component';
import { ModalModule } from 'angular-custom-modal';
import { TreeModule } from 'angular-tree-component';
import { DragToSelectModule } from 'ngx-drag-to-select';

@NgModule({
  imports: [FaceAdminSharedModule, RouterModule.forChild([FACE_ROUTE]), ModalModule, TreeModule.forRoot(), DragToSelectModule.forRoot()],
  declarations: [
    FaceComponent,
    MemberComponent,
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
