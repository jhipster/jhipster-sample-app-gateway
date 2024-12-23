import { Component, OnInit, inject } from '@angular/core';

import SharedModule from 'app/shared/shared.module';
import { GatewayRoutesService } from './gateway-routes.service';
import { GatewayRoute } from './gateway-route.model';

@Component({
  selector: 'jhi-gateway',
  templateUrl: './gateway.component.html',
  providers: [GatewayRoutesService],
  imports: [SharedModule],
})
export default class GatewayComponent implements OnInit {
  gatewayRoutes: GatewayRoute[] = [];
  updatingRoutes = false;

  private readonly gatewayRoutesService = inject(GatewayRoutesService);

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.updatingRoutes = true;
    this.gatewayRoutesService.findAll().subscribe(gatewayRoutes => {
      this.gatewayRoutes = gatewayRoutes.map(gatewayRoute => {
        gatewayRoute.serviceInstances = gatewayRoute.serviceInstances.map(serviceInstance => {
          if (serviceInstance?.healthService?.checks) {
            if (
              serviceInstance.healthService.checks.filter((check: any) => check.status === 'PASSING').length ===
              serviceInstance.healthService.checks.length
            ) {
              serviceInstance.instanceInfo = { status: 'UP' };
            } else {
              serviceInstance.instanceInfo = { status: 'DOWN' };
            }
          }
          return serviceInstance as object;
        });
        return gatewayRoute;
      });
      this.updatingRoutes = false;
    });
  }
}
