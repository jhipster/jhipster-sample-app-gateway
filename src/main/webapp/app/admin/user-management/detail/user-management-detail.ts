import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { User } from '../user-management.model';

@Component({
  selector: 'jhi-user-mgmt-detail',
  templateUrl: './user-management-detail.html',
  imports: [RouterLink, FontAwesomeModule, DatePipe],
})
export default class UserManagementDetail {
  user = input<User | null>(null);
}
