// import from Angular framework
import { Injectable } from '@angular/core';
// import from RxJS library
import { Observable, Subject } from 'rxjs';
// import from application files
import { ISettings } from '../../models/interfaces';

@Injectable({providedIn: 'root'})

export class SettingsService
{
  private settingsSubject: Subject<ISettings> = new Subject<ISettings>();
  constructor(){}
  getSettingsSubject(): Observable<ISettings>
  {
    return this.settingsSubject.asObservable();
  }
  loadSettingsSubject(data: ISettings): void
  {
    this.settingsSubject.next(data);
  }
  loadSettings(): Observable<ISettings>
  {
    return new Observable<ISettings>( observer =>
    {
      observer.next({token: true});
    });
  }
}