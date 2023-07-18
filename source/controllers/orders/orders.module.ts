// import from NestJS framework
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import from application files
import { Order, OrderSchema } from '../../shemas/order.shema';
import { OrdersController } from './orders.controller';
import { OrdersService } from '../../services/orders/orders.service';
/* eslint-disable prettier/prettier */
@Module
({
  controllers: [OrdersController],
  imports: [MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}])],
  providers: [OrdersService]
})
export class OrdersModule {}