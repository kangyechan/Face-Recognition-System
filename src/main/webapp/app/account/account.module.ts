import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FaceAdminSharedModule } from 'app/shared';

import {
  PasswordStrengthBarComponent,
  RegisterComponent,
  ActivateComponent,
  PasswordComponent,
  PasswordResetInitComponent,
  PasswordResetFinishComponent,
  SettingsComponent,
  accountState
} from './';
import { CustomRegisterComponent } from './custom-register/custom-register.component';
import { CustomPasswordResetInitComponent } from './custom-password-reset/init/custom-password-reset-init.component';
import { CustomPasswordResetFinishComponent } from './custom-password-reset/finish/custom-password-reset-finish.component';
import { CustomActivateComponent } from './custom-activate/custom-activate.component';
import { CustomSearchMailComponent } from './custom-search/mail/custom-search-mail.component';
import { CustomSettingsComponent } from './custom-settings/custom-settings.component';
import { CustomPasswordComponent } from './custom-password/custom-password.component';

@NgModule({
  imports: [FaceAdminSharedModule, RouterModule.forChild(accountState)],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    CustomRegisterComponent,
    CustomPasswordResetInitComponent,
    CustomPasswordResetFinishComponent,
    CustomActivateComponent,
    CustomSearchMailComponent,
    CustomSettingsComponent,
    CustomPasswordComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaceAdminAccountModule {}
