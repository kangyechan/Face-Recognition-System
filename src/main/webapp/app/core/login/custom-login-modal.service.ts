import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomLoginComponent } from 'app/shared/custom-login/custom-login.component';

@Injectable({ providedIn: 'root' })
export class CustomLoginModalService {
  private isOpen = false;
  constructor(private modalService: NgbModal) {}

  open(): NgbModalRef {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef = this.modalService.open(CustomLoginComponent);
    modalRef.result.then(
      result => {
        this.isOpen = false;
      },
      reson => {
        this.isOpen = false;
      }
    );
    return modalRef;
  }
}
