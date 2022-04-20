import { Holiday } from '@eternal/holidays/model';
import { createFeature, createReducer } from '@ngrx/store';
import { load, loaded } from './holidays.actions';
import { LoadStatus } from '@eternal/shared/ngrx-utils';
import { immerOn } from 'ngrx-immer/store';

export interface HolidaysState {
  holidays: Holiday[];
  loadStatus: LoadStatus;
}

const initialState: HolidaysState = { holidays: [], loadStatus: 'not loaded' };

export const holidaysFeature = createFeature({
  name: 'holiday',
  reducer: createReducer(
    initialState,
    immerOn(load, (state) => {
      state.loadStatus = 'loading';
    }),
    immerOn(loaded, (state, { holidays }) => {
      state.loadStatus = 'loaded';
      state.holidays = holidays;
    })
  ),
});
