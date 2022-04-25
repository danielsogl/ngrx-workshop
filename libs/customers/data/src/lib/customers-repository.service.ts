import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from '@eternal/customers/model';
import { fromCustomers } from '@eternal/customers/data';
import * as customersActions from './customers.actions';

@Injectable({ providedIn: 'root' })
export class CustomersRepository {
  readonly customers$: Observable<Customer[]> = this.store.select(
    fromCustomers.selectCustomers
  );

  readonly pagedCustomers$: Observable<{
    customers: (Customer & { selected: boolean })[];
    total: number;
    page: number;
  }> = this.store.select(fromCustomers.selectPagedCustomers);

  readonly selectedCustomer$: Observable<Customer | undefined> =
    this.store.select(fromCustomers.selectSelectedCustomer);

  findById(id: number): Observable<Customer | undefined> {
    return this.store.select(fromCustomers.selectById(id));
  }

  constructor(private store: Store) {}

  load(page: number = 1): void {
    this.store.dispatch(customersActions.load({ page }));
  }

  add(customer: Customer): void {
    this.store.dispatch(customersActions.add({ customer }));
  }

  update(customer: Customer): void {
    this.store.dispatch(customersActions.update({ customer }));
  }

  remove(customer: Customer): void {
    this.store.dispatch(customersActions.remove({ customer }));
  }

  select(id: number): void {
    this.store.dispatch(customersActions.select({ id }));
  }

  unselect(): void {
    this.store.dispatch(customersActions.unselect());
  }
}
