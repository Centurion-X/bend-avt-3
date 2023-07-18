// import from NestJS framework
import { Body, Get, Param, Post } from '@nestjs/common';
import { Controller, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import from external libraries
import { diskStorage } from 'multer';
// import from application files
import { ITour, ITourClient } from '../../../interfaces/tour';
import { ToursService } from '../../../services/tours/tours.service';
/* eslint-disable prettier/prettier */
@Controller('tour')
export class TourController
{
  static imageName: string;
  constructor(private toursService: ToursService){}
  @Get(':name') async searchTour (@Param('name') name): Promise<Array<ITour>>
  {
    return this.toursService.getToursByName(name);
  }
  @Post() @UseInterceptors(FileInterceptor('image',
  {
    storage: diskStorage
    ({
      destination: './public/',
      filename: (request, file, callback) =>
      {
        const imageType = file.mimetype.split('/')[1],
              imageName = file.fieldname + '-' + Date.now() + '.' + imageType;
        callback(null, imageName);
        TourController.imageName = imageName;
      }
    })
  }))
  @Post() initTour(@Body() data: ITourClient)
  {
    data.image = 'http://localhost:3000/public/' + TourController.imageName;
    const result = this.toursService.uploadTour(data);
    TourController.imageName = null;
    return result;
  }
}