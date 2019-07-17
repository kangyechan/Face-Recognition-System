import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomSearchService } from 'app/account/custom-search/custom-search.service';
import { CustomLoginModalService } from 'app/core/login/custom-login-modal.service';
import { customSearchRoute } from 'app/account/custom-search/custom-seach.route';

@Component({
  selector: 'jhi-custom-search',
  templateUrl: './custom-search.component.html',
  styleUrls: ['./custom-search.scss']
})
export class CustomSearchComponent implements OnInit {
  error: string;
  success: string;
  modalRef: NgbModalRef;

  constructor(private customSearchService: CustomSearchService, private customLoginModalService: CustomLoginModalService) {}

  ngOnInit() {}
}
