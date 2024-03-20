import { IBankAccount, NewBankAccount } from './bank-account.model';

export const sampleWithRequiredData: IBankAccount = {
  id: 18186,
  name: 'overdue',
  balance: 13084.67,
};

export const sampleWithPartialData: IBankAccount = {
  id: 16407,
  name: 'through',
  balance: 22221.26,
};

export const sampleWithFullData: IBankAccount = {
  id: 4414,
  name: 'whoa',
  balance: 11178.18,
};

export const sampleWithNewData: NewBankAccount = {
  name: 'fabulous woozy',
  balance: 4653.17,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
