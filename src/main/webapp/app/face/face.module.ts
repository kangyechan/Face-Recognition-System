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

@NgModule({
  imports: [FaceAdminSharedModule, RouterModule.forChild([FACE_ROUTE])],
  declarations: [FaceComponent, ListComponent, LiveComponent, MatchComponent, PictureComponent, DetectComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaceAdminFaceModule {}
