import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomersApi } from '@eternal/customers/api';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { Booking, bookingsFeature } from './bookings.reducer';
import { assertDefined, filterDefined } from '@eternal/shared/util';

interface BookingData {
  bookings: Booking[];
  customerName: string;
  loaded: boolean;
}

@Injectable({ providedIn: 'root' })
export class BookingsRepository {
  readonly bookingData$: Observable<BookingData> = combineLatest({
    customer: this.customersApi.selectedCustomer$,
    bookings: this.store.select(bookingsFeature.selectBookings),
    loaded: this.store.select(bookingsFeature.selectLoaded),
  }).pipe(
    filter(({ customer }) => filterDefined(customer)),
    map(({ customer, bookings, loaded }) => {
      assertDefined(customer);
      return {
        customerName: customer.name + ', ' + customer.firstname,
        bookings,
        loaded,
      };
    })
  );

  constructor(private store: Store, private customersApi: CustomersApi) {}
}
