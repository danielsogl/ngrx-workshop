import { Holiday } from '@eternal/holidays/model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { LoadStatus } from '@eternal/shared/ngrx-utils';
import { immerOn } from 'ngrx-immer/store';
import { addFavourite, load, loaded, removeFavourite } from './holidays.actions';

export interface HolidaysState {
  holidays: Holiday[];
  loadStatus: LoadStatus;
  favouriteIds: number[];
}

const initialState: HolidaysState = { holidays: [], favouriteIds: [], loadStatus: 'not loaded' };

export const holidaysFeature = createFeature({
  name: 'holidays',
  reducer: createReducer<HolidaysState>(
    initialState,
    immerOn(load, (state) => {
      state.loadStatus = 'loading';
    }),
    immerOn(loaded, (state, { holidays }) => {
      state.loadStatus = 'loaded';
      state.holidays = holidays;
    }),
    on(addFavourite, (state, { id }) => {
      if (state.favouriteIds.includes(id)) {
        return state;
      }

      return { ...state, favouriteIds: [...state.favouriteIds, id] };
    }),
    on(removeFavourite, (state, { id }) => ({
      ...state,
      favouriteIds: state.favouriteIds.filter(
        (favouriteId) => favouriteId !== id
      ),
    }))

  ),
});
