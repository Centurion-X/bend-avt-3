// import from NestJS framework
import { Controller } from '@nestjs/common';
import { Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
// import from application files
import { ITour } from '../../interfaces/tour';
import { JwtGuardService } from '../../services/authentication/jwt-guard/jwt-guard.service';
import { ToursService } from '../../services/tours/tours.service';
/* eslint-disable prettier/prettier */
@Controller('tours')
export class ToursController
{
  constructor(private toursService: ToursService){}
	@Delete() removeAllTours(): Promise<object>
	{
		return this.toursService.deleteTours();
	}
	@UseGuards(JwtGuardService)
	@Get() getAllTours(): Promise<Array<ITour>>
	{
		return this.toursService.getAllTours();
	}
	@UseGuards(JwtGuardService)
	@Get(':id') getTourById(@Param('id') id): Promise<ITour>
	{
		return this.toursService.getTourById(id);
	}
	@Post() initTours(): Promise<Array<ITour>>
	{
		return this.toursService.generateTours();
	}
}