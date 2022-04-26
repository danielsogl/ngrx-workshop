import {
  localStorageSync,
  rehydrateApplicationState,
} from 'ngrx-store-localstorage';
import { Action, ActionReducer } from '@ngrx/store';
import { syncLocalStorage } from './sync-local-storage';

function isSyncLocalStorage(
  action: Action
): action is ReturnType<typeof syncLocalStorage> {
  return action.type === syncLocalStorage.type;
}

export const localStorageReducer = (...featureStates: string[]) => {
  const syncerFn = localStorageSync({ keys: featureStates, rehydrate: true });

  return <S>(reducer: ActionReducer<S>): ActionReducer<S> =>
    (state, action) => {
      if (isSyncLocalStorage(action)) {
        const rehydratedState = rehydrateApplicationState(
          [action.featureState],
          localStorage,
          (val) => val,
          true
        );
        return { ...state, ...rehydratedState };
      } else {
        return syncerFn(reducer)(state, action);
      }
    };
};
