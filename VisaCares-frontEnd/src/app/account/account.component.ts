import { Component, OnInit } from '@angular/core';
import { AccountServices } from '../services/accountServices';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private accountService: AccountServices
  ) { }

  ngOnInit(): void {
  }

  getTaxForm() {
    this.accountService.getTaxForm();
  }
}
