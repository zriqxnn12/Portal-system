import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceInvoice } from '@features/invoice/interfaces/service-invoice';
import { ServiceInvoiceService } from '@features/invoice/services/invoice.service';
import { faImage, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css'],
})
export class InvoiceViewComponent {
  private readonly destroy$ = new Subject<void>();
  faImage = faImage;
  faTrash = faTrash;
  faSpinner = faSpinner;

  imageUrl: string = '';
  @Input() serviceInvoice: ServiceInvoice = {} as ServiceInvoice;
  serviceInvoiceForm!: FormGroup;
  serviceInvoiceDocumentForm!: FormGroup;
  loading: boolean = false;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private serviceInvoiceService: ServiceInvoiceService
  ) {
    this.serviceInvoice.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setSearchConfig({
      hide: true,
    });
    this.layoutService.setHeaderConfig({
      title: 'Payment view',
      icon: '',
      showHeader: true,
      showBackButton: true,
    });
    this.serviceInvoiceForm = new FormGroup({
      status: new FormControl(0, Validators.required),
      invoice_no: new FormControl('', Validators.required),
      date: new FormControl(new Date(), Validators.required),
      due_date: new FormControl(new Date(), Validators.required),
      grand_total: new FormControl('', Validators.required),
      service_invoice_details: new FormArray([], Validators.required),
      student: new FormControl(null, Validators.required),
    });
    // service invoice document form
    this.serviceInvoiceDocumentForm = new FormGroup({
      file_path: new FormControl(null, Validators.required),
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

  getImageFullUrl(filePath: string): string {
    if (!filePath) return '';
    // sesuaikan base url ini dengan URL API-mu atau public URL penyimpanan file
    return `https://practice1337.s3.ap-southeast-1.amazonaws.com/${filePath}`;
  }

  get serviceInvoiceDetailFormArray(): FormArray {
    return this.serviceInvoiceForm.get('service_invoice_details') as FormArray;
  }

  generateServiceInvoiceDetail(serviceInvoiceDetail: any): FormGroup {
    return new FormGroup({
      item: new FormControl(serviceInvoiceDetail.item),
      price: new FormControl(serviceInvoiceDetail.price),
    });
  }

  addImage(image: any) {
    this.serviceInvoiceDocumentForm.controls['file_path'].setValue(image);
  }

  loadData() {
    this.loading = true;
    this.serviceInvoiceService
      .getServiceInvoice(this.serviceInvoice.id)
      .subscribe((res: any) => {
        this.loading = false;
        this.serviceInvoice = res.data;
        this.serviceInvoiceForm.patchValue({
          status: this.serviceInvoice.status,
          invoice_no: this.serviceInvoice.invoice_no,
          date: this.serviceInvoice.date,
          due_date: this.serviceInvoice.due_date,
          grand_total: this.serviceInvoice.grand_total,
          student: this.serviceInvoice.student,
        });
        // set detail lists
        this.serviceInvoice.service_invoice_details.forEach(
          (serviceInvoice) => [
            this.serviceInvoiceDetailFormArray.push(
              this.generateServiceInvoiceDetail(serviceInvoice)
            ),
          ]
        );
        // Set service invoice document image URL
        this.imageUrl = this.getImageFullUrl(
          this.serviceInvoice.service_invoice_document?.file_path
        );
      });
  }

  uploadLoading: boolean = false;
  submit() {
    this.uploadLoading = true;
    // Ambil hanya file-nya, bukan objek preview
    const fileObj = this.serviceInvoiceDocumentForm.value.file_path;
    const file = fileObj?.file;

    let fd = new FormData();
    fd.append(`file_path`, file);

    this.serviceInvoiceService
      .uploadServiceInvoiceDocument(this.serviceInvoice.id, fd)
      .subscribe({
        next: (res: any) => {
          this.uploadLoading = false;
          this.fcToastService.clear();
          this.fcToastService.add({
            severity: 'success',
            header: 'Service invoice',
            message: res.message,
          });
          this.router.navigate(['/invoice/list/']);
        },
        error: (err) => {
          this.uploadLoading = false;
          this.fcToastService.clear();
          this.fcToastService.add({
            severity: 'error',
            header: 'Service invoice',
            message: err.message,
          });
        },
      });
  }

  getStatusColor(status: number): string {
    switch (status) {
      case 0:
        return 'border border-gray-600 dark:border-gray-700 bg-gray-100 dark:bg-gray-700/20 text-gray-500';
      case 1:
        return 'border border-blue-600 dark:border-blue-700 bg-blue-100 dark:bg-blue-700/20 text-blue-500';
      case 2:
        return 'border border-green-600 dark:border-green-700 bg-green-100 dark:bg-green-700/20 text-green-500';
      case 3:
        return 'border border-red-600 dark:border-red-700 bg-red-100 dark:bg-red-700/20 text-red-500';
      default:
        return '';
    }
  }
}
