import { Holiday } from '@eternal/holidays/model';
import { createAction, props } from '@ngrx/store';

export const get = createAction('[Holidays] Get');
export const load = createAction('[Holidays] Load');
export const loaded = createAction(
  '[Holidays] Loaded',
  props<{ holidays: Holiday[] }>()
);

export const addFavourite = createAction(
  '[Holidays] Add Favourite',
  props<{ id: number }>()
);
export const favouriteAdded = createAction(
  '[Holidays] Favourite Added',
  props<{ id: number }>()
);

export const removeFavourite = createAction(
  '[Holidays] Remove Favourite',
  props<{ id: number }>()
);
export const favouriteRemoved = createAction(
  '[Holidays] Favourite Removed',
  props<{ id: number }>()
);

export const undo = createAction('[Holidays] Undo');
export const redo = createAction('[Holidays] Redo');
