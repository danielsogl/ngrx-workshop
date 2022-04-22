import { Customer } from '@eternal/customers/model';
import { createSelector } from '@ngrx/store';
import { adapter, customersFeature } from './customers.reducer';
import { createHistorySelectors } from 'ngrx-wieder';

const { selectSelectedId } = customersFeature;
const selectCustomers = createSelector(
  customersFeature.selectCustomersState,
  adapter.getSelectors().selectAll
);

const selectById = (id: number) =>
  createSelector(selectCustomers, (state: Customer[]): Customer | undefined =>
    state.find((p) => p.id === id)
  );

const selectSelectedCustomer = createSelector(
  selectCustomers,
  selectSelectedId,
  (customers, selectedId): Customer | undefined =>
    customers.find((customer) => customer.id === selectedId)
);

export const selectPagedCustomers = createSelector(
  selectCustomers,
  selectSelectedId,
  customersFeature.selectPage,
  customersFeature.selectTotal,
  (customers, selectedId, page, total) => ({
    customers: customers.map((customer) => ({
      ...customer,
      selected: customer.id === selectedId,
    })),
    page,
    total,
  })
);

const { selectCanRedo, selectCanUndo } = createHistorySelectors(
  customersFeature.selectCustomersState
);

export const fromCustomers = {
  selectCustomers,
  selectPagedCustomers,
  selectSelectedCustomer,
  selectById,
  selectCanUndo,
  selectCanRedo,
};
