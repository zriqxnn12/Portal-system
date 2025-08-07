import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/services/layout.service';
import { UserProfileService } from './services/user-profile.service';
import { User } from './interfaces/user-profile';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  user: User = {} as User;
  accountForm!: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private userProfileService: UserProfileService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Account Profile',
      icon: '',
      showHeader: true,
      showBackButton: true,
    });
    this.accountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone_no: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      birth_place: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userProfileService.getUserProfile().subscribe((res: any) => {
      this.user = res.data;
      this.accountForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone_no: this.user.phone_no,
        address: this.user.address,
        birth_place: this.user.birth_place,
      });
    });
  }
}
