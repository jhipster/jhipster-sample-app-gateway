import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Alert, AlertError } from 'app/shared/alert';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { IUserManagement } from '../user-management.model';

@Component({
  selector: 'jhi-user-management-detail',
  templateUrl: './user-management-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, RouterLink, FormatMediumDatetimePipe],
})
export class UserManagementDetail {
  readonly userManagement = input<IUserManagement | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
