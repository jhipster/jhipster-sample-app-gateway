import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { microserviceContextPath, serverApiUrl } from 'app/config';

import { Level, LoggersResponse } from './log.model';

@Service()
export class LogsService {
  private readonly http = inject(HttpClient);

  changeLevel(name: string, configuredLevel: Level, service?: string): Observable<{}> {
    return this.http.post(`${serverApiUrl}${service ? `${microserviceContextPath}${service}/` : ''}management/loggers/${name}`, {
      configuredLevel,
    });
  }

  findAll(service?: string): Observable<LoggersResponse> {
    return this.http.get<LoggersResponse>(`${serverApiUrl}${service ? `${microserviceContextPath}${service}/` : ''}management/loggers`);
  }
}
