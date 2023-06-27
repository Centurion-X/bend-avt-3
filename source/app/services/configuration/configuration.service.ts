// import from Angular framework
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import from application files
import { IConfiguration } from '../../models/interfaces';

@Injectable({providedIn: 'root'})

export class ConfigurationService
{
  static settings: IConfiguration;
  constructor(private http: HttpClient){}
  loadConfiguration(): void
  {
    const path = 'assets/settings/settings.json';
    this.http.get<IConfiguration>(path).subscribe(data =>
    {
      if (data && typeof data === 'object')
        ConfigurationService.settings = data;
    })
  }
  loadPromise(): Promise<any>
  {
    const path = 'assets/settings/settings.json';
    return Promise.all([new Promise<IConfiguration>((resolve, reject) =>
    {
      this.http.get(path).toPromise().then((response: any) =>
      {
        if (response && typeof response === 'object')
        {
          ConfigurationService.settings = response;
          const settings = ConfigurationService.settings;
          if (settings)
            resolve(settings)
          else
            reject('Ошибка при инициализации - неверный формат данных:' + settings);
        }
        else
          reject('Ошибка при инициализации - неверный формат данных:' + response);
      }).catch((response: any) => reject(`Ошибка при загрузке файла '${path}': ${JSON.stringify(response)}.`));
    })]);
  }
}