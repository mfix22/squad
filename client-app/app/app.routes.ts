import { provideRouter, RouterConfig }  from '@angular/router';

import { EventListComponent } from './event-list.component.ts';
import { EventDetailComponent } from './event-detail.component.ts';
import { EventAddComponent } from './event-add.component.ts';


export const routes: RouterConfig = [
  {
    path: '',
    component: EventListComponent
  },
  {
    path: 'e/create',
    component: EventAddComponent
  },
  {
    path: 'e/:id',
    component: EventDetailComponent
  },

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
