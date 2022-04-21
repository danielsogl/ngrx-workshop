import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from '@eternal/shared/ui-messaging';
import { CustomersRepository } from '@eternal/customers/data';
import { first } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveComponentModule } from '@ngrx/component';

@Component({
  template: ` <div class="w-36 flex justify-between">
      <button
        *ngrxLet="customersRepository.canUndo$ as undo"
        mat-raised-button
        class="mr-4"
        (click)="handleUndo()"
        [disabled]="!undo"
      >
        <mat-icon>undo</mat-icon>
      </button>
      <button
        *ngrxLet="customersRepository.canRedo$ as redo"
        mat-raised-button
        (click)="handleRedo()"
        [disabled]="!redo"
      >
        <mat-icon>redo</mat-icon>
      </button>
    </div>
    <router-outlet></router-outlet>`,
})
export class CustomerRootComponent {
  constructor(
    public customersRepository: CustomersRepository,
    router: Router,
    messageService: MessageService
  ) {
    customersRepository.hasError$.pipe(first(Boolean)).subscribe(() => {
      router.navigateByUrl('/');
      messageService.confirm(
        'Sorry, but Customers are not available at the moment.<br>Please try again later.'
      );
    });
  }

  handleRedo() {
    this.customersRepository.redo();
  }

  handleUndo() {
    this.customersRepository.undo();
  }
}

@NgModule({
  declarations: [CustomerRootComponent],
  exports: [CustomerRootComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    ReactiveComponentModule,
  ],
})
export class CustomerRootComponentModule {}
