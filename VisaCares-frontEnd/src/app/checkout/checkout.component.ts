import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckoutServices } from '../services/checkoutServices';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  donation: any;

  constructor(
    private formBuilder: FormBuilder,
    private checkoutServices: CheckoutServices
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.donation = this.formBuilder.group({
      name: '(optional)',
      organization: '',
      amount: '0'
    })
  }

  chooseAmount(event: any) {
    this.donation.value.amount = event.target.value;
    console.log(this.donation.value);
  } 

  submitDonation() {
    this.checkoutServices.postCheckoutInfo(this.donation.value);  
  }
}
