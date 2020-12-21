import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'bank-account',
        data: { pageTitle: 'BankAccounts' },
        loadChildren: () =>
          import('./jhipsterSampleMicroservice/bank-account/bank-account.module').then(m => m.JhipsterSampleMicroserviceBankAccountModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
