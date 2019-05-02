import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleGatewaySharedModule } from 'app/shared';
import {
  BankAccountComponent,
  BankAccountDetailComponent,
  BankAccountUpdateComponent,
  BankAccountDeletePopupComponent,
  BankAccountDeleteDialogComponent,
  bankAccountRoute,
  bankAccountPopupRoute
} from './';

const ENTITY_STATES = [...bankAccountRoute, ...bankAccountPopupRoute];

@NgModule({
  imports: [JhipsterSampleGatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BankAccountComponent,
    BankAccountDetailComponent,
    BankAccountUpdateComponent,
    BankAccountDeleteDialogComponent,
    BankAccountDeletePopupComponent
  ],
  entryComponents: [BankAccountComponent, BankAccountUpdateComponent, BankAccountDeleteDialogComponent, BankAccountDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleMicroserviceBankAccountModule {}
