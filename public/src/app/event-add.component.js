"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var event_service_1 = require('./event.service');
var EventAddComponent = (function () {
    function EventAddComponent(router, eventService) {
        this.router = router;
        this.eventService = eventService;
        this.addingEvent = false;
    }
    EventAddComponent.prototype.addEvent = function () {
        this.addingEvent = true;
    };
    EventAddComponent.prototype.close = function (savedEvent) {
        this.addingEvent = false;
        if (savedEvent) {
            this.router.navigate(['/']);
        }
    };
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
    EventAddComponent.prototype.ngOnInit = function () {
    };
    EventAddComponent = __decorate([
        core_1.Component({
            selector: 'my-events',
            template: require('./event-add.component.html'),
            styles: [require('./event-add.component.css')],
        }), 
        __metadata('design:paramtypes', [router_1.Router, event_service_1.EventService])
    ], EventAddComponent);
    return EventAddComponent;
}());
exports.EventAddComponent = EventAddComponent;
//# sourceMappingURL=event-add.component.js.map