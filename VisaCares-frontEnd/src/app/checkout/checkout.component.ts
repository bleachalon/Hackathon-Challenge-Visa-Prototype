import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckoutServices } from '../services/checkoutServices';

declare const V;

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
    this.loadVisaJS();
  }

  private loadVisaJS() {
    var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", "https://sandbox-assets.secure.checkout.visa.com/checkout-widget/resources/js/integration/v1/sdk.js");
		document.getElementsByTagName("head")[0].appendChild(script);
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


  onVisaCheckoutReady(){
    V.init( {
    apikey: "96Y4RKXCVHAL5BSAHXOJ21WyORYdeyIXMRcWHAcHpHM6FnGdo",
    encryptionKey: "K24R68T3DGGXEDWEG2RH13Tum02nyd4RACu_8otiJs8Mcv4Ec",
    paymentRequest:{
      currencyCode: "USD",
      subtotal: this.donation.value.amount
    }
    });
    V.on("payment.success", (payment) => this.sendEncrypt(payment));
    V.on("payment.cancel", (payment) => console.log(payment));
    V.on("payment.error", (payment) => console.log(payment));
    }

  private async sendEncrypt(payment) {
    try {
      var res;
      res = await this.checkoutServices.sendEncrypt(payment);
      console.log(res);
      if (res.ok === true) {
        alert("Payment Success!");
        console.log(res.json());
      }
    }
    catch(err) {
      alert(err);
    }
  }
}
