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
       return fetch(this.url + 'uservalidate', {
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

    postTransaction(tran) {
        fetch(this.url + 'transactions/insert', {
            method: 'POST',
            body: JSON.stringify(tran),
            headers: { 'content-type': 'application/json' }
            }).then( res => res);
    }

    getTransaction() {
        return fetch(this.url + 'transactions').then(res => res.json());
    }

}