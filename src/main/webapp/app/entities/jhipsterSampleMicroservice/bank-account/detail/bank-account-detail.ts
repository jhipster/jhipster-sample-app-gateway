import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { IBankAccount } from '../bank-account.model';

@Component({
  selector: 'jhi-bank-account-detail',
  templateUrl: './bank-account-detail.html',
  imports: [FontAwesomeModule, NgbModule, Alert, AlertError, RouterLink],
})
export class BankAccountDetail {
  bankAccount = input<IBankAccount | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
