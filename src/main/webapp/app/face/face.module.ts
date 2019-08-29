import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FaceComponent } from './face.component';
import { FACE_ROUTE } from './face.route';
import { LnbComponent } from './lnb/lnb.component';
import { FaceadminSharedModule } from 'app/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberComponent } from './member/member.component';
import { DetectComponent } from './detect/detect.component';
import { DetectCaptureComponent } from './detect/detect-capture/detect-capture.component';
import { MemberLiveComponent } from './member/member-live/member-live.component';
import { MemberCaptureComponent } from './member/member-capture/member-capture.component';
import { TreeModule } from 'angular-tree-component';
import { DragToSelectModule } from 'ngx-drag-to-select';
import { ModalModule } from 'angular-custom-modal';

@NgModule({
  imports: [
    RouterModule.forChild([FACE_ROUTE]),
    FaceadminSharedModule,
    BrowserAnimationsModule,
    ModalModule,
    TreeModule.forRoot(),
    DragToSelectModule.forRoot()
  ],
  declarations: [
    FaceComponent,
    LnbComponent,
    MemberComponent,
    DetectComponent,
    DetectCaptureComponent,
    MemberLiveComponent,
    MemberCaptureComponent
  ],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaceadminFaceModule {}
