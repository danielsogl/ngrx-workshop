import { Customer } from '@eternal/customers/model';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Customers] Load');
export const loaded = createAction(
  '[Customers] Loaded',
  props<{ customers: Customer[] }>()
);

export const add = createAction(
  '[Customers] Add',
  props<{ customer: Customer }>()
);
export const added = createAction(
  '[Customers] Added',
  props<{ customers: Customer[] }>()
);

export const update = createAction(
  '[Customers] Update',
  props<{ customer: Customer }>()
);
export const updated = createAction(
  '[Customers] Updated',
  props<{ customers: Customer[] }>()
);

export const remove = createAction(
  '[Customers] Remove',
  props<{ customer: Customer }>()
);
export const removed = createAction(
  '[Customers] Removed',
  props<{ customers: Customer[] }>()
);

export const select = createAction(
  '[Customers] Select',
  props<{ id: number }>()
);

export const unselect = createAction('[Customers] Unselect');
