import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 28287,
  login: 'c',
};

export const sampleWithPartialData: IUser = {
  id: 655,
  login: '.L',
};

export const sampleWithFullData: IUser = {
  id: 13406,
  login: 'OZH5l',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
