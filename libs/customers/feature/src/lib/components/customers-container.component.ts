import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { CustomersComponentModule } from '@eternal/customers/ui';
import { Store } from '@ngrx/store';
import { customersActions, fromCustomers } from '@eternal/customers/data';

@Component({
  template: ` <eternal-customers
    *ngIf="customers$ | async as customers"
    [customers]="customers"
    (setSelected)="setSelected($event)"
    (setUnselected)="setUnselected()"
  ></eternal-customers>`,
})
export class CustomersContainerComponent {
  customers$ = this.store.select(fromCustomers.selectCustomerWithSelected);

  constructor(private store: Store) {}

  setSelected(id: number) {
    this.store.dispatch(customersActions.select({ id }));
  }

  setUnselected() {
    this.store.dispatch(customersActions.unselect());
  }
}

@NgModule({
  declarations: [CustomersContainerComponent],
  exports: [CustomersContainerComponent],
  imports: [CommonModule, CustomersComponentModule],
})
export class CustomersContainerComponentModule {}
