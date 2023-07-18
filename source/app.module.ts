// import from NestJS framework
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import from application files
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './controllers/orders/orders.module';
import { ToursModule } from './controllers/tours/tours.module';
import { UsersModule } from './controllers/users/users.module';
/* eslint-disable prettier/prettier */
@Module
({
  controllers: [AppController],
  imports:
  [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    OrdersModule,
    ToursModule,
    UsersModule
  ],
  providers: [AppService]
})
export class AppModule {}