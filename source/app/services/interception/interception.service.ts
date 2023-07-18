// import from Angular framework
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import from RxJS library
import { Observable } from 'rxjs';
// import from application files
import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})

export class InterceptionService implements HttpInterceptor
{
  constructor(private userService: UserService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    const hasToken = this.userService.getToken();
    console.log('Token: ', hasToken);
    if (hasToken)
    {
      const clone = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + hasToken)});
      return next.handle(clone);
    }
    else
      return next.handle(request);
  }
}