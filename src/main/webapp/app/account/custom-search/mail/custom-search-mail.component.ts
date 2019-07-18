import { AfterViewInit, Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { CustomSearchMailService } from 'app/account/custom-search/mail/custom-search-mail.service';
import { FormBuilder, Validators } from '@angular/forms';
import { EMAIL_NOT_FOUND_TYPE } from 'app/shared';

@Component({
  selector: 'jhi-custom-search',
  templateUrl: './custom-search-mail.component.html',
  styleUrls: ['./custom-search-mail.scss']
})
export class CustomSearchMailComponent implements AfterViewInit {
  error: string;
  errorEmailNotExists: string;
  success: string;
  searchRequestForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.email]]
  });

  constructor(
    private customSearchService: CustomSearchMailService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private fb: FormBuilder
  ) {}

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#email'), 'focus', []);
  }

  requestReset() {
    this.error = null;
    this.errorEmailNotExists = null;

    this.customSearchService.save(this.searchRequestForm.get(['email']).value).subscribe(
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
