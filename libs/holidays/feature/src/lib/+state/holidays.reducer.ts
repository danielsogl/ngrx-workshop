import { Holiday } from '@eternal/holidays/model';
import { createFeature, on } from '@ngrx/store';
import { LoadStatus } from '@eternal/shared/ngrx-utils';
import { immerOn } from 'ngrx-immer/store';
import {
  addFavourite,
  addFavouriteUndo,
  load,
  loaded,
  redo,
  removeFavourite,
  removeFavouriteUndo,
  undo,
} from './holidays.actions';
import { initialUndoRedoState, undoRedo, UndoRedoState } from 'ngrx-wieder';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const adapter = createEntityAdapter<Holiday>({
  selectId: (holiday) => holiday.id,
  sortComparer: (holiday1, holiday2) =>
    holiday1.title.localeCompare(holiday2.title),
});

export interface HolidaysState extends UndoRedoState, EntityState<Holiday> {
  loadStatus: LoadStatus;
  favouriteIds: number[];
}

const initialState: HolidaysState = adapter.getInitialState({
  favouriteIds: [],
  loadStatus: 'not loaded',
  ...initialUndoRedoState,
});

const { createUndoRedoReducer } = undoRedo({
  undoActionType: undo.type,
  redoActionType: redo.type,
  maxBufferSize: 2,
});

export const holidaysFeature = createFeature({
  name: 'holidays',
  reducer: createUndoRedoReducer<HolidaysState>(
    initialState,
    on(load, (state) => ({
      ...state,
      loadStatus: 'loading',
    })),
    on(loaded, (state, { holidays }) => {
      return { ...adapter.setAll(holidays, state), loadStatus: 'loaded' };
    }),
    immerOn(addFavourite, removeFavouriteUndo, (state, { id }) => {
      if (state.favouriteIds.includes(id)) {
        return;
      }

      state.favouriteIds.push(id);
    }),
    immerOn(removeFavourite, addFavouriteUndo, (state, { id }) => {
      state.favouriteIds = state.favouriteIds.filter(
        (favouriteId) => favouriteId !== id
      );
    })
  ),
});
