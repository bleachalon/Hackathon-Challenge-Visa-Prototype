import { Component, OnInit } from '@angular/core';
import { AccountServices } from 'src/app/services/accountServices';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: any;

  constructor(
    private accountService: AccountServices
  ) { }

  ngOnInit(): void {
    this.findAllTransactions();
  }

  private async findAllTransactions() {
    this.transactions = await this.accountService.getTransaction();
    console.log(this.transactions.data);
  }
}
