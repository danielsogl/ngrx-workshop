import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../+state/holidays.actions';
import { fromHolidays } from '../+state/holidays.selectors';
import { Holiday } from '@eternal/holidays/model';
import { Observable } from 'rxjs';
import { HolidaysEntityCollectionService } from '../holidays-entity-collection.service';
import { map } from 'rxjs/operators';
import { Configuration } from '@eternal/shared/config';

@Component({
  selector: 'eternal-holidays',
  template: `<h2>Choose among our Holidays</h2>
    <button
      *ngrxLet="canUndo$ as undo"
      mat-raised-button
      class="mr-4"
      (click)="handleUndo()"
      [disabled]="!undo"
    >
      <mat-icon>undo</mat-icon>
    </button>
    <button
      *ngrxLet="canRedo$ as redo"
      mat-raised-button
      (click)="handleRedo()"
      [disabled]="!redo"
    >
      <mat-icon>redo</mat-icon>
    </button>
    <div class="flex flex-wrap justify-evenly">
      <eternal-holiday-card
        *ngFor="let holiday of holidays$ | async; trackBy: byId"
        [holiday]="holiday"
        (addFavourite)="addFavourite($event)"
        (removeFavourite)="removeFavourite($event)"
      >
      </eternal-holiday-card>
    </div> `,
})
export class HolidaysComponent {
  holidays$ = this.holidaysRepo.entities$.pipe(
    map((holidays) =>
      holidays.map((holiday) => ({
        ...holiday,
        imageUrl: `${this.config.baseUrl}${holiday.imageUrl}`,
        isFavourite: true,
      }))
    )
  );
  canUndo$: Observable<boolean> = this.store.select(
    fromHolidays.selectCanUndo()
  );
  canRedo$: Observable<boolean> = this.store.select(
    fromHolidays.selectCanRedo()
  );

  constructor(
    private store: Store,
    private holidaysRepo: HolidaysEntityCollectionService,
    private config: Configuration
  ) {
    this.holidaysRepo;
    holidaysRepo.getAll();
  }

  addFavourite(id: number) {
    this.store.dispatch(actions.addFavourite({ id }));
  }

  removeFavourite(id: number) {
    this.store.dispatch(actions.removeFavourite({ id }));
  }

  byId(index: number, holiday: Holiday) {
    return holiday.id;
  }

  handleUndo() {
    this.store.dispatch(actions.undo());
  }

  handleRedo() {
    this.store.dispatch(actions.redo());
  }
}
