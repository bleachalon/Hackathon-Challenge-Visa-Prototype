import {Injectable} from '@angular/core';

@Injectable()
export class CheckoutServices {
    url="http://localhost:3000/";

    postCheckoutInfo(donation: any) {
        fetch( this.url + 'donate', {
            method: 'POST',
            body: JSON.stringify(donation),
            headers: { 'content-type': 'application/json' }
        })
    }

    sendEncrypt(payment: any) {
        console.log(payment);
        fetch(this.url + 'visaCheckout', {
            method: 'POST',
            body: JSON.stringify(payment),
            headers: { 'content-type': 'application/json' }
        }).then(res => { return res.json(); });
    }
}