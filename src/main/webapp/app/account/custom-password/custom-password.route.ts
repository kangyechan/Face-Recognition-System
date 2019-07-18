import { CustomPasswordComponent } from './custom-password.component';
import { UserRouteAccessService } from 'app/core';
import { Route } from '@angular/router';

export const customPasswordRoute: Route = {
  path: 'customPassword',
  component: CustomPasswordComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'global.menu.account.password'
  },
  canActivate: [UserRouteAccessService]
};
