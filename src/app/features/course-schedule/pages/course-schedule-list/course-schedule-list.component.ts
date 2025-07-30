import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@features/auth/services/auth.service';
import { CourseSchedule } from '@features/course-schedule/interfaces/course-schedule';
import { CourseScheduleService } from '@features/course-schedule/services/course-schedule.service';
import {
  faCalendar,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faClock,
  faFilter,
  faLocationDot,
  faLocationPin,
  faPencil,
  faRefresh,
  faTimes,
  faUser,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import moment from 'moment';
import { Subject, take, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-course-schedule-list',
  templateUrl: './course-schedule-list.component.html',
  styleUrls: ['./course-schedule-list.component.css'],
})
export class CourseScheduleListComponent {
  private destroy$ = new Subject<void>();
  // icons
  faWarning = faWarning;
  faChevronRight = faChevronRight;
  faRefresh = faRefresh;
  faTimes = faTimes;
  faChevronLeft = faChevronLeft;
  faUser = faUser;
  faPencil = faPencil;
  faClock = faClock;
  faFilter = faFilter;
  faCalendar = faCalendar;
  faLocationPin = faLocationPin;
  faLocationDot = faLocationDot;
  faDown = faChevronDown;
  faUp = faChevronUp;

  courseSchedules: CourseSchedule[] = [];
  completedLessons: any[] = [];
  scheduledLessons: any[] = [];
  onProgressLessons: any[] = [];
  absentLessons: any[] = [];
  rescheduleLessons: any[] = [];
  loading: boolean = false;
  selectedDate = Date();
  user: any;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private courseScheduleService: CourseScheduleService,
    private authService: AuthService
  ) {
    this.layoutService.setSearchConfig({
      hide: true,
    });
    this.layoutService.setHeaderConfig({
      title: 'Course Schedule',
      icon: '',
      showHeader: true,
      showBackButton: true,
    });
    this.user = this.authService.currentUserDataSubject.value;
  }

  ngOnInit(): void {
    const today = moment();
    this.selectedDate = today.toISOString();
    this.loadData();
    this.onDateSelected(today);
  }

  setParam() {
    let queryParams: any = {};
    if (this.selectedDate) {
      const startDate = moment(this.selectedDate).startOf('day').toISOString();
      const endDate = moment(this.selectedDate).endOf('day').toISOString();
      // queryParams.date = new Date(this.selectedDate).toISOString();
      queryParams.date_start = startDate;
      queryParams.date_end = endDate;
    }
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: queryParams,
      replaceUrl: true,
    });
  }

  onDateSelected(selectedDate: moment.Moment) {
    this.selectedDate = selectedDate.toISOString();
    this.setParam();
    this.loadData();
  }

  onMonthChange(newMonth: moment.Moment): void {
    // this.selectedDate = newMonth.toISOString();
    const selectedDay = this.selectedDate
      ? moment(this.selectedDate).date()
      : moment().date();
    this.selectedDate = newMonth.clone().date(selectedDay).toISOString();
    this.loadData();
  }

  loadData() {
    this.loading = true;
    const startDate = moment(this.selectedDate).startOf('day').toISOString();
    const endDate = moment(this.selectedDate).endOf('day').toISOString();
    this.courseScheduleService
      .getCourseSchedules(startDate, endDate)
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.courseSchedules = res.data.course_schedules;
          this.scheduledLessons = this.courseSchedules.filter(
            (lesson) => lesson.status_name == 'Scheduled'
          );
          this.completedLessons = this.courseSchedules.filter(
            (lesson) => lesson.status_name == 'Completed'
          );
          this.onProgressLessons = this.courseSchedules.filter(
            (lesson) => lesson.status_name == 'On Progress'
          );
          this.absentLessons = this.courseSchedules.filter(
            (lesson) => lesson.status_name == 'Absent'
          );
          this.rescheduleLessons = this.courseSchedules.filter(
            (lesson) => lesson.status_name == 'Rescheduled'
          );
        },
        error: (err) => {
          this.loading = false;
        },
      });
  }

  onLessonStatusChanged(event: { id: number; newStatus: number }): void {
    const { id, newStatus } = event;
    const allLessons = [
      ...this.scheduledLessons,
      ...this.onProgressLessons,
      ...this.rescheduleLessons,
      ...this.completedLessons,
      ...this.absentLessons,
    ];

    const updatedLesson = allLessons.find((l) => l.id === id);
    if (!updatedLesson) return;

    // Update status
    updatedLesson.status = newStatus;
    updatedLesson.status_name = this.getStatusName(newStatus);

    // Hapus dari semua list
    this.scheduledLessons = this.scheduledLessons.filter((l) => l.id !== id);
    this.onProgressLessons = this.onProgressLessons.filter((l) => l.id !== id);
    this.rescheduleLessons = this.onProgressLessons.filter((l) => l.id !== id);
    this.completedLessons = this.completedLessons.filter((l) => l.id !== id);
    this.absentLessons = this.absentLessons.filter((l) => l.id !== id);

    // Masukkan ke list baru
    switch (newStatus) {
      case 0:
        this.scheduledLessons.unshift(updatedLesson);
        break;
      case 1:
        this.onProgressLessons.unshift(updatedLesson);
        break;
      case 2:
        this.onProgressLessons.unshift(updatedLesson);
        break;
      case 3:
        this.completedLessons.unshift(updatedLesson);
        break;
      case 4:
        this.completedLessons.unshift(updatedLesson);
        break;
    }
  }

  getStatusName(status: number): string {
    switch (status) {
      case 0:
        return 'Scheduled';
      case 1:
        return 'On Progress';
      case 2:
        return 'Rescheduled';
      case 3:
        return 'Completed';
      case 4:
        return 'Absent';
      default:
        return '';
    }
  }
}
