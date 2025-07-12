import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { SharedModule } from '@shared/shared.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    FcInputTextModule,
  ],
})
export class UserProfileModule {}
