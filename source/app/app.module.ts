// import from Angular framework
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import from application files
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfigurationService } from './services/configuration/configuration.service';
import { InterceptionService } from './services/interception/interception.service';

function initializeApp(configuration: ConfigurationService)
{
  return () => configuration.loadPromise().then(() => console.log('Configuration loaded:', ConfigurationService.settings));
}

@NgModule
({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports:
  [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers:
  [
    ConfigurationService,
  {
    deps: [ConfigurationService],
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: initializeApp
  },{
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptionService
  }]
})

export class AppModule {}