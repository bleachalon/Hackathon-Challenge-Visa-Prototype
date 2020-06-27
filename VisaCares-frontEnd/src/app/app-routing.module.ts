import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './HomePage/home/home.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './account/register/register.component';
import { SigninComponent } from './account/signin/signin.component';
import { TransactionsComponent } from './account/transactions/transactions.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'checkout/:price', component: CheckoutComponent},
  { path: 'account', component: AccountComponent},
  { path: 'sign-in', component: SigninComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'transactions', component: TransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
