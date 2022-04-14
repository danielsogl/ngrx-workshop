import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomersApi } from '@eternal/customers/api';
import { Booking, bookingsFeature } from './bookings.reducer';
import * as bookingsActions from './bookings.actions';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingsRepository {
  readonly bookinkgs$: Observable<Booking[]> = this.store.select(
    bookingsFeature.selectBookings
  );
  readonly loaded$: Observable<boolean> = this.store.select(
    bookingsFeature.selectLoaded
  );
  constructor(private store: Store, private customersApi: CustomersApi) {}

  load(): void {
    this.store.dispatch(bookingsActions.load());
  }
}
