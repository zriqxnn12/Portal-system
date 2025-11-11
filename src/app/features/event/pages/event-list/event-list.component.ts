import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@features/auth/services/auth.service';
import { Event, EventParticipant } from '@features/event/interfaces/event';
import { EventService } from '@features/event/services/event.service';
import { User } from '@features/user-profile/interfaces/user-profile';
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
  eventParticipants: EventParticipant[] = [];
  isMobileView: boolean = false;
  user: User = {} as User;
  type: number | undefined = 1;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private fcToastService: FcToastService,
    private authService: AuthService,
    private eventService: EventService
  ) {
    this.layoutService.setSearchConfig({
      hide: true,
    });
    this.authService.getCurrentUserData.subscribe((user) => {
      this.user = user;
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
    this.loadEventParticipants();
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
          // Simpan dulu, filter nanti setelah participants dimuat
          const filteredEvents = allEvents.filter(
            (event: any) => event.type_name === userType
          );
          if (this.eventParticipants.length > 0) {
            const joinedEventIds = this.eventParticipants.map(
              (p) => p.event_id
            );
            this.events = filteredEvents.filter(
              (event: any) => !joinedEventIds.includes(event.id)
            );
          } else {
            this.events = filteredEvents;
          }
          // this.events = allEvents.filter(
          //   (event: any) => event.type_name === userType
          // );
        },
        error: (err: any) => {
          this.loading = false;
          this.layoutService.setSearchConfig({
            loading: false,
          });
        },
      });
  }

  isEventExpired(eventDate: string) {
    const today = new Date();
    const eventDateTime = new Date(eventDate);
    return eventDateTime < today; // true jika tanggal terlewat
  }

  loadEventParticipants() {
    this.loading = true;
    this.eventService
      .getEventParticipants()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.eventParticipants = res.data.event_participants;
          this.loadData();
        },
        error: (err: any) => {
          this.loading = false;
          this.layoutService.setSearchConfig({
            loading: false,
          });
        },
      });
  }

  getStatusColor(status: number): string {
    switch (status) {
      case 0: // Request to join
        return 'bg-slate-400';
      case 1: // Accepted
        return 'bg-yellow-400';
      case 2: // Rejected
        return 'bg-red-400';
      case 3: // Payment Review
        return 'bg-sky-400';
      case 4: // Paid
        return 'bg-green-400';
      default:
        return '';
    }
  }

  navigateToDetail(event: Event) {
    this.router.navigate(['/event/view/', event.id]);
  }

  navigateToPayment(participant: EventParticipant) {
    this.router.navigate([
      '/event',
      participant.event.id,
      'payment',
      participant.id,
    ]);
  }
}
