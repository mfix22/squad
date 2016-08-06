import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Event }                from './event';
import { EventService }         from './event.service';
@Component({
  selector: 'my-events',
  template: require('./event-add.component.html'),
  styles:  [require('./event-add.component.css')],
})
export class EventAddComponent implements OnInit {
  errorMessage: string;
  addingEvent = false;
  error: any;
  constructor(
    private router: Router,
    private eventService: EventService) { }
  addEvent() {
    this.addingEvent = true;
  }
  close(savedEvent: Event) {
    this.addingEvent = false;
    if (savedEvent) { this.router.navigate(['/']); }
  }
  // deleteEvent(myEvent: Event, event: any) {
  //   event.stopPropagation();
  //   this.eventService
  //       .delete(myEvent)
  //       .then(res => {
  //         this.events = this.events.filter(h => h !== event);
  //         if (this.selectedEvent === event) { this.selectedEvent = null; }
  //       })
  //       .catch(error => this.error = error);
  // }
  ngOnInit() {

  }
}
