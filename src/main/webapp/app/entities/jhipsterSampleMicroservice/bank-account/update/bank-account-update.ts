import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AlertError } from 'app/shared/alert/alert-error';
import { IBankAccount } from '../bank-account.model';
import { BankAccountService } from '../service/bank-account.service';

import { BankAccountFormGroup, BankAccountFormService } from './bank-account-form.service';

@Component({
  selector: 'jhi-bank-account-update',
  templateUrl: './bank-account-update.html',
  imports: [NgbModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class BankAccountUpdate implements OnInit {
  isSaving = signal(false);
  bankAccount: IBankAccount | null = null;

  protected bankAccountService = inject(BankAccountService);
  protected bankAccountFormService = inject(BankAccountFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: BankAccountFormGroup = this.bankAccountFormService.createBankAccountFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bankAccount }) => {
      this.bankAccount = bankAccount;
      if (bankAccount) {
        this.updateForm(bankAccount);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const bankAccount = this.bankAccountFormService.getBankAccount(this.editForm);
    if (bankAccount.id === null) {
      this.subscribeToSaveResponse(this.bankAccountService.create(bankAccount));
    } else {
      this.subscribeToSaveResponse(this.bankAccountService.update(bankAccount));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBankAccount>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving.set(false);
  }

  protected updateForm(bankAccount: IBankAccount): void {
    this.bankAccount = bankAccount;
    this.bankAccountFormService.resetForm(this.editForm, bankAccount);
  }
}
