import { Component, HostListener, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventPaymentDialogComponent } from '@features/event/components/event-payment-dialog/event-payment-dialog.component';
import { Event, EventParticipant } from '@features/event/interfaces/event';
import { EventService } from '@features/event/services/event.service';
import {
  faCalendar,
  faClock,
  faLocationDot,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FcConfirmService } from '@shared/components/fc-confirm/fc-confirm.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-event-payment',
  templateUrl: './event-payment.component.html',
  styleUrls: ['./event-payment.component.css'],
})
export class EventPaymentComponent {
  private readonly destroy$ = new Subject<void>();
  faLocationDot = faLocationDot;
  faCalendar = faCalendar;
  faClock = faClock;
  faSpinner = faSpinner;

  participantForm!: FormGroup;
  imageUrl: string = '';
  @Input() event: Event = {} as Event;
  @Input() eventParticipant: EventParticipant = {} as EventParticipant;
  isMobileView: boolean = false;
  loading: boolean = false;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private fcConfirmService: FcConfirmService,
    private dialogService: DialogService,
    private eventService: EventService
  ) {
    this.event.id = Number(this.route.snapshot.paramMap.get('eventId'));
    this.eventParticipant.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setSearchConfig({
      hide: true,
    });
    this.layoutService.setHeaderConfig({
      title: 'Event Payment',
      icon: '',
      showHeader: true,
      showBackButton: true,
    });
    this.onResize();
    // event participant form
    this.participantForm = new FormGroup({
      file_path: new FormControl(null, Validators.required),
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileView = window.innerWidth < 768;
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

  loadData() {
    this.loading = true;
    this.eventService
      .getEventParticipant(this.event.id, this.eventParticipant.id)
      .subscribe((res: any) => {
        this.loading = false;
        this.eventParticipant = res.data;
      });
  }

  submit() {
    const ref = this.dialogService.open(EventPaymentDialogComponent, {
      data: {
        title: 'Upload Payment',
        eventId: this.event.id,
        participantId: this.eventParticipant.id,
      },
      showHeader: false,
      contentStyle: {
        padding: '0',
      },
      style: {
        overflow: 'hidden',
      },
      styleClass: 'rounded-sm',
      dismissableMask: true,
      width: '600px',
    });
    ref.onClose.subscribe((payment) => {
      if (payment) {
      }
    });
  }
}
