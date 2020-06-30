import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountServices } from 'src/app/services/accountServices';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  user:any;

  constructor(
    public dialogRef: MatDialogRef<SigninComponent>,
    private accountSerivces: AccountServices,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm();
  }

  userForm() {
    this.user = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  toRegister() {
    // this.dialog.open(RegisterComponent, {
    //   maxWidth: '600px'
    // })
    this.router.navigate(['/register']);
    this.dialogRef.close();
  }

  signin() {
    this.accountSerivces.signin(this.user.value);
    this.dialogRef.close();
  }
}
