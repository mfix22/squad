import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  directives: [ROUTER_DIRECTIVES],
  providers: [
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}