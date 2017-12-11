import { BaseEntity } from './../../shared';

export class BankAccount implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public balance?: number,
    ) {
    }
}
