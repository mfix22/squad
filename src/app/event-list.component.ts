import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Event }                from './event';
import { EventService }         from './event.service';
import { EventDetailComponent } from './event-detail.component';
@Component({
  selector: 'my-events',
  template: require('app/event-list.component.html'),
  style:  [require('app/event-list.component.css')],
  directives: [EventDetailComponent]
})
export class HeroesComponent implements OnInit {
  events: Event[];
  selectedEvent: Event;
  addingEvent = false;
  error: any;
  constructor(
    private router: Router,
    private heroService: HeroService) { }
  getHeroes() {
    this.heroService
        .getHeroes()
        .then(heroes => this.heroes = heroes)
        .catch(error => this.error = error);
  }
  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }
  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }
  deleteHero(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        })
        .catch(error => this.error = error);
  }
  ngOnInit() {
    this.getHeroes();
  }
  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.addingHero = false;
  }
  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
