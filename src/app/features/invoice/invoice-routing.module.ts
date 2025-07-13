import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './pages/invoice-view/invoice-view.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    children: [
      {
        path: 'list',
        component: InvoiceListComponent,
      },
      {
        path: 'view/:id',
        component: InvoiceViewComponent,
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
export class InvoiceRoutingModule {}
