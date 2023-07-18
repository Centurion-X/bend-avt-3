// import from NestJS framework
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
// import from application files
import { jwtConstants } from '../../private/constants';
import { JwtStrategyService } from '../../services/authentication/jwt-strategy/jwt-strategy.service';
import { Tour, TourSchema } from '../../shemas/tour.shema';
import { TourController } from './tour/tour.controller';
import { ToursController } from '../tours/tours.controller';
import { ToursService } from '../../services/tours/tours.service';
/* eslint-disable prettier/prettier */
@Module
({
  controllers: [TourController, ToursController],
  imports:
  [
    JwtModule.register({secret: jwtConstants.secret}),
    MongooseModule.forFeature([{name: Tour.name, schema: TourSchema}]),
    PassportModule
  ],
  providers: [JwtStrategyService, ToursService]
})
export class ToursModule {}