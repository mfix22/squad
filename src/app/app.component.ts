import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['/e']" routerLinkActive="active">Events</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: [require('./app.component.css')],
  directives: [ROUTER_DIRECTIVES],
  providers: [
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}