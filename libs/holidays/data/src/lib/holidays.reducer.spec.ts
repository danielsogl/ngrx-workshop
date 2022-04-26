import { holidaysFeature } from './holidays.reducer';
import { createHolidays } from '@eternal/holidays/model';
import { loaded } from './holidays.actions';

it('should test the loaded action', () => {
  const holidays = createHolidays(
    { title: 'Pyramids' },
    { title: 'Tower Bridge' }
  );

  const state = holidaysFeature.reducer(
    { holidays: [], loadStatus: 'not loaded', favouriteIds: [] },
    loaded({ holidays })
  );

  expect(state).toEqual({ holidays, loadStatus: 'loaded', favouriteIds: [] });
});
