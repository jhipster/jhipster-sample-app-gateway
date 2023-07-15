import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

@NgModule({
  imports: [
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild([
      {
        path: 'user-management',
        loadChildren: () => import('./user-management/user-management.route'),
        title: 'Users',
      },
      {
        path: 'docs',
        loadComponent: () => import('./docs/docs.component'),
        title: 'API',
      },
      {
        path: 'configuration',
        loadComponent: () => import('./configuration/configuration.component'),
        title: 'Configuration',
      },
      {
        path: 'health',
        loadComponent: () => import('./health/health.component'),
        title: 'Health Checks',
      },
      {
        path: 'logs',
        loadComponent: () => import('./logs/logs.component'),
        title: 'Logs',
      },
      {
        path: 'metrics',
        loadComponent: () => import('./metrics/metrics.component'),
        title: 'Application Metrics',
      },
      {
        path: 'gateway',
        loadComponent: () => import('./gateway/gateway.component'),
        title: 'Gateway',
      },
      /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
    ]),
  ],
})
export default class AdminRoutingModule {}
