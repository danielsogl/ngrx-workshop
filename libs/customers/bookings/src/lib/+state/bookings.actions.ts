import { createAction, props } from '@ngrx/store';
import { Booking } from './bookings.reducer';

export const load = createAction('[Customer CustomersBookings] Load');
export const loaded = createAction(
  '[Customer CustomersBookings] Loaded',
  props<{ bookings: Booking[] }>()
);
export const reset = createAction('[Customer CustomersBookings] Reset');
