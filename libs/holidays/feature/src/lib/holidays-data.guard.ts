import { CanActivate, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { fromHolidays } from '@eternal/holidays/data';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HolidaysDataGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(fromHolidays.isLoaded);
  }
}
