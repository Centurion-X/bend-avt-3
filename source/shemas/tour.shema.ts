// import from NestJS framework
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import from application files
import { ITour } from '../interfaces/tour';
/* eslint-disable prettier/prettier */
export type TourDocument = HydratedDocument<Tour>;

@Schema()
export class Tour implements ITour
{
  @Prop() date: string;
  @Prop() description: string;
  @Prop() id: string;
  @Prop() image: string;
  @Prop() name: string;
  @Prop() operator: string;
  @Prop() price: string;
  @Prop() type: string;
}

export const TourSchema = SchemaFactory.createForClass(Tour);