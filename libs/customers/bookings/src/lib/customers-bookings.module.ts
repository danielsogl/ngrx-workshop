import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomersBookingsEffects } from './+state/bookings-effects.service';
import { bookingsFeature } from './+state/bookings.reducer';
import { OverviewContainerComponent } from './overview-container/overview-container.component';
import { OverviewContainerComponentModule } from './overview-container/overview-container-component.module';

@NgModule({
  imports: [
    CommonModule,
    OverviewContainerComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: OverviewContainerComponent,
      },
    ]),
    StoreModule.forFeature(bookingsFeature),
    EffectsModule.forFeature([CustomersBookingsEffects]),
  ],
})
export class CustomersBookingsModule {}
