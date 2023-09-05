import { IBankAccount, NewBankAccount } from './bank-account.model';

export const sampleWithRequiredData: IBankAccount = {
  id: 28004,
  name: 'supposing besides',
  balance: 23656.52,
};

export const sampleWithPartialData: IBankAccount = {
  id: 23711,
  name: 'so redirect wherever',
  balance: 17429.33,
};

export const sampleWithFullData: IBankAccount = {
  id: 12359,
  name: 'so as when',
  balance: 20404.26,
};

export const sampleWithNewData: NewBankAccount = {
  name: 'anaesthetise',
  balance: 24819.58,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
