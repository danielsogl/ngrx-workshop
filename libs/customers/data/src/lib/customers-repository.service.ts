import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Customer } from '@eternal/customers/model';
import { Observable } from 'rxjs';
import { fromCustomers } from './customers.selectors';
import * as customersActions from './customers.actions';
import { deepClone, filterDefined } from '@eternal/shared/ngrx-utils';
import { customersFeature } from './customers.reducer';

@Injectable({ providedIn: 'root' })
export class CustomersRepository {
  readonly customers$: Observable<Customer[]> = this.store
    .select(fromCustomers.selectCustomers)
    .pipe(deepClone);

  readonly pagedCustomers$: Observable<{
    customers: (Customer & { selected: boolean })[];
    total: number;
    page: number;
  }> = this.store.select(fromCustomers.selectPagedCustomers);

  readonly selectedCustomer$: Observable<Customer> = this.store
    .select(fromCustomers.selectSelectedCustomer)
    .pipe(filterDefined, deepClone);

  readonly hasError$: Observable<boolean> = this.store.select(
    customersFeature.selectHasError
  );

  readonly canUndo$: Observable<boolean> = this.store.select(
    fromCustomers.selectCanUndo()
  );

  readonly canRedo$: Observable<boolean> = this.store.select(
    fromCustomers.selectCanRedo()
  );
  findById(id: number): Observable<Customer> {
    return this.store
      .select(fromCustomers.selectById(id))
      .pipe(filterDefined, deepClone);
  }

  constructor(private store: Store) {}

  init(): void {
    this.store.dispatch(customersActions.init());
  }

  get(page: number): void {
    this.store.dispatch(customersActions.get({ page }));
  }

  load(page: number = 1): void {
    this.store.dispatch(customersActions.load({ page }));
  }

  add(customer: Customer): void {
    this.store.dispatch(customersActions.add({ customer }));
  }

  update(
    customer: Customer,
    forward: string,
    message: string,
    callback?: () => void
  ): void {
    this.store.dispatch(
      customersActions.update({ customer, forward, message, callback })
    );
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

  undo(): void {
    this.store.dispatch(customersActions.undo());
  }
  redo(): void {
    this.store.dispatch(customersActions.redo());
  }
}
