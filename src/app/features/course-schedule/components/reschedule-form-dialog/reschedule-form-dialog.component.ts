import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseScheduleService } from '@features/course-schedule/services/course-schedule.service';
import {
  faChevronDown,
  faPlus,
  faSpinner,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reschedule-form-dialog',
  templateUrl: './reschedule-form-dialog.component.html',
  styleUrls: ['./reschedule-form-dialog.component.css'],
})
export class RescheduleFormDialogComponent {
  private readonly destroy$: any = new Subject();
  // Icons
  faTimes = faTimes;
  faChevronDown = faChevronDown;
  faPlus = faPlus;
  faSpinner = faSpinner;

  loading = false;
  title = '';
  lessonId!: number;
  rescheduleForm!: FormGroup;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private courseScheduleService: CourseScheduleService,
    private fcToastService: FcToastService
  ) {
    if (this.config.data.title) {
      this.title = this.config.data.title;
    }

    if (this.config.data.lessonId) {
      this.lessonId = this.config.data.lessonId;
    }

    this.rescheduleForm = new FormGroup({
      date: new FormControl(new Date(), Validators.required),
      start_time: new FormControl('', Validators.required),
      end_time: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),
    });
  }

  onClose() {
    this.ref.close();
  }

  submit() {
    this.loading = true;
    let reschedule = this.rescheduleForm.value;

    const formattedDate = moment(reschedule.date).format('YYYY-MM-DD');

    reschedule.start_time = moment()
      .startOf('day')
      .add(moment().utcOffset(), 'minutes')
      .add(reschedule.start_time, 'minutes')
      .format('HH:mm');

    reschedule.end_time = moment()
      .startOf('day')
      .add(moment().utcOffset(), 'minutes')
      .add(reschedule.end_time, 'minutes')
      .format('HH:mm');

    let payload = {
      date: formattedDate,
      start_time: reschedule.start_time,
      end_time: reschedule.end_time,
      note: reschedule.note,
    };

    this.courseScheduleService
      .addCourseReschedule(this.lessonId, payload)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.fcToastService.add({
            severity: 'success',
            header: 'Success',
            message: 'Course Rescheduled',
          });
          this.ref.close(res.data);
        },
        error: (err) => {
          this.loading = false;
          this.fcToastService.add({
            severity: 'error',
            header: 'Course Reschedule',
            message: err.message,
          });
        },
      });
  }
}
