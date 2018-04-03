import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhipsterSampleGatewaySharedModule } from 'app/shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import {
  adminState,
  AuditResolvePagingParams,
  AuditsComponent,
  UserDeleteDialogComponent,
  UserMgmtComponent,
  UserMgmtDetailComponent,
  UserMgmtUpdateComponent,
  UserMgmtDeleteDialogComponent,
  LogsComponent,
  JhiMetricsMonitoringModalComponent,
  JhiMetricsMonitoringComponent,
  JhiHealthModalComponent,
  JhiHealthCheckComponent,
  JhiConfigurationComponent,
  JhiDocsComponent,
  AuditsService,
  JhiConfigurationService,
  JhiHealthService,
  JhiMetricsService,
  GatewayRoutesService,
  JhiGatewayComponent,
  LogsService,
  UserResolvePagingParams,
  UserMgmtResolve,
  UserResolve
} from './';

@NgModule({
  imports: [
    JhipsterSampleGatewaySharedModule,
    RouterModule.forChild(adminState)
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
  ],
  declarations: [
    AuditsComponent,
    UserDeleteDialogComponent,
    UserMgmtComponent,
    UserMgmtDetailComponent,
    UserMgmtUpdateComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    JhiConfigurationComponent,
    JhiHealthCheckComponent,
    JhiHealthModalComponent,
    JhiDocsComponent,
    JhiGatewayComponent,
    JhiMetricsMonitoringComponent,
    JhiMetricsMonitoringModalComponent
  ],
  entryComponents: [UserMgmtUpdateComponent, UserMgmtDeleteDialogComponent, JhiHealthModalComponent, JhiMetricsMonitoringModalComponent],
  providers: [
    AuditResolvePagingParams,
    AuditsService,
    JhiConfigurationService,
    JhiHealthService,
    JhiMetricsService,
    GatewayRoutesService,
    LogsService,
    UserResolvePagingParams,
    UserResolve,
    UserMgmtResolve
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleGatewayAdminModule {}
