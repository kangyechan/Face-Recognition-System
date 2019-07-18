import { Route } from '@angular/router';
import { CustomSettingsComponent } from './custom-settings.component';
import { UserRouteAccessService } from 'app/core';

export const customSettingRoute: Route = {
  path: 'customSettings',
  component: CustomSettingsComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'global.menu.account.settings'
  },
  canActivate: [UserRouteAccessService]
};
