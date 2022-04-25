import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Holiday } from '@eternal/holidays/model';
import { Configuration } from '@eternal/shared/config';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { concatMap, map, switchMap } from 'rxjs/operators';
import * as actions from './holidays.actions';
import { load } from './holidays.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class HolidaysEffects implements OnInitEffects {
  #baseUrl = '/holiday';

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.load),
      switchMap(() => this.httpClient.get<Holiday[]>(this.#baseUrl)),
      map((holidays) =>
        holidays.map((holiday) => ({
          ...holiday,
          imageUrl: `${this.config.baseUrl}${holiday.imageUrl}`,
        }))
      ),
      map((holidays) => actions.loaded({ holidays }))
    )
  );

  addFavourite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addFavourite),
      concatMap(({ id }) =>
        this.httpClient
          .post<void>(`${this.#baseUrl}/favourite/${id}`, {})
          .pipe(map(() => actions.favouriteAdded({ id })))
      )
    )
  );

  removeFavourite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removeFavourite),
      concatMap(({ id }) =>
        this.httpClient
          .delete(`${this.#baseUrl}/favourite/${id}`)
          .pipe(map(() => actions.favouriteRemoved({ id })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private config: Configuration,
    private store: Store
  ) {}

  ngrxOnInitEffects() {
    return load();
  }
}
