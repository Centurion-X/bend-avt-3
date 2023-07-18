// import from NestJS framework
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import from application files
import { IOrder } from '../interfaces/order';
/* eslint-disable prettier/prettier */
export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order implements IOrder
{
    @Prop() birthDay: string;
    @Prop() cardNumber: string;
    @Prop() firstName: string;
    @Prop() lastName: string;
    @Prop() tourId: string;
    @Prop() userId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);