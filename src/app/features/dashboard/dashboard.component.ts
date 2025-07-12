import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private readonly destroy$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private layoutService: LayoutService,
    private router: Router
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Liszthoven Portal',
      icon: '',
      showHeader: false,
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/'], { skipLocationChange: true }).then(() =>
        this.router.navigate(['/dashboard/menu'], {
          replaceUrl: true,
        })
      );
    }
  }

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.layoutService.setSearchConfig({
      hide: false,
    });
  }
}
