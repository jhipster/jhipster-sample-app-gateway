import { IBankAccount, NewBankAccount } from './bank-account.model';

export const sampleWithRequiredData: IBankAccount = {
  id: 85463,
  name: 'protocol boohoo',
  balance: 33086,
};

export const sampleWithPartialData: IBankAccount = {
  id: 57013,
  name: 'primary regarding',
  balance: 51872,
};

export const sampleWithFullData: IBankAccount = {
  id: 90659,
  name: 'Radon',
  balance: 89182,
};

export const sampleWithNewData: NewBankAccount = {
  name: 'Markets Funk 1080p',
  balance: 74861,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
