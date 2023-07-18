// import from NestJS framework
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import from application files
import { IUser } from '../interfaces/user';
/* eslint-disable prettier/prettier */
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser
{
  @Prop() cardNumber: string;
  @Prop() email: string;
  @Prop() id?: string;
  @Prop() login: string;
  @Prop() password: string;
  @Prop() token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);