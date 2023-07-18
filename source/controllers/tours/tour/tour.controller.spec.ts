import { Test, TestingModule } from '@nestjs/testing';
import { TourController } from './tour.controller';
/* eslint-disable prettier/prettier */
describe('TourController', () =>
{
  let controller: TourController;

  beforeEach(async () =>
  {
    const module: TestingModule = await Test.createTestingModule
    ({
      controllers: [TourController],
    }).compile();
    controller = module.get<TourController>(TourController);
  });

  it('should be defined', () =>
  {
    expect(controller).toBeDefined();
  });
});