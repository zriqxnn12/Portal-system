import { Component } from '@angular/core';
import { AuthService } from '@features/auth/services/auth.service';
import { User } from '@features/user-profile/interfaces/user-profile';
import {
  faArrowLeft,
  faArrowRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

type MenuItem = {
  title: string;
  icon: string;
  is_only_for_student: boolean;
  link: string;
};
@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css'],
})
export class MenuPageComponent {
  // Icons
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faSpinner = faSpinner;

  private readonly destroy$ = new Subject<void>();

  user: User = {} as User;

  menuNavigation: MenuItem[] = [
    {
      title: 'Account',
      icon: 'assets/images/icon/user-profile.png',
      is_only_for_student: false,
      link: '/user-profile',
    },
    {
      title: 'Course',
      icon: 'assets/images/icon/course.png',
      is_only_for_student: false,
      link: '/course-schedule',
    },
    {
      title: 'Payment',
      icon: 'assets/images/icon/payment.png',
      is_only_for_student: true,
      link: '/service-invoice',
    },
    {
      title: 'Event',
      icon: 'assets/images/icon/event.png',
      is_only_for_student: false,
      link: '/event',
    },
    {
      title: 'Feedback',
      icon: 'assets/images/icon/feedback.png',
      is_only_for_student: true,
      link: '/feedback',
    },
  ];

  filteredMenuNavigation: MenuItem[] = [];

  constructor(
    private layoutService: LayoutService,
    private authService: AuthService
  ) {
    this.layoutService.setSearchConfig({
      hide: true,
    });
    // User
    this.authService.getCurrentUserData.subscribe((user) => {
      this.user = user;
      let isStudent = !!user.student;

      this.filteredMenuNavigation = this.menuNavigation.filter(
        (menu) => !menu.is_only_for_student || isStudent
      );
    });
  }
}
