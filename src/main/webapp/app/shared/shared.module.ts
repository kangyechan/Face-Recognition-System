import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FaceadminSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [FaceadminSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [FaceadminSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaceadminSharedModule {
  static forRoot() {
    return {
      ngModule: FaceadminSharedModule
    };
  }
}
