import { AfterViewInit, Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';
import { Register } from 'app/account';
import { CustomLoginModalService } from 'app/core/login/custom-login-modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';

@Component({
  selector: 'jhi-custom-register',
  templateUrl: './custom-register.component.html',
  styleUrls: ['./custom-register.scss']
})
export class CustomRegisterComponent implements OnInit, AfterViewInit {
  doNotMatch: string;
  error: string;
  errorEmailExists: string;
  errorUserExists: string;
  success: boolean;
  modalRef: NgbModalRef;

  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    email: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
  });

  constructor(
    private languageService: JhiLanguageService,
    private customLoginModalService: CustomLoginModalService,
    private registerService: Register,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.success = false;
  }

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
  }

  register() {
    let registerAccount = {};
    const login = this.registerForm.get(['login']).value;
    const email = this.registerForm.get(['email']).value;
    const password = this.registerForm.get(['password']).value;
    if (password !== this.registerForm.get(['confirmPassword']).value) {
      this.doNotMatch = 'ERROR';
    } else {
      registerAccount = { ...registerAccount, login, email, password };
      this.doNotMatch = null;
      this.error = null;
      this.errorUserExists = null;
      this.errorEmailExists = null;
      this.languageService.getCurrent().then(langKey => {
        this.registerService.save(registerAccount).subscribe(
          () => {
            this.success = true;
          },
          response => this.processError(response)
        );
      });
    }
  }

  openLogin() {
    this.modalRef = this.customLoginModalService.open();
  }

  private processError(response: HttpErrorResponse) {
    this.success = null;
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = 'ERROR';
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = 'ERROR';
    } else {
      this.error = 'ERROR';
    }
  }
}
