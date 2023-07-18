// import from NestJS framework
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import from NodeJS environment
import { join } from 'path';
import { readFileSync } from 'fs';
// import from external libraries
import { Model } from 'mongoose';
// import from application files
import { ITour, ITourClient } from '../../interfaces/tour';
import { Tour, TourDocument } from '../../shemas/tour.shema';
import { TourDTO } from '../../DTO/tour-dto';
/* eslint-disable prettier/prettier */
@Injectable()
export class ToursService
{
  private count = 1;
  private limit = 10;
  private tours: Array<ITour>;
  constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>){}
  async deleteTours(): Promise<object>
  {
    return await this.tourModel.deleteMany();
  }
  async generateTours(): Promise<Array<ITour>>
  {
    if (!this.tours)
    {
      const data = readFileSync(join(process.cwd(), './src/private/tours.json'), 'utf8');
      this.tours = JSON.parse(data);
      await console.log('The list with test tours has been generated.');
    }
    for(let index = this.count; index <= this.limit; index++)
    {
      const template: ITour = this.tours[index];
      const tour = new TourDTO(template),
            tourData = new this.tourModel(tour);
      await tourData.save();
    }
    return this.getAllTours();
  }
  async getAllTours(): Promise<Array<ITour>>
  {
    return await this.tourModel.find();
  }
  async getTourById(id): Promise<ITour>
  {
    return await this.tourModel.findById(id);
  }
  async getToursByName(name): Promise<Array<ITour>>
  {
    return await this.tourModel.find({name: {'$regex': name, '$options': 'i'}});
  }
  async uploadTour(data: ITourClient)
  {
    const template: ITourClient =
    {
      description: data.description,
      image: data.image,
      name: data.name,
      price: data.price,
      operator: data.operator,
    }
    const tour = new TourDTO(template),
          tourData = new this.tourModel(tour);
    await tourData.save();
  }
}