import { IBankAccount, NewBankAccount } from './bank-account.model';

export const sampleWithRequiredData: IBankAccount = {
  id: 28004,
  name: 'protocol boohoo',
  balance: 10841,
};

export const sampleWithPartialData: IBankAccount = {
  id: 18682,
  name: 'primary regarding',
  balance: 16997,
};

export const sampleWithFullData: IBankAccount = {
  id: 29707,
  name: 'Radon',
  balance: 29223,
};

export const sampleWithNewData: NewBankAccount = {
  name: 'Associate Investment Funk',
  balance: 16109,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
