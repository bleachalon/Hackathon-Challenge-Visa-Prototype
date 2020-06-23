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
}