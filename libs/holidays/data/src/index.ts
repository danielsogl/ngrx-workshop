import { addFavourite, removeFavourite } from './lib/holidays.actions';

export * from './lib/holidays-data.module';
export const holidaysActions = { addFavourite, removeFavourite };
export { fromHolidays } from './lib/holidays.selectors';
