import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '52c3cdf9-787e-48ad-88b2-2328e936fa4b',
};

export const sampleWithPartialData: IAuthority = {
  name: '9ac4e33f-86c0-4c28-bb4f-612db0281f5a',
};

export const sampleWithFullData: IAuthority = {
  name: 'a9bd3552-302c-4be9-9db3-69474f5957f1',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
