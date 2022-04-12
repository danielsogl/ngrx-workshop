import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { customersActions } from '@eternal/customers/data';
import { Customer } from '@eternal/customers/model';

@Injectable({ providedIn: 'root' })
export class CustomerRepository {
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
