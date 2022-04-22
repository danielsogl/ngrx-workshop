import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '@eternal/customers/model';
import { CustomerComponentModule } from '@eternal/customers/ui';
import { Options } from '@eternal/shared/form';
import { fromMaster } from '@eternal/shared/master-data';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomersRepository } from '@eternal/customers/data';

@Component({
  selector: 'eternal-edit-customer',
  template: ` <eternal-customer
    *ngIf="data$ | async as data"
    [customer]="data.customer"
    [countries]="data.countries"
    [disableSubmitButton]="disableSubmitButton"
    (save)="this.submit($event)"
    (remove)="this.remove($event)"
  ></eternal-customer>`,
})
export class EditCustomerComponent {
  data$: Observable<{ customer: Customer; countries: Options }>;
  customerId = 0;
  disableSubmitButton = false;

  constructor(
    private store: Store,
    private customersRepository: CustomersRepository,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const countries$ = this.store.select(fromMaster.selectCountries);
    this.customerId = Number(this.route.snapshot.paramMap.get('id') || '');
    const customer$ = this.customersRepository.findById(this.customerId);

    this.data$ = combineLatest({
      countries: countries$,
      customer: customer$,
    }).pipe(map(({ countries, customer }) => ({ countries, customer })));
  }

  submit(customer: Customer) {
    const urlTree = this.router.createUrlTree(['..'], {
      relativeTo: this.route,
    });
    this.disableSubmitButton = true;
    this.customersRepository.update(
      { ...customer, id: this.customerId },
      urlTree.toString(),
      'Customer has been updated',
      () => (this.disableSubmitButton = true)
    );
  }

  remove(customer: Customer) {
    this.customersRepository.remove({ ...customer, id: this.customerId });
  }
}

@NgModule({
  declarations: [EditCustomerComponent],
  exports: [EditCustomerComponent],
  imports: [CommonModule, CustomerComponentModule],
})
export class EditCustomerComponentModule {}
