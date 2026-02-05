import { Component, input } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { IAuthority } from '../authority.model';

@Component({
  selector: 'jhi-authority-detail',
  templateUrl: './authority-detail.html',
  imports: [FontAwesomeModule, NgbModule, Alert, AlertError],
})
export class AuthorityDetail {
  authority = input<IAuthority | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
