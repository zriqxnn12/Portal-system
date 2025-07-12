import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SettingService } from '@features/setting/services/setting.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  isShowSidebar: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar(showBarStatus: boolean) {
    this.isShowSidebar = showBarStatus;
  }
}
