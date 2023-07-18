// import from application files
import { ITour } from '../interfaces/tour';
/* eslint-disable prettier/prettier */
export class TourDTO implements ITour
{
  date: string;
  description: string;
  id: string;
  image: string;
  name: string;
  operator: string;
  price: string;
  type: string;
  constructor(tour: ITour)
  {
    this.date = tour.date;
    this.description = tour.description;
    this.id = tour.id;
    this.image = tour.image;
    this.name = tour.name;
    this.operator = tour.operator;
    this.price = tour.price;
    this.type = tour.type;
  };
}