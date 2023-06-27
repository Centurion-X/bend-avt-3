// import from Angular framework
import { Component, OnInit } from '@angular/core';
// import from PrimeNG library
import { MessageService } from 'primeng/api';
// import from application files
import { AuthService } from '../../../services/auth/auth.service';
import { IUser } from '../../../models/interfaces';
import { UserService } from '../../../services/user/user.service';

@Component
({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})

export class PasswordComponent implements OnInit
{
  public changePasswordButtonText: string = 'Сменить пароль';
  public doublePassword: string;
  public doublePasswordText: string = 'Подтверждение пароля';
  public oldPassword: string;
  public oldPasswordText: string = 'Текущий пароль';
  public newPassword: string;
  public newPasswordText: string = 'Новый пароль';
  constructor(private authService: AuthService,
              private messageService: MessageService,
              private userService: UserService){}
  ngOnInit(): void {}
  changePassword(event: Event): void
  {
    const user: IUser = this.userService.getUser();
    if (user.password !== this.oldPassword)
      this.messageService.add({detail: 'Неверно введён старый пароль !!!', severity: 'error', summary: 'Ошибка ввода данных'})
    else if (this.doublePassword !== this.newPassword)
      this.messageService.add({detail: 'Неверно введён новый пароль !!!', severity: 'error', summary: 'Ошибка ввода данных'})
    else
    {
      user.password = this.newPassword;
      this.authService.resetUser(user);
      this.messageService.add({detail: 'Пароль был успешно изменён !', severity: 'success', summary: 'Операция выполнена'})
    }
  }
}