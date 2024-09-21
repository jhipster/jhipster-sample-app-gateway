import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 19133,
  login: '=XK@y9VkV\\/Epi\\zZqkIv\\Wfclu87\\mD\\J8',
};

export const sampleWithPartialData: IUser = {
  id: 19127,
  login: 'miz',
};

export const sampleWithFullData: IUser = {
  id: 6199,
  login: '.',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
