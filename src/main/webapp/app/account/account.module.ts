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
import { CustomSearchComponent } from './custom-search/custom-search.component';

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
    CustomSearchComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaceAdminAccountModule {}
