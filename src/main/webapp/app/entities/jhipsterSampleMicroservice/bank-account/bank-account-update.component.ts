import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBankAccount } from 'app/shared/model/jhipsterSampleMicroservice/bank-account.model';
import { BankAccountService } from './bank-account.service';

@Component({
    selector: 'jhi-bank-account-update',
    templateUrl: './bank-account-update.component.html'
})
export class BankAccountUpdateComponent implements OnInit {
    bankAccount: IBankAccount;
    isSaving: boolean;

    constructor(protected bankAccountService: BankAccountService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bankAccount }) => {
            this.bankAccount = bankAccount;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.bankAccount.id !== undefined) {
            this.subscribeToSaveResponse(this.bankAccountService.update(this.bankAccount));
        } else {
            this.subscribeToSaveResponse(this.bankAccountService.create(this.bankAccount));
        }
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
