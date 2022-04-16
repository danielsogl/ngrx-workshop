import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { CustomersComponentModule } from '@eternal/customers/ui';
import { Store } from '@ngrx/store';
import { select, unselect } from '../+state/customers.actions';
import { fromCustomers } from '../+state/customers.selectors';

@Component({
  template: ` <eternal-customers
    *ngIf="customers$ | async as customers"
    [customers]="customers"
    (setSelected)="setSelected($event)"
    (setUnselected)="setUnselected()"
  ></eternal-customers>`,
})
export class CustomersContainerComponent {
  customers$ = this.customersRepository.customersWithSelected$;

  constructor(private customersRepository: CustomersRepository) {}

  setSelected(id: number) {
    this.customersRepository.select(id);
  }

  setUnselected() {
    this.customersRepository.unselect();
  }
}

@NgModule({
  declarations: [CustomersContainerComponent],
  exports: [CustomersContainerComponent],
  imports: [CommonModule, CustomersComponentModule],
})
export class CustomersContainerComponentModule {}
