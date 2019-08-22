import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FaceAdminSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [FaceAdminSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [FaceAdminSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaceAdminSharedModule {
  static forRoot() {
    return {
      ngModule: FaceAdminSharedModule
    };
  }
}
