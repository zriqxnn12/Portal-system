import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { SharedModule } from '@shared/shared.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcSelectOptionModule } from '@shared/components/fc-select-option/fc-select-option.module';
import { FeedbackComponent } from './feedback.component';

@NgModule({
  declarations: [CreateFeedbackComponent, FeedbackComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    SharedModule,
    FcInputTextModule,
    FcSelectOptionModule,
  ],
})
export class FeedbackModule {}
