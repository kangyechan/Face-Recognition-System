import { CustomSearchComponent } from './custom-search.component';
import { Route } from '@angular/router';

export const customSearchRoute: Route = {
  path: 'customSearch',
  component: CustomSearchComponent,
  data: {
    authorities: [],
    pageTitle: 'customSearch.title'
  }
};
