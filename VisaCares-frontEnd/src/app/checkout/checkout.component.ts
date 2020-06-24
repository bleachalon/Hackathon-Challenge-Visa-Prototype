import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckoutServices } from '../services/checkoutServices';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationComponent } from '../navbar/confirmation/confirmation.component';



declare const V;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  donation: any;
  total: number;

  constructor(
    private formBuilder: FormBuilder,
    private checkoutServices: CheckoutServices,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadVisaJS();
    this.total = parseInt(this.route.snapshot.paramMap.get('price'));
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
      amount: 0
    })
  }

  chooseAmount(event: any) {
    this.donation.value.amount = event.target.value - this.total;
    console.log(this.donation.value);
  } 

  submitDonation() {
    this.checkoutServices.postCheckoutInfo(this.donation.value);  
  }

  confirmPayment(){
    if(this.donation.value.amount == 0) { alert('please enter an amount of none 0'); return; }

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: "You are about to DONATE!",
          amount: this.donation.value.amount
        }
    });
  
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult == true) { console.log('1'); this.onVisaCheckoutReady(); }
   });
  
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

  private sendEncrypt(payment) {
    const res = this.checkoutServices.sendEncrypt(payment);
    console.log(res);
    alert("payment success");
  }
}
