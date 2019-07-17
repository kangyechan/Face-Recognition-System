import { AfterViewInit, Component, ElementRef, Renderer } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomPasswordResetInitService } from './custom-password-reset-init.service';
import { EMAIL_NOT_FOUND_TYPE } from 'app/shared';

@Component({
  selector: 'jhi-custom-password-reset-init',
  templateUrl: './custom-password-reset-init.component.html',
  styleUrls: ['./custom-password-reset-init.scss']
})
export class CustomPasswordResetInitComponent implements AfterViewInit {
  error: string;
  errorEmailNotExists: string;
  success: string;
  resetRequestForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.email]]
  });

  constructor(
    private customPasswordResetInitService: CustomPasswordResetInitService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private fb: FormBuilder
  ) {}

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySeletor('#email'), 'focus', []);
  }

  requestReset() {
    this.error = null;
    this.errorEmailNotExists = null;

    this.customPasswordResetInitService.save(this.resetRequestForm.get(['email']).value).subscribe(
      () => {
        this.success = 'OK';
      },
      response => {
        this.success = null;
        if (response.status === 400 && response.error.type === EMAIL_NOT_FOUND_TYPE) {
          this.errorEmailNotExists = 'ERROR';
        } else {
          this.error = 'ERROR';
        }
      }
    );
  }
}
