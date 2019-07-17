import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FaceAdminSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { CustomLoginComponent } from './custom-login/custom-login.component';

@NgModule({
  imports: [FaceAdminSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, CustomLoginComponent],
  entryComponents: [JhiLoginModalComponent, CustomLoginComponent],
  exports: [FaceAdminSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, CustomLoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaceAdminSharedModule {
  static forRoot() {
    return {
      ngModule: FaceAdminSharedModule
    };
  }
}
