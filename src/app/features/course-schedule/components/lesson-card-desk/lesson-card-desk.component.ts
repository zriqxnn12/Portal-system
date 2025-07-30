import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseScheduleService } from '@features/course-schedule/services/course-schedule.service';
import { FcConfirmService } from '@shared/components/fc-confirm/fc-confirm.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AttendanceFormDialogComponent } from '../attendance-form-dialog/attendance-form-dialog.component';

@Component({
  selector: 'app-lesson-card-desk',
  templateUrl: './lesson-card-desk.component.html',
  styleUrls: ['./lesson-card-desk.component.css'],
})
export class LessonCardDeskComponent {
  @Input() lesson: any;
  @Input() user: any;
  @Output() scheduleUpdated = new EventEmitter<{
    id: number;
    newStatus: number;
  }>();

  constructor(
    private fcConfirmService: FcConfirmService,
    private fcToastService: FcToastService,
    private router: Router,
    private dialogService: DialogService,
    private courseScheduleService: CourseScheduleService
  ) {}

  getStatusColor(status: number): string {
    switch (status) {
      case 0: //Scheduled
        return 'bg-blue-gray';
      case 1: // On progress
        return 'bg-blue-600';
      case 2: // rescheduled
        return 'bg-orange-500';
      case 3: // completed
        return 'bg-green-500';
      case 4: // absent
        return 'bg-red-700';
      default:
        return '';
    }
  }

  clickForId(lessonId: number) {
    console.log('id:', lessonId);
  }

  setScheduleAsOnProgress(lessonId: number) {
    this.fcConfirmService.open({
      header: 'Confirmation',
      message: 'Are you sure you want to generate this as On Progress?',
      accept: () => {
        this.courseScheduleService.generateToOnprogress(lessonId).subscribe({
          next: (res: any) => {
            this.fcToastService.add({
              severity: 'success',
              header: 'Request success',
              message: res.message,
            });
            this.scheduleUpdated.emit({ id: lessonId, newStatus: 1 });
          },
          error: (err) => {
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

  openAttendanceForm(lesson: any) {
    const ref = this.dialogService.open(AttendanceFormDialogComponent, {
      data: {
        title: 'Lesson Attendance',
        lessonId: lesson,
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
    ref.onClose.subscribe((attendance) => {
      if (attendance) {
        const attendanceStatus = attendance.status;
        let newStatus: number;

        if (attendanceStatus === 0 || attendanceStatus === 1) {
          newStatus = 3; // Present atau Late → Completed
        } else if (attendanceStatus === 2) {
          newStatus = 4; // Absent
        } else {
          return;
        }

        this.scheduleUpdated.emit({ id: lesson, newStatus });
      }
    });
  }
}
