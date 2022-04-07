export * from './lib/customers-data.module';

export {
  load,
  update,
  add,
  remove,
  select,
  unselect,
} from './lib/customers.actions';
export { fromCustomers } from './lib/customers.selectors';
