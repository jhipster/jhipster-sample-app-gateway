import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 19133,
  login: '!z7@kShHLX',
};

export const sampleWithPartialData: IUser = {
  id: 12866,
  login: 'S1-l-2@7ek',
};

export const sampleWithFullData: IUser = {
  id: 15315,
  login: 'KMh',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
