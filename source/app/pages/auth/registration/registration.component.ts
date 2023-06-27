// import from Angular framework
import { Component, OnInit } from '@angular/core';
// import from PrimeNG library
import { MessageService } from 'primeng/api';
// import from application files
import { AuthService } from '../../../services/auth/auth.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { IUser } from '../../../models/interfaces';

@Component
({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit
{
  public card: string;
  public cardText: string = 'Номер карты';
  public login: string;
  public loginText: string = 'Пользователь';
  public mail: string;
  public mailText: string = 'Почта';
  public password1: string;
  public password1Text: string = 'Пароль';
  public password2: string;
  public password2Text: string = 'Подтверждение';
  public registrationButtonText: string = 'Зарегистрироваться';
  public showCard: boolean;
  public storage: boolean;
  constructor(private authService: AuthService,
              private messageService: MessageService){}
  ngOnInit(): void
  {
    this.showCard = ConfigurationService.settings.hasCard;
  }
  onRegister(event: Event): boolean | void
  {
    if (this.password1 !== this.password2)
    {
      this.messageService.add({detail: 'Пароли не совпадают !!!', severity: 'error', summary: 'Ошибка ввода данных'});
      return false;
    }
    const userObject: IUser =
    {
      card: this.card,
      login: this.login,
      mail: this.mail,
      password: this.password1
    }
    const status = this.authService.setUser(userObject, this.storage);
    if (status)
      this.messageService.add({detail: 'Регистрация нового пользователя завершена !', severity: 'success', summary: 'Операция выполнена'})
    else
      this.messageService.add({detail: 'Такой пользователь уже зарегистрирован !!!', severity: 'warn', summary: 'Невыполнимая операция'});
  }
}