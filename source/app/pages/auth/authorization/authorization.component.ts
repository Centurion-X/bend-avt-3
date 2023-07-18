// import from Angular framework
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// import from PrimeNG library
import { MessageService } from 'primeng/api';
// import from application files
import { AuthService } from '../../../services/auth/auth.service';
import { IAccessToken, IServerError } from '../../../models/server';
import { IUser } from '../../../models/interfaces';
import { UserService } from '../../../services/user/user.service';

@Component
({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit
{
  public authorizationButtonText: string = 'Авторизоваться';
  public cardNumber: string;
  public cardStatus: boolean;
  public cardText: string = '№ карты';
  public login: string;
  public loginText: string = 'Пользователь';
  public password: string;
  public passwordText: string = 'Пароль';
  constructor(private authService: AuthService,
              private http: HttpClient,
              private messageService: MessageService,
              private router: Router,
              private userService: UserService){}
  ngOnInit(): void {}
  onAuthorize(event: Event): void
  {
    const userObject: IUser =
    {
      card: this.cardNumber,
      login: this.login,
      password: this.password
    }
    let status = this.authService.checkUser(userObject);
    this.http.post<{access_token: string, id: string}>('http://localhost:3000/users/' + userObject.login, userObject).subscribe(
    (data: IAccessToken) =>
    {
      console.log('Server response:', data);
      if (status)
      {
        const token: string = data.access_token;
        this.userService.setToken(token);
        userObject._id = data.id;
        this.userService.setUser(userObject);
        this.router.navigate(['tickets/main'])
      }
    },
    (error: HttpErrorResponse) =>
    {
      const serverError: IServerError = error.error;
      if (status == false)
        this.messageService.add({detail: 'Неправильно введён пароль !!!', severity: 'error', summary: 'Ошибка ввода данных'})
      else if (status == null)
        this.messageService.add({detail: serverError.text, severity: 'warn', summary: 'Невыполнимая операция'})
    });
  }
}