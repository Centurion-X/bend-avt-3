// import from NestJS framework
import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
/* eslint-disable prettier/prettier */
@Injectable()
export class JwtGuardService extends AuthGuard('jwt') {}