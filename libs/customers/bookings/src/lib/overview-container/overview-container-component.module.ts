import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverviewContainerComponent } from './overview-container.component';
import { OverviewComponentModule } from '../overview/overview.component.module';

@NgModule({
  declarations: [OverviewContainerComponent],
  exports: [OverviewContainerComponent],
  imports: [CommonModule, OverviewComponentModule],
})
export class OverviewContainerComponentModule {}
