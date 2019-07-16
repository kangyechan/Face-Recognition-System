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
import { LnbComponent, ModalLeaningComponent, ModalPreworkComponent } from './lnb/lnb.component';

@NgModule({
  imports: [FaceAdminSharedModule, RouterModule.forChild([FACE_ROUTE])],
  declarations: [
    FaceComponent,
    ListComponent,
    LiveComponent,
    MatchComponent,
    PictureComponent,
    DetectComponent,
    LnbComponent,
    ModalLeaningComponent,
    ModalPreworkComponent
  ],
  entryComponents: [ModalLeaningComponent, ModalPreworkComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaceAdminFaceModule {}
