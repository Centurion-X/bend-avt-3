import { Test, TestingModule } from '@nestjs/testing';
import { ToursController } from './tours.controller';
/* eslint-disable prettier/prettier */
describe('ToursController', () =>
{
  let controller: ToursController;

  beforeEach(async () =>
  {
    const module: TestingModule = await Test.createTestingModule
    ({
      controllers: [ToursController],
    }).compile();
    controller = module.get<ToursController>(ToursController);
  });

  it('should be defined', () =>
  {
    expect(controller).toBeDefined();
  });
});