import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '@eternal/customers/model';
import { CustomerComponentModule } from '@eternal/customers/ui';
import { Options } from '@eternal/shared/form';
import { fromMaster } from '@eternal/shared/master-data';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { customersActions, fromCustomers } from '@eternal/customers/data';

@Component({
  selector: 'eternal-edit-customer',
  template: ` <eternal-customer
    *ngIf="data$ | async as data"
    [customer]="data.customer"
    [countries]="data.countries"
    (save)="this.submit($event)"
    (remove)="this.remove($event)"
  ></eternal-customer>`,
})
export class EditCustomerComponent {
  data$: Observable<{ customer: Customer; countries: Options }>;
  customerId = 0;

  constructor(private store: Store, private route: ActivatedRoute) {
    const countries$ = this.store.select(fromMaster.selectCountries);
    const customer$ = this.store
      .select(
        fromCustomers.selectById(
          Number(this.route.snapshot.paramMap.get('id') || '')
        )
      )
      .pipe(
        this.verifyCustomer,
        map((customer) => {
          this.customerId = customer.id;
          return { ...customer };
        })
      );

    this.data$ = combineLatest({
      countries: countries$,
      customer: customer$,
    }).pipe(map(({ countries, customer }) => ({ countries, customer })));
  }

  submit(customer: Customer) {
    this.store.dispatch(
      customersActions.update({
        customer: { ...customer, id: this.customerId },
      })
    );
  }

  remove(customer: Customer) {
    this.store.dispatch(
      customersActions.remove({
        customer: { ...customer, id: this.customerId },
      })
    );
  }

  private verifyCustomer(customer$: Observable<undefined | Customer>) {
    function customerGuard(
      customer: undefined | Customer
    ): customer is Customer {
      return customer !== undefined;
    }

    return customer$.pipe(filter(customerGuard));
  }
}

@NgModule({
  declarations: [EditCustomerComponent],
  exports: [EditCustomerComponent],
  imports: [CommonModule, CustomerComponentModule],
})
export class EditCustomerComponentModule {}
