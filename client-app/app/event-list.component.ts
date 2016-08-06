import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Event }                from './event';
import { EventService }         from './event.service';
import { EventDetailComponent } from './event-detail.component';
@Component({
  selector: 'my-events',
  template: require('./event-list.component.html'),
  styles:  [require('./event-list.component.css')],
  directives: [EventDetailComponent]
})
export class EventListComponent implements OnInit {
  events: Event[];
  errorMessage: string;
  selectedEvent: Event;
  addingEvent = false;
  error: any;
  constructor(
    private router: Router,
    private eventService: EventService) { }
  getEvents() {
    this.eventService.getEvents()
                     .subscribe(
                       events => this.events = events,
                       error =>  this.errorMessage = <any>error);
  }
  addEvent() {
    this.addingEvent = true;
    this.selectedEvent = null;
  }
  close(savedEvent: Event) {
    this.addingEvent = false;
    if (savedEvent) { this.getEvents(); }
  }
  deleteEvent(myEvent: Event, event: any) {
    event.stopPropagation();
    this.eventService
        .delete(myEvent)
        .then(res => {
          this.events = this.events.filter(h => h !== event);
          if (this.selectedEvent === event) { this.selectedEvent = null; }
        })
        .catch(error => this.error = error);
  }
  ngOnInit() {
    this.getEvents();
    console.log("init: ", this.events);
     console.log("error: ", this.errorMessage);
  }
  onSelect(event: Event) {
    this.selectedEvent = event;
    this.addingEvent = false;
  }
  gotoDetail(event: Event) {
    console.log("event: ",event);
    this.router.navigate(['/e/', event._id]);
  }
  gotoAdd(){
    this.router.navigate(['/e/create']);
  }
}
