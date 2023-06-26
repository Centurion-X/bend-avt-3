import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ITour } from '../../../models/interfaces';
import { StorageService } from '../../../services/storage/storage.service';

@Component
({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit
{
  public buttonText: string = 'Найти тур';
  public inputText: string = 'Поиск тура';
  public tourId: string = '';
  public tourName: string = 'Mexico';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private storage: StorageService)
  {
    this.route.queryParams.subscribe((parameters: Params) =>
    {
      if (parameters['id'])
      {
        if (this.tourId && this.tourId !== parameters['id'])
        {
          location.reload();
        }
        this.tourId = parameters['id'];
      }
      else
        this.tourId = '';
    });
  }
  ngOnInit(): void {}
  searchTour(): void
  {
    const tours: Array<ITour> | null = this.storage.getData();
    if (tours)
    {
      const tour: ITour | undefined = tours.find((tour: ITour): boolean =>
        tour.name.toLowerCase().includes(this.tourName.toLowerCase()) ? true : false);
       if (tour)
        this.router.navigate(['/tickets/ticket/'], {queryParams: {id: tour.id}});
    }
  }
}