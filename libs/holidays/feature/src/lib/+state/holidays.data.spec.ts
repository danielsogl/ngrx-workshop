import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { holidaysFeature } from './holidays.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HolidaysEffects } from './holidays.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Configuration } from '@eternal/shared/config';
import { get } from './holidays.actions';
import { fromHolidays } from './holidays.selectors';
import { createHoliday, createHolidays } from '@eternal/holidays/model';
import { firstValueFrom } from 'rxjs';

describe('Holidays Data', () => {
  let store: Store;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(holidaysFeature),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([HolidaysEffects]),
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: Configuration,
          useValue: new Configuration('https://www.host.com/'),
        },
      ],
    });

    httpCtrl = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
  });

  it('should load holidays', async () => {
    const holidays = createHolidays(
      { title: 'Pyramids' },
      { title: 'Tower Bridge' }
    );

    store.dispatch(get());
    httpCtrl.expectOne('/holiday').flush(holidays);

    expect(await firstValueFrom(store.select(fromHolidays.get))).toEqual(
      holidays.map((holiday) => ({
        ...holiday,
        imageUrl: `https://www.host.com/${holiday.imageUrl}`,
      }))
    );
    httpCtrl.verify();
  });

  it('should cache the holidays', async () => {
    const holiday = createHoliday({ imageUrl: 'pyramids.jpg' });

    store.dispatch(get());
    httpCtrl.expectOne('/holiday').flush([holiday]);
    store.dispatch(get());

    httpCtrl.verify();
    expect(await firstValueFrom(store.select(fromHolidays.get))).toEqual([
      {
        ...holiday,
        imageUrl: 'https://www.host.com/pyramids.jpg',
      },
    ]);
  });
});
