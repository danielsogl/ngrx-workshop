import { addFavourite, load, removeFavourite } from './lib/holidays.actions';

export * from './lib/holidays-data.module';
export { fromHolidays } from './lib/holidays.selectors';
export const holidaysActions = { load, addFavourite, removeFavourite };
