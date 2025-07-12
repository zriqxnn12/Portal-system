import { Component } from '@angular/core';
import {
  faArrowLeft,
  faArrowRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

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

  menuNavigation = [
    {
      title: 'Account',
      icon: 'assets/images/icon/user-profile.png',
      is_only_for_teacher: false,
      link: '/user-profile',
    },
  ];

  constructor(private layoutService: LayoutService) {
    this.layoutService.setSearchConfig({
      hide: true,
    });
  }
}
