import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '5c28c536-ccdf-4f29-a77e-8075e780a7dd',
};

export const sampleWithPartialData: IAuthority = {
  name: '0b82f2c3-f2c8-4de5-b9d3-160f2af4ebe1',
};

export const sampleWithFullData: IAuthority = {
  name: '9ea1cf4d-eb3e-432f-a686-60cc0acd2f8d',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
