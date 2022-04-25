import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HolidaysEffects } from './+state/holidays.effects';
import { holidaysFeature } from './+state/holidays.reducer';
import { HolidaysComponent } from './holidays/holidays.component';
import { HolidaysComponentModule } from './holidays/holidays.component.module';
import { RequestInfoComponent } from './request-info/request-info.component';
import { RequestInfoComponentModule } from './request-info/request-info.component.module';
import { HolidayDataGuard } from './holiday-data.guard';
import { EntityDefinitionService, PLURAL_NAMES_TOKEN } from '@ngrx/data';

@NgModule({
  imports: [
    HolidaysComponentModule,
    RequestInfoComponentModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [HolidayDataGuard],
        children: [
          {
            path: '',
            component: HolidaysComponent,
          },
          {
            path: 'request-info/:holidayId',
            component: RequestInfoComponent,
          },
        ],
      },
    ]),
    StoreModule.forFeature(holidaysFeature),
    EffectsModule.forFeature([HolidaysEffects]),
  ],
  providers: [
    {
      provide: PLURAL_NAMES_TOKEN,
      multi: true,
      useValue: { Holiday: 'Holiday' },
    },
  ],
})
export class HolidaysFeatureModule {
  constructor(entityDefinitionService: EntityDefinitionService) {
    entityDefinitionService.registerMetadataMap({
      Holiday: { additionalCollectionState: { favouriteIds: [] } },
    });
  }
}
