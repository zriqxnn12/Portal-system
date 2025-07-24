import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '@features/event/services/event.service';
import {
  faChevronDown,
  faFloppyDisk,
  faImage,
  faLocationDot,
  faPhone,
  faPlus,
  faRefresh,
  faSpinner,
  faTimes,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-event-payment-dialog',
  templateUrl: './event-payment-dialog.component.html',
  styleUrls: ['./event-payment-dialog.component.css'],
})
export class EventPaymentDialogComponent {
  private readonly destroy$: any = new Subject();
  // Icons
  faTimes = faTimes;
  faRefresh = faRefresh;
  faUser = faUser;
  faPhone = faPhone;
  faLocationDot = faLocationDot;
  faPlus = faPlus;
  faSpinner = faSpinner;
  faFloppyDisk = faFloppyDisk;
  faTrash = faTrash;
  faImage = faImage;
  faChevronDown = faChevronDown;

  loadingSubmit = false;
  title = '';
  eventId: any;
  participantId: any;
  event: any;

  pastedImages: Array<{ file: File; image_url: string }> = [];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fcToastService: FcToastService,
    private eventService: EventService,
    private dialogService: DialogService,
    private router: Router
  ) {
    if (this.config.data) {
      this.title = this.config.data.title;
      this.eventId = this.config.data.eventId;
      this.participantId = this.config.data.participantId;
    }
  }

  ngOnInit(): void {}

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('document:paste', ['$event'])
  handlePaste(event: ClipboardEvent) {
    const items = event.clipboardData?.items;
    if (items) {
      const itemsArray = Array.from(items);
      for (const item of itemsArray) {
        if (item.type.includes('image')) {
          const blob = item.getAsFile();
          if (blob) {
            this.readImage(blob);
          }
        }
      }
    }
  }

  @HostListener('drop', ['$event'])
  handleDrop(event: DragEvent) {
    event.preventDefault();

    const items = event.dataTransfer?.items;
    if (items) {
      const itemsArray = Array.from(items);
      for (const item of itemsArray) {
        if (item.kind === 'file' && item.type.includes('image')) {
          const file = item.getAsFile();
          if (file) {
            this.readImage(file);
          }
        }
      }
    }
  }

  @HostListener('dragover', ['$event'])
  handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private readImage(blob: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const imageUrl = e.target.result;
      const imageObject = {
        file: blob,
        image_url: imageUrl,
      };
      if (!this.pastedImages.some((img) => img.image_url === imageUrl)) {
        this.pastedImages.push(imageObject);
      }
    };
    reader.readAsDataURL(blob);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach((file) => {
        this.readImage(file);
      });
    }
  }

  removeImage(event: MouseEvent, index: number) {
    event.stopPropagation();
    this.pastedImages.splice(index, 1);
  }

  submit() {
    this.loadingSubmit = true;
    const eventId = this.eventId;
    const participantId = this.participantId;

    const formData = new FormData();
    // this.pastedImages.forEach((image) => {
    //   formData.append('file_path', image.file);
    // });
    formData.append('file_path', this.pastedImages[0].file);

    this.eventService
      .updateFileEventParticipant(eventId, participantId, formData)
      .subscribe({
        next: () => {
          this.fcToastService.add({
            severity: 'success',
            header: 'Payment Successfuly',
            message: 'You have successfully Pay for the event.',
          });
          this.loadingSubmit = false;
          this.ref.close();
        },
        error: (err) => {
          this.fcToastService.add({
            severity: 'error',
            header: 'Payment Failed',
            message: 'Failed to pay for the event: ' + err.message,
          });
          this.loadingSubmit = false;
        },
      });
  }

  onClose() {
    this.ref.close();
  }
}
