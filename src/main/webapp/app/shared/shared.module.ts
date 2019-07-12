import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FrsSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [FrsSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [FrsSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrsSharedModule {
  static forRoot() {
    return {
      ngModule: FrsSharedModule
    };
  }
}
