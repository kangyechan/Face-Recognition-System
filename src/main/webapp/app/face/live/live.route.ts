import { Routes } from '@angular/router';
import { LiveComponent } from './live.component';

export const LIVE_ROUTE: Routes = [
  {
    path: 'api/camera/live?temperature=:item',
    component: LiveComponent
  }
];
