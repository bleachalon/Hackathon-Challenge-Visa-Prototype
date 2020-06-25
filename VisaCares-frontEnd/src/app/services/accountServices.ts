import { Injectable } from "@angular/core";

@Injectable()
export class AccountServices {

    login =  false;

    account: {
        username: '',
        password: '',
        transactions: []
    }


    url="http://localhost:3000/";

    signin(user) {
       return fetch(this.url + 'signin', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' }
        }).then( res => res);
    }

    register(user) {
        return fetch(this.url + 'register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' }
        }).then( res => res);
    }
}