import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { serverApiUrl } from 'app/config';

import { GatewayRoute } from './gateway-route.model';

@Service()
export class GatewayRoutesService {
  private readonly http = inject(HttpClient);

  findAll(): Observable<GatewayRoute[]> {
    return this.http.get<GatewayRoute[]>(`${serverApiUrl}api/gateway/routes`);
  }
}
