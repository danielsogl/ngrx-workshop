import { adapter, holidaysFeature } from './holidays.reducer';
import { createSelector } from '@ngrx/store';
import { createHistorySelectors } from 'ngrx-wieder';

const selectHolidays = createSelector(
  holidaysFeature.selectHolidaysState,
  adapter.getSelectors().selectAll
);

const selectHolidaysWithFavourite = createSelector(
  selectHolidays,
  holidaysFeature.selectFavouriteIds,
  (holidays, favouriteIds) =>
    holidays.map((holiday) => ({
      ...holiday,
      isFavourite: favouriteIds.includes(holiday.id),
    }))
);

const { selectCanRedo, selectCanUndo } = createHistorySelectors(
  holidaysFeature.selectHolidaysState
);

export const fromHolidays = {
  get: selectHolidays,
  selectHolidaysWithFavourite,
  selectCanRedo,
  selectCanUndo,
};
