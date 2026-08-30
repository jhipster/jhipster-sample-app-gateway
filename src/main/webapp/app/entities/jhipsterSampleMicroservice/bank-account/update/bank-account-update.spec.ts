import { beforeEach, describe, expect, it, vi } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { Subject, from, of } from 'rxjs';

import { IBankAccount } from '../bank-account.model';
import { BankAccountService } from '../service/bank-account.service';

import { BankAccountFormService } from './bank-account-form.service';
import { BankAccountUpdate } from './bank-account-update';

describe('BankAccount Management Update Component', () => {
  let comp: BankAccountUpdate;
  let fixture: ComponentFixture<BankAccountUpdate>;
  let activatedRoute: ActivatedRoute;
  let bankAccountFormService: BankAccountFormService;
  let bankAccountService: BankAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(BankAccountUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bankAccountFormService = TestBed.inject(BankAccountFormService);
    bankAccountService = TestBed.inject(BankAccountService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const bankAccount: IBankAccount = { id: 22583 };

      activatedRoute.data = of({ bankAccount });
      comp.ngOnInit();

      expect(comp.bankAccount).toEqual(bankAccount);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IBankAccount>();
      const bankAccount = { id: 22720 };
      vi.spyOn(bankAccountFormService, 'getBankAccount').mockReturnValue(bankAccount);
      vi.spyOn(bankAccountService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bankAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(bankAccount);
      saveSubject.complete();

      // THEN
      expect(bankAccountFormService.getBankAccount).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bankAccountService.update).toHaveBeenCalledWith(expect.objectContaining(bankAccount));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IBankAccount>();
      const bankAccount = { id: 22720 };
      vi.spyOn(bankAccountFormService, 'getBankAccount').mockReturnValue({ id: null });
      vi.spyOn(bankAccountService, 'create').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bankAccount: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(bankAccount);
      saveSubject.complete();

      // THEN
      expect(bankAccountFormService.getBankAccount).toHaveBeenCalled();
      expect(bankAccountService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IBankAccount>();
      const bankAccount = { id: 22720 };
      vi.spyOn(bankAccountService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bankAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bankAccountService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
