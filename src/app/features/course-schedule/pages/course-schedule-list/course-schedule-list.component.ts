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
  loading: boolean = false;
  selectedDate = Date();
  user: any;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
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
        },
        error: (err) => {
          this.loading = false;
        },
      });
  }

  onLessonStatusChanged(lessonId: number): void {
    const lessonIndex = this.scheduledLessons.findIndex(
      (l) => l.id === lessonId
    );
    if (lessonIndex !== -1) {
      const updatedLesson = { ...this.scheduledLessons[lessonIndex] };
      updatedLesson.status = 1; // On Progress
      updatedLesson.status_name = 'On Progress';

      // Pindahkan dari scheduled ke onProgress
      this.scheduledLessons.splice(lessonIndex, 1);
      this.onProgressLessons.unshift(updatedLesson);
    }
  }
}
