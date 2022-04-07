import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '@eternal/customers/model';
import { Configuration } from '@eternal/shared/config';
import { MessageService } from '@eternal/shared/ui-messaging';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { add, load, loaded, remove, update } from './customers.actions';

@Injectable()
export class CustomersEffects {
  #baseUrl = '/customers';

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      switchMap(() =>
        this.http.get<{ content: Customer[]; totalPages: number }>(
          this.#baseUrl
          // { params: new HttpParams().set('page', 10) }
        )
      ),
      map(({ content }) => loaded({ customers: content }))
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(add),
      concatMap(({ customer }) =>
        this.http.post<{ customers: Customer[]; id: number }>(
          this.#baseUrl,
          customer
        )
      ),

      tap(() => this.router.navigateByUrl('/customers')),
      map(() => load())
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(update),
      concatMap(({ customer }) =>
        this.http
          .put<Customer[]>(this.#baseUrl, customer)
          .pipe(tap(() => this.uiMessage.info('Customer has been updated')))
      ),
      map(() => load())
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(remove),
      concatMap(({ customer }) =>
        this.http.delete<Customer[]>(`${this.#baseUrl}/${customer.id}`)
      ),
      tap(() => this.router.navigateByUrl('/customers')),
      map(() => load())
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store,
    private configuration: Configuration,
    private uiMessage: MessageService
  ) {}
}
