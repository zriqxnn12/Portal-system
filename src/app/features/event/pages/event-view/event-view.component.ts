import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '@features/event/interfaces/event';
import { EventService } from '@features/event/services/event.service';
import {
  faCalendar,
  faClock,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FcConfirmService } from '@shared/components/fc-confirm/fc-confirm.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css'],
})
export class EventViewComponent {
  private readonly destroy$ = new Subject<void>();
  faLocationDot = faLocationDot;
  faCalendar = faCalendar;
  faClock = faClock;

  imageUrl: string = '';
  @Input() event: Event = {} as Event;
  isMobileView: boolean = false;
  loading: boolean = false;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private fcConfirmService: FcConfirmService,
    private eventService: EventService
  ) {
    this.event.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setSearchConfig({
      hide: true,
    });
    this.layoutService.setHeaderConfig({
      title: 'Event Detail',
      icon: '',
      showHeader: true,
      showBackButton: true,
    });
    this.onResize();
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
    this.eventService.getEvent(this.event.id).subscribe((res: any) => {
      this.loading = false;
      this.event = res.data;
    });
  }

  loadingBtn: boolean = true;
  requestAsParticipant() {
    this.fcConfirmService.open({
      header: 'Confirmation',
      message: 'Are you sure you want to join this event?',
      accept: () => {
        this.loadingBtn = true;
        this.eventService.generateAsParticipant(this.event.id).subscribe({
          next: (res: any) => {
            this.loadingBtn = false;
            this.fcToastService.add({
              severity: 'success',
              header: 'Request success',
              message: res.message,
            });
            this.router.navigate(['/event/list']);
          },
          error: (err) => {
            this.loadingBtn = false;
            this.fcToastService.add({
              severity: 'error',
              header: 'fail Request',
              message: err.message,
            });
          },
        });
      },
    });
  }
}
