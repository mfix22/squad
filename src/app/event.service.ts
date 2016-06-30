import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Event } from './event';
@Injectable()
export class EventService {
  private eventUrl = 'e';  // URL to web api
  constructor(private http: Http) { }
  getEvents(): Promise<Event[]> {
    return this.http.get(this.eventUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }
  getEvent(id: number) {
    return this.getEvents()
               .then(events => events.filter(event => event.id === id)[0]);
  }
  save(event: Event): Promise<Event>  {
    if (event.id) {
      return this.put(event);
    }
    return this.post(event);
  }
  delete(event: Event) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.eventUrl}/${event.id}`;
    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }
  // Add new event
  private post(event: Event): Promise<Event> {
    let headers = new Headers({
      'Content-Type': 'application/json'});
    return this.http
               .post(this.eventUrl, JSON.stringify(event), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }
  // Update existing Hero
  private put(event: Event) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.eventUrl}/${event.id}`;
    return this.http
               .put(url, JSON.stringify(event), {headers: headers})
               .toPromise()
               .then(() => event)
               .catch(this.handleError);
  }
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
