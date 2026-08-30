import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AccountService } from 'app/core/auth';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [RouterLink],
})
export default class Home {
  public readonly account = inject(AccountService).account;

  private readonly router = inject(Router);

  login(): void {
    this.router.navigate(['/login']);
  }
}
