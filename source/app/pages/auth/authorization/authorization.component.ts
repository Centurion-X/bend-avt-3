// import from Angular framework
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import from PrimeNG library
import { MessageService } from 'primeng/api';
// import from application files
import { AuthService } from '../../../services/auth/auth.service';
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
    if (status)
    {
      this.userService.setToken(userObject.login);
      this.userService.setUser(userObject);
      this.router.navigate(['tickets/main'])
    }
    else if (status == false)
      this.messageService.add({detail: 'Неправильно введён пароль !!!', severity: 'error', summary: 'Ошибка ввода данных'})
    else if (status == null)
      this.messageService.add({detail: 'Такой пользователь не зарегистрирован !!!', severity: 'warn', summary: 'Невыполнимая операция'})
  }
}