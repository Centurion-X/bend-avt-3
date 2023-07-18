// import from NestJS framework
import { Controller, Body, Get, Param, Post } from '@nestjs/common';
// import from application files
import { IOrder } from '../../interfaces/order';
import { OrderDTO } from '../../DTO/order-dto';
import { OrdersService } from '../../services/orders/orders.service';
/* eslint-disable prettier/prettier */
@Controller('orders')
export class OrdersController
{
  constructor(private ordersService: OrdersService){}
  @Get() getOrders(): Promise<Array<IOrder>>
  {
    return this.ordersService.getOrders();
  }
  @Get(':id') getOrdersById(@Param('id') id): Promise<Array<IOrder>>
  {
    console.log('Request orders from user:', id);
    return this.ordersService.getOrdersById(id);
  }
  @Post() initOrder(@Body() data: OrderDTO): void
  {
    const order: IOrder =
    {
      birthDay: data.birthDay,
      cardNumber: data.cardNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      tourId: data.tourId,
      userId: data.userId
    }
    const orderData = new OrderDTO(order);
    this.ordersService.sendOrder(orderData);
  }
}