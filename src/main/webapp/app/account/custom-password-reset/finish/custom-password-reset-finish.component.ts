import { AfterViewInit, Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomPasswordResetFinishService } from './custom-password-reset-finish.service';
import { CustomLoginModalService } from 'app/core/login/custom-login-modal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-custom-password-reset-finish',
  templateUrl: './custom-password-reset-finish.component.html',
  styleUrls: ['./custom-password-reset-finish.scss']
})
export class CustomPasswordResetFinishComponent implements OnInit, AfterViewInit {
  doNotMatch: string;
  error: string;
  keyMissing: boolean;
  success: string;
  modalRef: NgbModalRef;
  key: string;

  passwordForm = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
  });

  constructor(
    private customPasswordResetFinishService: CustomPasswordResetFinishService,
    private customLoginModalServce: CustomLoginModalService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.key = params['key'];
    });
    this.keyMissing = !this.key;
  }

  ngAfterViewInit() {
    if (this.elementRef.nativeElement.querySelector('#password') != null) {
      this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#password'), 'focus', []);
    }
  }

  finishReset() {
    this.doNotMatch = null;
    this.error = null;
    const password = this.passwordForm.get(['newPassword']).value;
    const confirmPassword = this.passwordForm.get(['confirmPassword']).value;
    if (password !== confirmPassword) {
      this.doNotMatch = 'ERROR';
    } else {
      this.customPasswordResetFinishService.save({ key: this.key, newPassword: password }).subscribe(
        () => {
          this.success = 'OK';
        },
        () => {
          this.success = null;
          this.error = 'ERROR';
        }
      );
    }
  }

  login() {
    this.modalRef = this.customLoginModalServce.open();
  }
}
