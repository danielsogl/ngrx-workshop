import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  CustomersComponentModule,
  CustomersViewModel,
} from '@eternal/customers/ui';
import { Observable } from 'rxjs';
import { CustomersRepository } from '@eternal/customers/data';
import { map } from 'rxjs/operators';

@Component({
  template: `<eternal-customers
    *ngIf="viewModel$ | async as viewModel"
    [viewModel]="viewModel"
    (setSelected)="setSelected($event)"
    (setUnselected)="setUnselected()"
    (switchPage)="switchPage($event)"
  ></eternal-customers>`,
})
export class CustomersContainerComponent {
  viewModel$: Observable<CustomersViewModel> =
    this.customersRepository.pagedCustomers$.pipe(
      map(({ customers, page, total }) => ({
        customers,
        pageIndex: page - 1,
        length: total,
      }))
    );

  constructor(private customersRepository: CustomersRepository) {}

  setSelected(id: number) {
    this.customersRepository.select(id);
  }

  setUnselected() {
    this.customersRepository.unselect();
  }

  switchPage(page: number) {
    this.customersRepository.get(page + 1);
  }
}

@NgModule({
  declarations: [CustomersContainerComponent],
  exports: [CustomersContainerComponent],
  imports: [CommonModule, CustomersComponentModule],
})
export class CustomersContainerComponentModule {}
