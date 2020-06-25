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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CheckoutComponent,
    HomeComponent
    HomepageComponent,
    ConfirmationComponent
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
    CheckoutServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
