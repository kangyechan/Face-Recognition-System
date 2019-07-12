import { Route } from '@angular/router';

import { FrsComponent } from './frs.component';

export const FRS_ROUTE: Route = {
  path: 'frs',
  component: FrsComponent,
  data: {
    authorities: [],
    pageTitle: 'gg'
  }
};
