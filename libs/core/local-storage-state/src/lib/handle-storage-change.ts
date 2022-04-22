import { fromEvent, pluck } from 'rxjs';
import { filterDefined } from '@eternal/shared/ngrx-utils';
import { map } from 'rxjs/operators';
import { syncLocalStorage } from './sync-local-storage.action';
import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class LocalStorageEffects {
  storageEvent$ = createEffect(() =>
    fromEvent<StorageEvent>(window, 'storage').pipe(
      pluck('key'),
      filterDefined,
      map((key) => syncLocalStorage({ featureState: key }))
    )
  );
}
