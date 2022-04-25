import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Customer } from '@eternal/customers/model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CustomersEntityCollectionService extends EntityCollectionServiceBase<Customer> {
  constructor(private factory: EntityCollectionServiceElementsFactory) {
    super('Customer', factory);
  }

  readonly total$ = this.store.select(
    this.selectors.selectCollection,
    (state: { total: number }) => state.total
  );
}
