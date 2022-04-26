import { HttpClient } from '@angular/common/http';
import { Configuration } from '@eternal/shared/config';
import { createMock, Mock } from '@testing-library/angular/jest-utils';
import { createHolidays } from '@eternal/holidays/model';
import { firstValueFrom, of } from 'rxjs';
import { HolidaysEffects } from './holidays.effects';
import { load, loaded } from './holidays.actions';
import { marbles } from 'rxjs-marbles/jest';

describe('Holidays Effects', () => {
  let httpClient: Mock<HttpClient>;
  const config = new Configuration('http://www.host.com/');

  beforeEach(() => {
    httpClient = createMock(HttpClient);
  });

  it('should load holidays', async () => {
    const holidays = createHolidays(
      { imageUrl: 'pyramids.jpg' },
      { imageUrl: 'tower-bridge.jpg' }
    );
    httpClient.get.mockReturnValue(of(holidays));

    const effects = new HolidaysEffects(of(load()), httpClient, config);

    const action = await firstValueFrom(effects.load$);

    expect(action).toEqual(
      loaded({
        holidays: holidays.map((holiday) => ({
          ...holiday,
          imageUrl: 'http://www.host.com/' + holiday.imageUrl,
        })),
      })
    );
  });

  it(
    'should test load with marbles',
    marbles((m) => {
      const holidays = createHolidays(
        { imageUrl: 'pyramids.jpg' },
        { imageUrl: 'tower-bridge.jpg' }
      );

      httpClient.get.mockReturnValue(m.cold('10s h', { h: holidays }));
      const actions$ = m.cold('125ms l', { l: load() });

      const effects = new HolidaysEffects(actions$, httpClient, config);

      m.expect(effects.load$).toBeObservable('10s 125ms l', {
        l: loaded({
          holidays: holidays.map((holiday) => ({
            ...holiday,
            imageUrl: 'http://www.host.com/' + holiday.imageUrl,
          })),
        }),
      });
    })
  );
});
