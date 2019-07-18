import { Routes } from '@angular/router';

import { activateRoute, passwordRoute, passwordResetFinishRoute, passwordResetInitRoute, registerRoute, settingsRoute } from './';
import { customRegisterRoute } from './custom-register/custom-register.route';
import { customPasswordResetInitRoute } from './custom-password-reset/init/custom-password-reset-init.route';
import { customPasswordResetFinishRoute } from './custom-password-reset/finish/custom-password-reset-finish.route';
import { customActivateRoute } from './custom-activate/custom-activate.route';
import { customSearchRoute } from './custom-search/mail/custom-search-mail.route';
import { customSettingRoute } from './custom-settings/custom-settings.route';
import { customPasswordRoute } from './custom-password/custom-password.route';

const ACCOUNT_ROUTES = [
  activateRoute,
  customActivateRoute,
  passwordRoute,
  customPasswordRoute,
  customSearchRoute,
  passwordResetFinishRoute,
  customPasswordResetFinishRoute,
  passwordResetInitRoute,
  customPasswordResetInitRoute,
  registerRoute,
  customRegisterRoute,
  settingsRoute,
  customSettingRoute
];

export const accountState: Routes = [
  {
    path: '',
    children: ACCOUNT_ROUTES
  }
];
