import { Route } from '@angular/router';
import { CustomPasswordResetFinishComponent } from './custom-password-reset-finish.component';

export const customPasswordResetFinishRoute: Route = {
  path: 'customReset/finish',
  component: CustomPasswordResetFinishComponent,
  data: {
    authorities: [],
    pageTitle: 'golbal.menu.account.password'
  }
};
