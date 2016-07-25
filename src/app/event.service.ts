import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import { Event } from './event';
@Injectable()
export class EventService {
  private eventUrl = 'http://localhost:8080/api/e';  // URL to web api
  private errorMessage: any;
  constructor(private http: Http) { }
  getEvents (): Observable<Event[]> {
    return this.http.get(this.eventUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getEvent(id: number) {
    return this.http.get(this.eventUrl + "/"+id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  save(event: Event): Promise<Event>  {
    if (event._id) {
      return this.put(event);
    }
    return this.post(event);
  }
  delete(event: Event) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.eventUrl}/${event._id}`;
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
    let url = `${this.eventUrl}/${event._id}`;
    return this.http
               .put(url, JSON.stringify(event), {headers: headers})
               .toPromise()
               .then(() => event)
               .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return res.json() || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
