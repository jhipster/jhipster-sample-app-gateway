import { Route } from '@angular/router';

import PasswordResetInit from './password-reset-init';

const passwordResetInitRoute: Route = {
  path: 'reset/request',
  component: PasswordResetInit,
  title: 'Password',
};

export default passwordResetInitRoute;
