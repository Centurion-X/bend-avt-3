// import from NestJS framework
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
// import from application files
import { AuthService } from '../../services/authentication/auth/auth.service';
import { jwtConstants } from '../../private/constants';
import { JwtStrategyService } from '../../services/authentication/jwt-strategy/jwt-strategy.service';
import { User, UserSchema } from '../../shemas/user.shema';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../../services/users/users.service';
/* eslint-disable prettier/prettier */
@Module
({
  controllers: [UsersController],
  imports:
  [
    JwtModule.register({secret: jwtConstants.secret}),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    PassportModule
  ],
  providers: [AuthService, JwtStrategyService, UsersService]
})
export class UsersModule {}