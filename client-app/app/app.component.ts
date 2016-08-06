import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import { EventService }        from './event.service';

import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  directives: [ROUTER_DIRECTIVES],
  providers: [
  	EventService,
  	HTTP_PROVIDERS,
  ]
})
export class AppComponent {
  title = 'Events';
}