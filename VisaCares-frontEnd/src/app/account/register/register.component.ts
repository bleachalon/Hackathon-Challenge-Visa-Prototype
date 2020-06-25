import { Component, OnInit, Injector } from '@angular/core';
import {Location} from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountServices } from 'src/app/services/accountServices';
import { FormBuilder } from '@angular/forms';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user:any;

  constructor(
    // public dialogRef: MatDialogRef<RegisterComponent>,
    private accountSerivces: AccountServices,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private location: Location
  ) { 
  }

  ngOnInit(): void {
    this.userForm();
  }

  private userForm() {
    this.user = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  register() {
    this.accountSerivces.login = true;
    this.location.back();
    // this.dialogRef.close()
  }

  toLogin() {
    this.dialog.open(SigninComponent, {
      maxWidth: '600px'
    })
    // this.dialogRef.close();
  }
}
