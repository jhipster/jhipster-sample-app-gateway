import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import Password from './password';

const passwordRoute: Route = {
  path: 'password',
  component: Password,
  title: 'Password',
  canActivate: [UserRouteAccessService],
};

export default passwordRoute;
