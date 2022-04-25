import { Customer } from '@eternal/customers/model';
import { createFeature, createReducer, on } from '@ngrx/store';
import {
  init,
  load,
  loadFailure,
  loadSuccess,
  redo,
  select,
  undo,
  unselect,
} from './customers.actions';
import { immerOn } from 'ngrx-immer/store';
import { initialUndoRedoState, undoRedo, UndoRedoState } from 'ngrx-wieder';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const adapter = createEntityAdapter<Customer>({
  sortComparer: (customer1, customer2) =>
    customer1.name.localeCompare(customer2.name),
});

export interface CustomersState extends UndoRedoState, EntityState<Customer> {
  page: number;
  total: number;
  selectedId: number | undefined;
  isLoaded: boolean;
  hasError: boolean;
}

export const initialState: CustomersState = adapter.getInitialState({
  page: 0,
  total: 0,
  selectedId: undefined,
  isLoaded: false,
  hasError: false,
  ...initialUndoRedoState,
});

const { createUndoRedoReducer } = undoRedo({
  maxBufferSize: 2,
  allowedActionTypes: [select.type, unselect.type],
  undoActionType: undo.type,
  redoActionType: redo.type,
});

export const customersFeature = createFeature({
  name: 'customers',
  reducer: createReducer<CustomersState>(
    initialState,
    immerOn(init, (state) => {
      if (state.hasError) {
        state = { ...initialState };
      }
    }),
    immerOn(load, (state, { page }) => {
      state.page = page;
    }),
    on(loadSuccess, (state, { customers, total }) => ({
      ...adapter.setAll(customers, state),
      total,
      isLoaded: true,
      hasError: false,
    })),
    immerOn(loadFailure, (state) => {
      state.hasError = true;
    }),
    immerOn(select, (state, { id }) => {
      state.selectedId = id;
    }),
    immerOn(unselect, (state) => {
      state.selectedId = undefined;
    })
  ),
});
