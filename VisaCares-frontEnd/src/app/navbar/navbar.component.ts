import { Component, OnInit } from '@angular/core';
import { AccountServices } from '../services/accountServices';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from '../account/signin/signin.component';
import { RegisterComponent } from '../account/register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private accountServices: AccountServices,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if(this.accountServices.login == false) { this.openLogin(); }
  }

  openLogin() {
    const dialogRef = this.dialog.open(SigninComponent, {
      maxWidth: '600px'
    });
  }

  openRegister() {
    this.dialog.open(RegisterComponent, {
      maxWidth: '600px'
    })
  }
}
