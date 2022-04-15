import { Holiday } from '@eternal/holidays/model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { loaded } from './holidays.actions';

export interface HolidaysState {
  holidays: Holiday[];
  loadStatus: LoadStatus;
}

const initialState: HolidaysState = { holidays: [], loadStatus: 'not loaded' };

export const holidaysFeature = createFeature({
  name: 'holiday',
  reducer: createReducer(
    initialState,
    on(loaded, (state, { holidays }) => ({
      ...state,
      holidays,
    }))
  ),
});
