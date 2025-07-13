import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './pages/invoice-view/invoice-view.component';
import { InvoiceComponent } from './invoice.component';
import { SharedModule } from '@shared/shared.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcSelectOptionModule } from '@shared/components/fc-select-option/fc-select-option.module';
import { FcDatepickerModule } from '@shared/components/fc-datepicker/fc-datepicker.module';
import { FcInputNumberModule } from '@shared/components/fc-input-number/fc-input-number.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { FcTextareaModule } from '@shared/components/fc-textarea/fc-textarea.module';
import { FcImagePreviewModule } from '@shared/components/fc-image-preview/fc-image-preview.module';

@NgModule({
  declarations: [InvoiceListComponent, InvoiceViewComponent, InvoiceComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule,
    FcInputTextModule,
    FcSelectOptionModule,
    FcDatepickerModule,
    FcInputNumberModule,
    FcPaginationModule,
    FcTextareaModule,
    FcImagePreviewModule,
  ],
})
export class InvoiceModule {}
