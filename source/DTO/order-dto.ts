// import from application files
import { IOrder } from '../interfaces/order';
/* eslint-disable prettier/prettier */
export class OrderDTO implements IOrder
{
  birthDay: string;
  cardNumber: string;
  firstName: string;
  lastName: string;
  tourId: string;
  userId: string;
  constructor(order: IOrder)
  {
    this.birthDay = order.birthDay;
    this.cardNumber = order.cardNumber;
    this.firstName = order.firstName,
    this.lastName = order.lastName,
    this.tourId = order.tourId;
    this.userId = order.userId;
  }
}