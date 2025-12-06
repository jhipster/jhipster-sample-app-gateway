import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Alert } from './alert/alert';
import { AlertError } from './alert/alert-error';

@NgModule({
  imports: [Alert, AlertError],
  exports: [CommonModule, NgbModule, FontAwesomeModule, Alert, AlertError],
})
export default class SharedModule {}
