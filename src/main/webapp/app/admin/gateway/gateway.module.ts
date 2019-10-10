import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhipsterSampleGatewaySharedModule } from 'app/shared/shared.module';

import { JhiGatewayComponent } from './gateway.component';

import { gatewayRoute } from './gateway.route';

@NgModule({
  imports: [JhipsterSampleGatewaySharedModule, RouterModule.forChild([gatewayRoute])],
  declarations: [JhiGatewayComponent]
})
export class GatewayModule {}
