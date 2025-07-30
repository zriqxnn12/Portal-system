import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseScheduleService } from '@features/course-schedule/services/course-schedule.service';
import {
  faChevronDown,
  faCloudArrowUp,
  faFile,
  faPencil,
  faPlus,
  faSpinner,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-attendance-form-dialog',
  templateUrl: './attendance-form-dialog.component.html',
  styleUrls: ['./attendance-form-dialog.component.css'],
})
export class AttendanceFormDialogComponent {
  private readonly destroy$: any = new Subject();
  // Icons
  faTimes = faTimes;
  faChevronDown = faChevronDown;
  faPlus = faPlus;
  faPencil = faPencil;
  faTrash = faTrash;
  faCloudArrowUp = faCloudArrowUp;
  faFile = faFile;
  faSpinner = faSpinner;

  loading = false;
  lessonId!: number;
  title = '';
  attendanceForm!: FormGroup;
  attendanceOptions = [
    {
      id: 0,
      name: 'Present',
    },
    {
      id: 1,
      name: 'Late',
    },
    {
      id: 2,
      name: 'Absent',
    },
  ];

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

    this.attendanceForm = new FormGroup({
      file_path: new FormControl(null, Validators.required),
      note: new FormControl('', Validators.required),
      status: new FormControl(0, Validators.required),
    });
  }

  addImage(image: any) {
    this.attendanceForm.controls['file_path'].setValue(image);
  }

  removeImage() {
    this.attendanceForm.controls['file_path'].setValue(null);
  }

  getImageFullUrl(filePath: string): string {
    if (!filePath) return '';
    // sesuaikan base url ini dengan URL API-mu atau public URL penyimpanan file
    return `https://practice1337.s3.ap-southeast-1.amazonaws.com/${filePath}`;
  }

  onClose() {
    this.ref.close();
  }

  submit() {
    this.loading = true;
    let fd = new FormData();
    let attendance = this.attendanceForm.value;
    // Ambil hanya file-nya, bukan objek preview
    const fileObj = this.attendanceForm.value.file_path;
    const file = fileObj?.file;
    fd.append(`file_path`, file);
    fd.append(`note`, attendance.note);
    fd.append(`status`, attendance.status);

    this.courseScheduleService.addAttendance(this.lessonId, fd).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.fcToastService.add({
          severity: 'success',
          header: 'Attendance Lesson',
          message: 'Student attendance successfully filled',
        });
        this.ref.close({ status: attendance.status });
      },
      error: (err) => {
        this.loading = false;
        this.fcToastService.add({
          severity: 'error',
          header: 'Attendance Lesson',
          message: err.message,
        });
      },
    });
  }
}
