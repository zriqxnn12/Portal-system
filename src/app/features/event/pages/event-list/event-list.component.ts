import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '@features/event/interfaces/event';
import { EventService } from '@features/event/services/event.service';
import {
  faCalendar,
  faClock,
  faFire,
  faLocationDot,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { Subject, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {
  private readonly destroy$ = new Subject<void>();
  faLocationDot = faLocationDot;
  faCalendar = faCalendar;
  faClock = faClock;
  faFire = faFire;
  faUsers = faUsers;

  imageUrl: string = '';
  loading: boolean = true;
  events: Event[] = [];
  isMobileView: boolean = false;
  type: number | undefined = 1;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private fcToastService: FcToastService,
    private eventService: EventService
  ) {
    this.layoutService.setSearchConfig({
      hide: true,
    });
    this.layoutService.setHeaderConfig({
      title: 'Event',
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
    const userStr = localStorage.getItem('user'); // asumsikan user disimpan saat login
    const user = userStr ? JSON.parse(userStr) : null;

    // Tentukan filter berdasarkan tipe user
    let userType = '';
    if (user?.student) {
      userType = 'Student';
    } else if (user?.staff?.teacher) {
      userType = 'Teacher';
    }
    this.eventService
      .getEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          const allEvents = res.data.events;
          this.events = allEvents.filter(
            (event: any) => event.type_name === userType
          );
        },
        error: (err: any) => {
          this.loading = false;
          this.layoutService.setSearchConfig({
            loading: false,
          });
        },
      });
  }

  navigateToDetail(event: Event) {
    this.router.navigate(['/event/view/', event.id]);
  }
}
