import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user-management',
    title: 'UserManagements',
    loadChildren: () => import('./admin/user-management/user-management.routes'),
  },
  {
    path: 'authority',
    title: 'Authorities',
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'bank-account',
    title: 'BankAccounts',
    loadChildren: () => import('./jhipsterSampleMicroservice/bank-account/bank-account.routes'),
  },
  // jhipster-needle-add-entity-route - JHipster will add entity modules routes here
];

export default routes;
