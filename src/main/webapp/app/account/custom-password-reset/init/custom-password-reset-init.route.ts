import { CustomPasswordResetInitComponent } from 'app/account/custom-password-reset/init/custom-password-reset-init.component';
import { Route } from '@angular/router';

export const customPasswordResetInitRoute: Route = {
  path: 'customReset/request',
  component: CustomPasswordResetInitComponent,
  data: {
    authorities: [],
    pageTitle: 'global.menu.account.password'
  }
};
