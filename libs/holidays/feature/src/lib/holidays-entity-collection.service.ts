import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Holiday } from '@eternal/holidays/model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HolidaysEntityCollectionService extends EntityCollectionServiceBase<Holiday> {
  constructor(private factory: EntityCollectionServiceElementsFactory) {
    super('Holiday', factory);
  }
}
