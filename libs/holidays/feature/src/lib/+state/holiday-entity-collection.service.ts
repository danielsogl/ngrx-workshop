import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Holiday } from '@eternal/holidays/model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HolidayEntityCollectionService extends EntityCollectionServiceBase<Holiday> {
  constructor(ecsef: EntityCollectionServiceElementsFactory) {
    super('Holiday', ecsef);
  }
}
