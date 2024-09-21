import { IBankAccount, NewBankAccount } from './bank-account.model';

export const sampleWithRequiredData: IBankAccount = {
  id: 28004,
  name: 'mmm numb',
  balance: 23937.19,
};

export const sampleWithPartialData: IBankAccount = {
  id: 20499,
  name: 'astride',
  balance: 8199.29,
};

export const sampleWithFullData: IBankAccount = {
  id: 16623,
  name: 'geez',
  balance: 837,
};

export const sampleWithNewData: NewBankAccount = {
  name: 'important vacantly',
  balance: 18442.93,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
