import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '1387d873-41f9-478b-b688-189853180df5',
};

export const sampleWithPartialData: IAuthority = {
  name: 'e2a6eb91-8233-4669-add4-5b2164876ec4',
};

export const sampleWithFullData: IAuthority = {
  name: '7feb02c3-6a35-437f-9c25-477083ba754a',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
