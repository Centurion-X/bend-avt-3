import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service'; 

@Component
({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit
{
  constructor(private authService: AuthService){}
  ngOnInit(): void
  {
    window.sessionStorage.removeItem('user');
  }
}