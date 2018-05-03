import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IBankAccount } from 'app/shared/model/jhipsterSampleMicroservice/bank-account.model';
import { BankAccountService } from './bank-account.service';

@Component({
    selector: 'jhi-bank-account-update',
    templateUrl: './bank-account-update.component.html'
})
export class BankAccountUpdateComponent implements OnInit {
    private _bankAccount: IBankAccount;
    isSaving: boolean;

    constructor(private bankAccountService: BankAccountService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ bankAccount }) => {
            this.bankAccount = bankAccount.body ? bankAccount.body : bankAccount;
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBankAccount>>) {
        result.subscribe((res: HttpResponse<IBankAccount>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get bankAccount() {
        return this._bankAccount;
    }

    set bankAccount(bankAccount: IBankAccount) {
        this._bankAccount = bankAccount;
    }
}
