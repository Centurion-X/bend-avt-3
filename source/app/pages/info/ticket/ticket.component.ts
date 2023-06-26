import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ITour } from '../../../models/interfaces';
import { StorageService } from '../../../services/storage/storage.service';

@Component
({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})

export class TicketComponent implements OnInit
{
  public tour: ITour | undefined;
  constructor(private route: ActivatedRoute,
              private ticketStorage: StorageService){}
  ngOnInit(): void
  {
    const queryId = this.route.snapshot.paramMap.get('id'),
          routeId = this.route.snapshot.queryParamMap.get('id'),
          valueId = queryId || routeId;
    if (valueId)
    {
      const ticketStorage = this.ticketStorage.getData();
      if (ticketStorage)
        this.tour = ticketStorage.find(tour => tour.id === valueId);
    }
  }
}