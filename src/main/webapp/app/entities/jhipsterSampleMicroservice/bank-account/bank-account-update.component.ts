import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IBankAccount, BankAccount } from 'app/shared/model/jhipsterSampleMicroservice/bank-account.model';
import { BankAccountService } from './bank-account.service';

@Component({
  selector: 'jhi-bank-account-update',
  templateUrl: './bank-account-update.component.html'
})
export class BankAccountUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    balance: [null, [Validators.required]]
  });

  constructor(protected bankAccountService: BankAccountService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ bankAccount }) => {
      this.updateForm(bankAccount);
    });
  }

  updateForm(bankAccount: IBankAccount) {
    this.editForm.patchValue({
      id: bankAccount.id,
      name: bankAccount.name,
      balance: bankAccount.balance
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const bankAccount = this.createFromForm();
    if (bankAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.bankAccountService.update(bankAccount));
    } else {
      this.subscribeToSaveResponse(this.bankAccountService.create(bankAccount));
    }
  }

  private createFromForm(): IBankAccount {
    const entity = {
      ...new BankAccount(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      balance: this.editForm.get(['balance']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBankAccount>>) {
    result.subscribe((res: HttpResponse<IBankAccount>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
