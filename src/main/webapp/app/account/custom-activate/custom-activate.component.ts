import { Component, OnInit } from '@angular/core';
import { CustomLoginModalService } from 'app/core/login/custom-login-modal.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomActivateService } from 'app/account/custom-activate/custom-activate.service';

@Component({
  selector: 'jhi-custom-activate',
  templateUrl: './custom-activate.component.html',
  styleUrls: ['./custom-activate.scss']
})
export class CustomActivateComponent implements OnInit {
  error: string;
  success: string;
  modalRef: NgbModalRef;

  constructor(
    private customActivateService: CustomActivateService,
    private customLoginModalService: CustomLoginModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.customActivateService.get(params['key']).subscribe(
        () => {
          this.error = null;
          this.success = 'OK';
        },
        () => {
          this.success = null;
          this.error = 'ERROR';
        }
      );
    });
  }

  login() {
    this.modalRef = this.customLoginModalService.open();
  }
}
