import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Customer } from '@eternal/customers/model';
import { fromCustomers } from './customers.selectors';
import * as customersActions from './customers.actions';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomersRepository {
  readonly customers$: Observable<Customer[]> = this.store.select(
    fromCustomers.selectCustomers
  );
  readonly customersWithSelected$: Observable<
    (Customer & { selected: boolean })[]
  > = this.store.select(fromCustomers.selectCustomersWithSelected);
  readonly selectedCustomer$: Observable<Customer | undefined> =
    this.store.select(fromCustomers.selectSelectedCustomer);

  findById(id: number): Observable<Customer | undefined> {
    return this.store.select(fromCustomers.selectById(id));
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
