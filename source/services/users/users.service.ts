// import from NestJS framework
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import from application files
import { User, UserDocument } from '../../shemas/user.shema';
import { UserDTO } from '../../DTO/user-dto';
/* eslint-disable prettier/prettier */
@Injectable()
export class UsersService
{
  constructor(private jwtService: JwtService,
              @InjectModel(User.name) private userModel: Model<UserDocument>){}
  async authorizeUser(login: string): Promise<User>
  {
    return await this.userModel.findOne({login: login});
  }
  async checkUserAuthorization(login: string, password: string): Promise<Array<User>>
  {
    const array = await this.userModel.find({login: login, password: password});
    return array.length === 0 ? null : array;
  }
  async checkUserRegistration(login: string): Promise<Array<User>>
  {
    return await this.userModel.find({login: login});
  }
  async deleteUserById(id: string): Promise<User>
  {
    return await this.userModel.findByIdAndRemove(id);
  }
  async deleteUsers(): Promise<object>
  {
    return await this.userModel.deleteMany();
  }
  async getAllUsers(): Promise<Array<User>>
  {
    return await this.userModel.find();
  }
  async getUserById(id: string): Promise<User>
  {
    return await this.userModel.findById(id);
  }
  async loginUser(user: UserDTO)
  {
    const object = {login: user.login, password: user.password},
          record = await this.userModel.findOne({login: user.login});
    console.log('User: ', record);
    return {access_token: this.jwtService.sign(object), id: record._id};
  }
  async registerUser(data): Promise<User>
  {
    const userData = new this.userModel(data);
    return await userData.save();
  }
  async updateUser(id: string, body): Promise<User>
  {
    return await this.userModel.findByIdAndUpdate(id, body);
  }
}