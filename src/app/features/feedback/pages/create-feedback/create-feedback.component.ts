import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from '@features/feedback/services/feedback.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css'],
})
export class CreateFeedbackComponent {
  private readonly destroy$ = new Subject<void>();
  faPaperPlane = faPaperPlane;

  loading: boolean = true;
  feedbackForm!: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private fcToastService: FcToastService,
    private feedbackService: FeedbackService
  ) {
    this.layoutService.setSearchConfig({
      hide: true,
    });
    this.layoutService.setHeaderConfig({
      title: 'Feedback',
      icon: '',
      showHeader: true,
      showBackButton: true,
    });
    this.feedbackForm = new FormGroup({
      name: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),
      is_anonymous: new FormControl(false, Validators.required),
    });
  }

  ngOnInit(): void {
    this.layoutService.setSearchConfig({ hide: true });
  }

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit() {
    this.loading = true;
    let formValue = this.feedbackForm.value;
    let payload = {
      name: formValue.name,
      note: formValue.note,
      is_anonymous: formValue.is_anonymous,
    };

    this.feedbackService.addFeedback(payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.fcToastService.clear();
        this.fcToastService.add({
          severity: 'success',
          header: 'Success',
          message: 'Feedback added successfully',
        });
      },
      error: (err) => {
        this.loading = false;
        this.fcToastService.clear();
        this.fcToastService.add({
          severity: 'error',
          header: 'Error',
          message: err.message,
        });
      },
    });
  }
}
