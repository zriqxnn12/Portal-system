import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventViewComponent } from './pages/event-view/event-view.component';

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      {
        path: 'list',
        component: EventListComponent,
      },
      {
        path: 'view/:id',
        component: EventViewComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
