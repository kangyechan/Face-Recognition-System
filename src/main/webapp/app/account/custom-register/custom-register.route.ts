import { Route } from '@angular/router';
import { CustomRegisterComponent } from './custom-register.component';

export const customRegisterRoute: Route = {
  path: 'customRegister',
  component: CustomRegisterComponent,
  data: {
    authorities: [],
    pageTitle: 'customRegister.title'
  }
};
