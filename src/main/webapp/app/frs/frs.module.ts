import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrsSharedModule } from 'app/shared';
import { FrsComponent } from './frs.component';
import { FRS_ROUTE } from './frs.route';

@NgModule({
  imports: [FrsSharedModule, RouterModule.forChild([FRS_ROUTE])],
  declarations: [FrsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrsModule {}
