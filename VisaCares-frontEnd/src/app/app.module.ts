import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutServices } from './services/checkoutServices';
import { HomeComponent } from './HomePage/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CheckoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    CheckoutServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
