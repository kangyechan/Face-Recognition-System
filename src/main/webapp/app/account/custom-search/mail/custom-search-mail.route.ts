import { CustomSearchMailComponent } from './custom-search-mail.component';
import { Route } from '@angular/router';

export const customSearchRoute: Route = {
  path: 'customSearch/request',
  component: CustomSearchMailComponent,
  data: {
    authorities: [],
    pageTitle: 'customSearch.title'
  }
};
