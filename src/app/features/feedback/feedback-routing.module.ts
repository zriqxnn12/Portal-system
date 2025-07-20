import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './feedback.component';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbackComponent,
    children: [
      {
        path: 'create',
        component: CreateFeedbackComponent,
      },
      {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackRoutingModule {}
