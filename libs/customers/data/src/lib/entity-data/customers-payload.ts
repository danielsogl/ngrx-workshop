import { Customer } from '@eternal/customers/model';

export interface CustomersPayload {
  total: number;
  content: Customer[];
}
