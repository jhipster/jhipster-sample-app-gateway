import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { BankAccountService } from '../service/bank-account.service';
import { IBankAccount } from '../bank-account.model';
import { BankAccountFormService } from './bank-account-form.service';

import { BankAccountUpdateComponent } from './bank-account-update.component';

describe('BankAccount Management Update Component', () => {
  let comp: BankAccountUpdateComponent;
  let fixture: ComponentFixture<BankAccountUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let bankAccountFormService: BankAccountFormService;
  let bankAccountService: BankAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BankAccountUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(BankAccountUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BankAccountUpdateComponent);
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
      const saveSubject = new Subject<HttpResponse<IBankAccount>>();
      const bankAccount = { id: 22720 };
      jest.spyOn(bankAccountFormService, 'getBankAccount').mockReturnValue(bankAccount);
      jest.spyOn(bankAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bankAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bankAccount }));
      saveSubject.complete();

      // THEN
      expect(bankAccountFormService.getBankAccount).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bankAccountService.update).toHaveBeenCalledWith(expect.objectContaining(bankAccount));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBankAccount>>();
      const bankAccount = { id: 22720 };
      jest.spyOn(bankAccountFormService, 'getBankAccount').mockReturnValue({ id: null });
      jest.spyOn(bankAccountService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bankAccount: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bankAccount }));
      saveSubject.complete();

      // THEN
      expect(bankAccountFormService.getBankAccount).toHaveBeenCalled();
      expect(bankAccountService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBankAccount>>();
      const bankAccount = { id: 22720 };
      jest.spyOn(bankAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bankAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bankAccountService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
