// import from Angular framework
import { Injectable } from '@angular/core';
// import from RxJS library
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ObservationService
{
  private behaviorSubject: BehaviorSubject<string>;
  private observable: Observable<string>;
  private subject: Subject<string>;
  constructor(){}
  getBehaviorSubject(): BehaviorSubject<string>
  {
    this.initBehaviorSubject();
    return this.behaviorSubject;
  }
  getObservable(): Observable<string>
  {
    this.initObservable();
    return this.observable;
  }
  getSubject(): Subject<string>
  {
    this.initSubject();
    return this.subject;
  }
  initBehaviorSubject(): void
  {
    this.behaviorSubject = new BehaviorSubject('Initial data');
  }
  initObservable(): void
  {
    this.observable = new Observable((subscriber: Subscriber<string>) =>
    {
      setTimeout(() =>
      {
        subscriber.next('Async data.');
        subscriber.error('Error.');
      })
    });
    const observer = this.observable.subscribe
    ({
      next(data) {console.log('Data: ', data)},
      error(error) {console.log('Error: ', error)}
    });
    observer.unsubscribe();
  }
  initSubject(): void
  {
    this.subject = new Subject();
  }
}