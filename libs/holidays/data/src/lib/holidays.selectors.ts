import { adapter, holidaysFeature } from './holidays.reducer';
import { createSelector } from '@ngrx/store';

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

const { selectLoadStatus } = holidaysFeature;

const selectIdTitles = createSelector(selectHolidays, (holidays) =>
  holidays.map(({ id, title }) => ({ id, title }))
);

const isLoaded = createSelector(
  holidaysFeature.selectLoadStatus,
  (loadStatus) => loadStatus === 'loaded'
);

export const fromHolidays = {
  get: selectHolidays,
  selectHolidaysWithFavourite,
  selectIdTitles,
  selectLoadStatus,
  isLoaded,
};
