import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HolidaysEffects } from './holidays.effects';
import { holidaysFeature } from './holidays.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(holidaysFeature),
    EffectsModule.forFeature([HolidaysEffects]),
  ],
})
export class HolidaysDataModule {}
