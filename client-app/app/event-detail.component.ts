import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event }        from './event';
import { EventService } from './event.service';
@Component({
  selector: 'my-event-detail',
  template: require('./event-detail.component.html'),
  styles: [require('./event-detail.component.css')]
})
export class EventDetailComponent implements OnInit, OnDestroy {
  @Input() event: Event;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false; // true if navigated here
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.eventService.getEvent(id)
            .subscribe(
                       event => this.event = event,
                       error =>  this.error = <any>error);
      } else {
        this.navigated = false;
        this.event = new Event();
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  save() {
    this.eventService
        .save(this.event)
        .then(event => {
          this.event = event; // saved hero, w/ id if new
          this.goBack(event);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  goBack(savedEvent: Event = null) {
    this.close.emit(savedEvent);
    if (this.navigated) { window.history.back(); }
  }
}
