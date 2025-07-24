import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventViewComponent } from './pages/event-view/event-view.component';
import { EventComponent } from './event.component';
import { SharedModule } from '@shared/shared.module';
import { FcImagePreviewModule } from '@shared/components/fc-image-preview/fc-image-preview.module';
import { FcFileInputModule } from '@shared/components/fc-file-input/fc-file-input.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { EventPaymentComponent } from './pages/event-payment/event-payment.component';
import { EventPaymentDialogComponent } from './components/event-payment-dialog/event-payment-dialog.component';

@NgModule({
  declarations: [EventListComponent, EventViewComponent, EventComponent, EventPaymentComponent, EventPaymentDialogComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
    FcImagePreviewModule,
    FcFileInputModule,
    FcPaginationModule,
  ],
})
export class EventModule {}
