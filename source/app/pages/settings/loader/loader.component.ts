// import from Angular framework
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import from PrimeNG library
import { MessageService } from 'primeng/api';
// import from application files
import { TicketService } from '../../../services/ticket/ticket.service';

@Component
({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})

export class LoaderComponent implements OnInit
{
  public descriptionText: string = 'Описание';
  public imageText: string = 'Фотография';
  public nameText: string = 'Название';
  public operatorText: string = 'Оператор';
  public priceText: string = 'Стоимость';
  public saveTourButtonText: string = 'Сохранить тур';
  public tourForm: FormGroup;
  constructor(private messageService: MessageService,
              private ticketService: TicketService){}
  ngOnInit(): void
  {
    this.tourForm = new FormGroup
    ({
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      image: new FormControl(),
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      operator: new FormControl(),
      price: new FormControl()
    });
  }
  createTour(): void
  {
    const tourData = this.tourForm.getRawValue();
    let form = new FormData();
    if (typeof tourData === 'object')
    {
      for (let property in tourData)
      {
        form.append(property, tourData[property]);
      }
    }
    this.ticketService.createTour(form).subscribe
    ((data: any) => 
    {
      this.messageService.add({detail: 'Запись внесена в базу данных туров !', severity: 'success', summary: 'Операция выполнена'})
    });
  }
  selectFile(event: any): void
  {
    if (event.target.files && event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.tourForm.patchValue({image: file});
    }
  }
}