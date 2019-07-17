import { Routes } from '@angular/router';

import { activateRoute, passwordRoute, passwordResetFinishRoute, passwordResetInitRoute, registerRoute, settingsRoute } from './';
import { customRegisterRoute } from 'app/account/custom-register/custom-register.route';
import { customPasswordResetInitRoute } from 'app/account/custom-password-reset/init/custom-password-reset-init.route';
import { customPasswordResetFinishRoute } from 'app/account/custom-password-reset/finish/custom-password-reset-finish.route';

const ACCOUNT_ROUTES = [
  activateRoute,
  passwordRoute,
  passwordResetFinishRoute,
  customPasswordResetFinishRoute,
  passwordResetInitRoute,
  customPasswordResetInitRoute,
  registerRoute,
  customRegisterRoute,
  settingsRoute
];

export const accountState: Routes = [
  {
    path: '',
    children: ACCOUNT_ROUTES
  }
];
