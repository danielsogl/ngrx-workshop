import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromCustomer } from './customer.selectors';

@Injectable({ providedIn: 'root' })
export class CustomerFacade {
  #selectedCustomerId$: Observable<number | undefined>;

  getSelectedCustomerId$(): Observable<number | undefined> {
    return this.#selectedCustomerId$;
  }

  constructor(private store: Store) {
    this.#selectedCustomerId$ = this.store.select(
      fromCustomer.selectSelectedId
    );
  }
}
