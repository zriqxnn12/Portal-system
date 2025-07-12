import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '@features/auth/services/auth.service';
import {
  faBars,
  faBell,
  faChevronDown,
  faChevronLeft,
  faCircleHalfStroke,
  faCircleNotch,
  faCog,
  faLineChart,
  faMoon,
  faPowerOff,
  faSearch,
  faSun,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { DarkModeService } from '@shared/services/dark-mode.service';
import { Subject, takeUntil } from 'rxjs';
import { HeaderConfig } from '../../interfaces/header-config.intercface';
import { LayoutService } from '../../services/layout.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private readonly destroy$ = new Subject<void>();

  faCircleNotch = faCircleNotch;
  faBars = faBars;
  faUser = faUser;
  faBell = faBell;
  faCircleHalfStroke = faCircleHalfStroke;
  faChevronDown = faChevronDown;
  faCog = faCog;
  faPowerOff = faPowerOff;
  faMoon = faMoon;
  faSun = faSun;
  faLineChart = faLineChart;
  faSearch = faSearch;
  faChevronLeft = faChevronLeft;

  darkMode: any;

  showThemes: boolean = false;
  showMenus: boolean = false;

  @Input() showSidebar: boolean = true;
  @Output() onToggleSidebar: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  headerConfig: HeaderConfig | null = null;
  searchConfig: any = {};

  menus: any = [];
  user: any = {
    id: 6,
    name: 'Muhammad Faishal',
    phone_no: '0822223334',
    address: 'Earth',
    email: 'tes3@folxcode.com',
    is_verified: false,
    created_at: '2023-05-24T05:02:34.000Z',
    updated_at: '2023-07-10T10:16:18.000Z',
    deleted_at: null,
    staff: {
      role_name: 'Accounting',
      id: 4,
      user_id: 6,
      note: 'nullable',
      role: 2,
      created_at: '2023-05-24T05:02:35.000Z',
      updated_at: '2023-05-29T13:50:57.000Z',
      deleted_at: null,
      business_units: [],
      teacher: null,
    },
  };
  notifications = [1, 2, 3, 4, 5];
  constructor(
    private layoutService: LayoutService,
    private darkModeService: DarkModeService,
    private router: Router,
    private authService: AuthService,
    private title: Title,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.menus = this.layoutService.getRoutes();
    this.layoutService.headerConfigSubject.subscribe((config: any) => {
      this.headerConfig = config;
      this.title.setTitle(config.title);
    });
    this.layoutService.searchConfigSubject.subscribe((config) => {
      this.searchConfig = config;
    });
    this.darkModeService.getDarkModeStatus
      .pipe(takeUntil(this.destroy$))
      .subscribe((darkMode) => {
        this.darkMode = darkMode;
      });
    this.authService.currentUserDataSubject.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  toggleSidebar() {
    this.onToggleSidebar.emit(!this.showSidebar);
  }
  onSearch() {
    this.layoutService.setSearchConfig({
      searchQuery: this.searchConfig.searchQuery,
    });
  }
  onSearchEnter() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      return this.router.navigate([this.searchConfig.baseHref], {
        queryParams: {
          page: 1,
          limit: 10,
          searchQuery: this.searchConfig.searchQuery,
        },
      });
    });
  }
  changeDarkMode(mode: string) {
    this.darkModeService.changeTo(mode);
  }
  logout() {
    this.authService.logout();
  }
  back() {
    this.location.back();
  }
}
