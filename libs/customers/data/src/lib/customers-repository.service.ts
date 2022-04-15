import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Customer } from '@eternal/customers/model';
import { fromCustomers } from './customers.selectors';
import * as customersActions from './customers.actions';
import { Observable } from 'rxjs';
import { deepClone, filterDefined } from '@eternal/shared/ngrx-utils';

@Injectable({ providedIn: 'root' })
export class CustomersRepository {
  readonly customers$: Observable<Customer[]> = this.store
    .select(fromCustomers.selectCustomers)
    .pipe(deepClone);

  readonly customersWithSelected$: Observable<
    (Customer & { selected: boolean })[]
  > = this.store.select(fromCustomers.selectCustomersWithSelected);

  readonly selectedCustomer$: Observable<Customer> = this.store
    .select(fromCustomers.selectSelectedCustomer)
    .pipe(filterDefined, deepClone);

  findById(id: number): Observable<Customer> {
    return this.store
      .select(fromCustomers.selectById(id))
      .pipe(filterDefined, deepClone);
  }

  constructor(private store: Store) {}

  load(): void {
    this.store.dispatch(customersActions.load());
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