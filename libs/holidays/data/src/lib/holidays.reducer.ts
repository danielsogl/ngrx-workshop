import { Holiday } from '@eternal/holidays/model';
import { createFeature, createReducer, on } from '@ngrx/store';
import {
  addFavourite,
  addFavouriteUndo,
  favouriteRemoved,
  load,
  loaded,
} from './holidays.actions';
import { LoadStatus } from '@eternal/shared/ngrx-utils';
import { immerOn } from 'ngrx-immer/store';
import { safeAssign } from '@eternal/shared/util';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const adapter = createEntityAdapter<Holiday>();

export interface HolidaysState extends EntityState<Holiday> {
  favouriteIds: number[];
  loadStatus: LoadStatus;
}

const initialState: HolidaysState = adapter.getInitialState({
  favouriteIds: [],
  loadStatus: 'not loaded',
});

export const holidaysFeature = createFeature({
  name: 'holidays',
  reducer: createReducer<HolidaysState>(
    initialState,
    immerOn(load, (state) => {
      safeAssign(state, { loadStatus: 'loading' });
    }),
    on(loaded, (state, { holidays }) => ({
      ...adapter.setAll(holidays, state),
      loadStatus: 'loaded',
    })),
    on(addFavourite, (state, { id }) => {
      if (state.favouriteIds.includes(id)) {
        return state;
      }

      return { ...state, favouriteIds: [...state.favouriteIds, id] };
    }),
    on(favouriteRemoved, addFavouriteUndo, (state, { id }) => ({
      ...state,
      favouriteIds: state.favouriteIds.filter(
        (favouriteId) => favouriteId !== id
      ),
    }))
  ),
});
