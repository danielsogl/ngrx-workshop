import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../+state/holidays.actions';
import { fromHolidays } from '../+state/holidays.selectors';
import { selectSelectedCustomer } from '@eternal/customers/api';

@Component({
  selector: 'eternal-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss'],
})
export class HolidaysComponent implements OnInit {
  holidays$ = this.store.select(fromHolidays.get);

  constructor(private store: Store) {
    this.store.select(selectSelectedCustomer);
  }

  ngOnInit(): void {
    this.store.dispatch(actions.find());
  }
}
