import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { CustomersComponentModule } from '@eternal/customers/ui';
import { Store } from '@ngrx/store';
import { select, unselect } from '../../../../data/src/lib/customers.actions';
import { fromCustomer } from '../../../../data/src/lib/customers.selectors';

@Component({
  template: ` <eternal-customers
    *ngIf="customers$ | async as customers"
    [customers]="customers"
    (setSelected)="setSelected($event)"
    (setUnselected)="setUnselected()"
  ></eternal-customers>`,
})
export class CustomersContainerComponent {
  customers$ = this.store.select(fromCustomer.selectCustomerWithSelected);

  constructor(private store: Store) {}

  setSelected(id: number) {
    this.store.dispatch(select({ id }));
  }

  setUnselected() {
    this.store.dispatch(unselect());
  }
}

@NgModule({
  declarations: [CustomersContainerComponent],
  exports: [CustomersContainerComponent],
  imports: [CommonModule, CustomersComponentModule],
})
export class CustomersContainerComponentModule {}
