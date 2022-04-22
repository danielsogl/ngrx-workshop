import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { fromEvent, pluck } from 'rxjs';
import { filterDefined } from '@eternal/shared/ngrx-utils';
import { map } from 'rxjs/operators';
import { syncLocalStorage } from './sync-local-storage.action';

@Injectable()
export class LocalStorageEffects {
  localStorageChange$ = createEffect(() =>
    fromEvent<StorageEvent>(window, 'storage').pipe(
      pluck('key'),
      filterDefined,
      map((key) => syncLocalStorage({ featureState: key }))
    )
  );
}
