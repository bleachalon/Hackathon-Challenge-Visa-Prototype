import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutServices } from './services/checkoutServices';
import { HomeComponent } from './HomePage/home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationComponent } from './navbar/confirmation/confirmation.component';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountComponent } from './account/account.component';
import { SigninComponent } from './account/signin/signin.component';
import { RegisterComponent } from './account/register/register.component';
import { AccountServices } from './services/accountServices';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CheckoutComponent,
    HomeComponent,
    HomepageComponent,
    ConfirmationComponent,
    AccountComponent,
    SigninComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [
    CheckoutServices,
    AccountServices,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
