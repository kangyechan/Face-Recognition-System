import { Component, OnInit } from '@angular/core';
import { AccountService, JhiLanguageHelper } from 'app/core';
import { FormBuilder } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

@Component({
  selector: 'jhi-custom-settings',
  templateUrl: './custom-settings.component.html',
  styleUrls: ['./custom-settings.scss']
})
export class CustomSettingsComponent implements OnInit {
  error: string;
  success: string;
  languages: any[];

  firstName: string;
  lastName: string;
  email: string;
  activated: boolean;
  authorities: [];
  langKey: 'en';
  login: string;
  imageUrl: string;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private languageService: JhiLanguageService,
    private languageHelper: JhiLanguageHelper
  ) {}

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.updateForm(account);
    });
    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });
  }

  save() {
    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.email);
    console.log(this.activated);
    console.log(this.authorities);
    console.log(this.langKey);
    console.log(this.login);
    console.log(this.imageUrl);

    const settingsAccount = this.accountFromNgModel();
    this.accountService.save(settingsAccount).subscribe(
      () => {
        this.error = null;
        this.success = 'OK';
        this.accountService.identity(true).then(account => {
          this.updateForm(account);
        });
        this.languageService.getCurrent().then(current => {
          if (settingsAccount.langKey !== current) {
            this.languageService.changeLanguage(settingsAccount.langKey);
          }
        });
      },
      () => {
        this.success = null;
        this.error = 'ERROR';
      }
    );
  }

  private accountFromNgModel(): any {
    const account = {};
    return {
      ...account,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      activated: this.activated,
      authorities: this.authorities,
      langKey: this.langKey,
      login: this.login,
      imageUrl: this.imageUrl
    };
  }

  updateForm(account: any): void {
    this.firstName = account.firstName;
    this.lastName = account.lastName;
    this.email = account.email;
    this.activated = account.activated;
    this.authorities = account.authorities;
    this.langKey = account.langKey;
    this.login = account.login;
    this.imageUrl = account.imageUrl;

    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.email);
    console.log(this.activated);
    console.log(this.authorities);
    console.log(this.langKey);
    console.log(this.login);
    console.log(this.imageUrl);
  }
}
