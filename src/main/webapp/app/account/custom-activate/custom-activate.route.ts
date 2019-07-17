import { Route } from '@angular/router';
import { CustomActivateComponent } from 'app/account/custom-activate/custom-activate.component';

export const customActivateRoute: Route = {
  path: 'customActivate',
  component: CustomActivateComponent,
  data: {
    authorities: [],
    pageTitle: 'activate.title'
  }
};
