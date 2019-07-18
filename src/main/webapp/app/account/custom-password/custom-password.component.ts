import { Component, OnInit } from '@angular/core';
import { CustomPasswordService } from './custom-password.service';
import { AccountService } from 'app/core';

@Component({
  selector: 'jhi-custom-password',
  templateUrl: './custom-password.component.html',
  styleUrls: ['./custom-password.scss']
})
export class CustomPasswordComponent implements OnInit {
  doNotMatch: string;
  error: string;
  success: string;
  account: any;

  currentPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(private customPasswordService: CustomPasswordService, private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.account = account;
    });
  }

  changePassword() {
    const newPassword = this.newPassword;
    if (newPassword !== this.confirmPassword) {
      this.error = null;
      this.success = null;
      this.doNotMatch = 'ERROR';
    } else {
      this.doNotMatch = null;
      this.customPasswordService.save(newPassword, this.currentPassword).subscribe(
        () => {
          this.error = null;
          this.success = 'OK';
        },
        () => {
          this.success = null;
          this.error = 'ERROR';
        }
      );
    }
  }
}
