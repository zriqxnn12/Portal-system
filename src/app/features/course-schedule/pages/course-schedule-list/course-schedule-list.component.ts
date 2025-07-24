import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-course-schedule-list',
  templateUrl: './course-schedule-list.component.html',
  styleUrls: ['./course-schedule-list.component.css'],
})
export class CourseScheduleListComponent {
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private fcToastService: FcToastService
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
  }
}
