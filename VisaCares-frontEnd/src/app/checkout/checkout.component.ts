import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckoutServices } from '../services/checkoutServices';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationComponent } from '../navbar/confirmation/confirmation.component';
import { AccountServices } from '../services/accountServices';



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
    private dialog: MatDialog,
    private accountServices: AccountServices
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
      amount: 0,
      date: ''
    })
  }

  chooseAmount(event: any) {
    this.donation.value.amount = event.target.value - this.total;
  }

  submitDonation() {
    this.checkoutServices.postCheckoutInfo(this.donation.value);
  }

  confirmPayment(){
    // var today = new Date();
    // console.log(String(today))
    if(this.donation.value.amount == 0) {
      this.dialog.open(ConfirmationComponent, {
        panelClass: 'myapp-no-padding-dialog',
        data: {
            message: "please enter an amount of none $0",
            type: 'danger'
          }
      });
      return; 
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: "You are about to donate $" + this.donation.value.amount + "?",
          hide: false
        }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult == true){
        this.onVisaCheckoutReady();
      }
    }); 
  }

  onVisaCheckoutReady(){
    V.init( {
    apikey: "96Y4RKXCVHAL5BSAHXOJ21WyORYdeyIXMRcWHAcHpHM6FnGdo",
    encryptionKey: "K24R68T3DGGXEDWEG2RH13Tum02nyd4RACu_8otiJs8Mcv4Ec",
    paymentRequest:{
      currencyCode: "USD",
      subtotal: this.donation.value.amount
    },
    dataLevel: "FULL"
    });
    V.on("payment.success", (payment) => this.sendEncrypt(payment));
    V.on("payment.cancel", (payment) => console.log(payment));
    V.on("payment.error", (payment) => console.log(payment));
   }

  finishedPayment(){
    const dialogRef = this.dialog.open(ConfirmationComponent, {
          panelClass: 'myapp-no-padding-dialog',
          maxWidth: "600px",
          data: {
              title: "Thank you",
              message: "Thank you for donating to charity",
              amount: this.donation.value.amount,
              type: 'primary',
              hide: true
            }
        });
  }

  private async sendEncrypt(payment) {
    try {
      var today = new Date();
      var res;
      res = await this.checkoutServices.sendEncrypt(payment);
      if (res.ok === true) {
        this.accountServices.postTransaction({amount: payment, date: String(today.getDate())});
        this.finishedPayment();
      }
    }
    catch(err) {
      alert(err);
    }
  }
}
