import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JhipsterSampleGatewaySharedModule } from 'app/shared/shared.module';
import { JhipsterSampleGatewayCoreModule } from 'app/core/core.module';
import { JhipsterSampleGatewayAppRoutingModule } from './app-routing.module';
import { JhipsterSampleGatewayHomeModule } from './home/home.module';
import { JhipsterSampleGatewayEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JhipsterSampleGatewaySharedModule,
    JhipsterSampleGatewayCoreModule,
    JhipsterSampleGatewayHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JhipsterSampleGatewayEntityModule,
    JhipsterSampleGatewayAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class JhipsterSampleGatewayAppModule {}
