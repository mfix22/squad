import { provideRouter, RouterConfig }  from '@angular/router';

import { EventListComponent } from './event-list.component.ts'


export const routes: RouterConfig = [
  {
    path: '',
    redirectTo: 'e',
    terminal: true
  },
  {
    path: 'e',
    component: EventListComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
