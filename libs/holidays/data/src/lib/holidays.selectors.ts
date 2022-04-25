import { holidaysFeature } from './holidays.reducer';
import { createSelector } from '@ngrx/store';

const selectHolidaysWithFavourite = createSelector(
  holidaysFeature.selectHolidays,
  holidaysFeature.selectFavouriteIds,
  (holidays, favouriteIds) =>
    holidays.map((holiday) => ({
      ...holiday,
      isFavourite: favouriteIds.includes(holiday.id),
    }))
);

const isLoaded = createSelector(
  holidaysFeature.selectLoadStatus,
  (loadStatus) => loadStatus === 'loaded'
);

export const fromHolidays = {
  get: holidaysFeature.selectHolidays,
  isLoaded,
  selectHolidaysWithFavourite,
};
