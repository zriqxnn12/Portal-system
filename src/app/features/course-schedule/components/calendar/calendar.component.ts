import {
  Component,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

interface CalendarDay {
  dayNumber: number | null;
  isSunday: boolean;
  hasSchedule?: boolean;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnChanges {
  faLeft = faChevronLeft;
  faRight = faChevronRight;

  @Output() dateSelected = new EventEmitter<moment.Moment>();
  @Output() monthChanged = new EventEmitter<moment.Moment>();
  currentMonth: moment.Moment;
  selectedDate: moment.Moment;
  daysInMonth: (CalendarDay | null)[] = [];
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  formattedMonth: string | undefined;

  constructor() {
    this.currentMonth = moment();
    this.selectedDate = moment();
    this.daysInMonth = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['courseSchedulesCalendar'] || changes['events']) {
    //   this.generateCalendar();
    // }
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    const startOfMonth = this.currentMonth.clone().startOf('month');
    const endOfMonth = this.currentMonth.clone().endOf('month');

    const daysInMonth: CalendarDay[] = Array.from(
      { length: endOfMonth.date() },
      (_, i) => {
        const day = startOfMonth.clone().add(i, 'days');
        // const formattedDate = day.format('YYYY-MM-DD');

        return {
          dayNumber: day.date(),
          isSunday: day.day() === 0, //check if it's sunday
        };
      }
    );
    const emptyDays: (CalendarDay | null)[] = Array.from(
      { length: startOfMonth.day() },
      () => null
    );

    this.daysInMonth = [...emptyDays, ...daysInMonth];
  }

  previousMonth() {
    const selectedDay = this.selectedDate.date();
    this.currentMonth = this.currentMonth.subtract(1, 'month');
    this.selectedDate = this.currentMonth.clone().date(selectedDay);
    this.monthChanged.emit(this.currentMonth);
    this.generateCalendar();
  }

  nextMonth() {
    const selectedDay = this.selectedDate.date();
    this.currentMonth = this.currentMonth.add(1, 'months');
    this.selectedDate = this.currentMonth.clone().date(selectedDay);
    this.monthChanged.emit(this.currentMonth);
    this.generateCalendar();
  }

  selectDate(day: number | null) {
    if (day) {
      this.selectedDate = this.currentMonth.clone().date(day);
      this.dateSelected.emit(this.selectedDate); // Emit the date to parent
    }
  }

  isSelected(day: number | null): boolean {
    return day
      ? this.selectedDate.isSame(this.currentMonth.clone().date(day), 'day')
      : false;
  }
}
