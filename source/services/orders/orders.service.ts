// import from NestJS framework
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import from external libraries
import { Model } from 'mongoose';
// import from application files
import { Order, OrderDocument } from '../../shemas/order.shema';
import { OrderDTO } from '../../DTO/order-dto';
/* eslint-disable prettier/prettier */
@Injectable()
export class OrdersService
{
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>){}
  async getOrders(): Promise<Array<Order>>
  {
    return this.orderModel.find();
  }
  async getOrdersById(id: string): Promise<Array<Order>>
  {
    return this.orderModel.find({"userId": id});
  }
  async sendOrder(data: OrderDTO): Promise<Order>
  {
    const orderData = new this.orderModel(data);
    return orderData.save();
  }
}