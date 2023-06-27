// import from Angular framework
import { Component, OnDestroy, OnInit } from '@angular/core';
// import from RxJS library
import { Subscription } from 'rxjs';
// import from application files
import { SettingsService } from '../../services/settings/settings.service';

@Component
({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnDestroy, OnInit
{
  private settingsData: Subscription;
  private settingsDataSubject: Subscription;
  constructor(private settingsService: SettingsService){}
  ngOnDestroy(): void
  {
    this.settingsData.unsubscribe();
    this.settingsDataSubject.unsubscribe();
  }
  ngOnInit(): void
  {
    this.settingsData = this.settingsService.loadSettings().subscribe
    (
      data => console.log('Settings:', data)
    );
    this.settingsDataSubject = this.settingsService.getSettingsSubject().subscribe
    (
      data => console.log('Settings (from subject):', data)
    );
  }
}