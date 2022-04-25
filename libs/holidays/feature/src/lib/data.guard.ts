import { CanActivate, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { fromHolidays } from '@eternal/holidays/data';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(fromHolidays.isLoaded).pipe(filter(Boolean));
  }
}
