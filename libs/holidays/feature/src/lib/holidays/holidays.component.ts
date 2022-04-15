import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromHolidays } from '../+state/holidays.selectors';

@Component({
  selector: 'eternal-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss'],
})
export class HolidaysComponent {
  holidays$ = this.store.select(fromHolidays.get);

  constructor(private store: Store) {}
}
