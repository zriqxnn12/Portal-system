import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceInvoice } from '@features/invoice/interfaces/service-invoice';
import { ServiceInvoiceService } from '@features/invoice/services/invoice.service';
import {
  faCheck,
  faCheckCircle,
  faClock,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';
import { Subject, take, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent {
  private readonly destroy$ = new Subject<void>();
  // icons
  faClock = faClock;
  faCheck = faCheck;
  faSearch = faSearch;
  faCheckCircle = faCheckCircle;

  serviceInvoices: ServiceInvoice[] = [];
  loading: boolean = false;
  searchQuery: string = '';
  totalRecords = 0;
  totalPages = 1;
  page = 1;
  rows = 10;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private serviceInvoiceService: ServiceInvoiceService
  ) {
    this.layoutService.setSearchConfig({
      hide: true,
    });
    this.layoutService.setHeaderConfig({
      title: 'Payment',
      icon: '',
      showHeader: true,
      showBackButton: true,
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(page: number = 0, searchQuery: string = this.searchQuery) {
    this.loading = true;
    let dataListParameter: DataListParameter = {} as DataListParameter;
    dataListParameter.rows = this.rows;
    dataListParameter.page = this.page;
    dataListParameter.sortBy = 'order_by=id&direction=desc&with_filter=1';
    dataListParameter.searchQuery = searchQuery;

    this.serviceInvoiceService
      .getServiceInvoices(dataListParameter)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.totalRecords = res.data.count;
          this.totalPages =
            this.totalRecords > this.rows
              ? Math.ceil(this.totalRecords / this.rows)
              : 1;
          this.serviceInvoices = res.data.service_invoices;
          this.loading = false;
        },
        error: (err: any) => {
          this.loading = false;
          this.layoutService.setSearchConfig({
            loading: false,
          });
        },
      });
  }

  navigateToDetail(serviceInvoice: ServiceInvoice) {
    this.router.navigate(['/invoice/view/', serviceInvoice.id]);
  }

  onPageUpdate(pagination: any) {
    let page = pagination.page;
    let rows = pagination.rows;
    this.rows = rows;
    if (page > 0) {
      this.page = page;
    } else {
      this.page = 1;
    }
    this.loadData(this.page);
  }

  getStatusTextColor(status: number): string {
    switch (status) {
      case 0: // pending
        return 'text-yellow-500';
      case 1: // payment approval
        return 'text-blue-500';
      case 2: // approved
        return 'text-green-500';
      case 3: // cancelled
        return 'text-red-500';
      default:
        return '';
    }
  }
}
