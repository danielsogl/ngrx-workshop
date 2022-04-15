import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { holidaysFeature } from './+state/holidays.reducer';
import { map } from 'rxjs/operators';
import * as holidaysActions from './+state/holidays.actions';

@Injectable({
  providedIn: 'root',
})
export class HolidayDataGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(): Observable<boolean | UrlTree> {
    this.store.dispatch(holidaysActions.get());
    return this.store.select(holidaysFeature.selectLoadStatus).pipe(
      filter((loadStatus) => loadStatus === 'loaded'),
      map(() => true)
    );
  }
}
