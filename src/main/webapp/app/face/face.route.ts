import { Route } from '@angular/router';

import { FaceComponent } from './face.component';
import { UserRouteAccessService } from 'app/core';

export const FACE_ROUTE: Route = {
  path: 'face',
  component: FaceComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'face recognition'
  },
  canActivate: [UserRouteAccessService]
};
