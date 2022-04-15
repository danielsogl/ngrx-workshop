import { Holiday } from '@eternal/holidays/model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { found } from './holidays.actions';
import { LoadStatus } from '@eternal/shared/ngrx-utils';

export interface HolidaysState {
  holidays: Holiday[];
  loadStatus: LoadStatus;
}

const initialState: HolidaysState = { holidays: [], loadStatus: 'not loaded' };

export const holidaysFeature = createFeature({
  name: 'holiday',
  reducer: createReducer(
    initialState,
    on(found, (state, { holidays }) => ({
      ...state,
      holidays,
    }))
  ),
});
