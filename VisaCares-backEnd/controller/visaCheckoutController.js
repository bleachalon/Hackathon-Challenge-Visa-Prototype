const crypto = require('crypto');
const fs = require("fs");

const jsonData = JSON.parse(fs.readFileSync("./sandboxAPI/certValues.json"));
const keyFile = fs.readFileSync(jsonData.keyFile);
const certificateFile = fs.readFileSync(jsonData.certificateFile);
const caFile = fs.readFileSync(jsonData.caFile);
const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Basic " +
        new Buffer(jsonData.userId + ":" + jsonData.password).toString("base64"),
};
const request = require("request");
module.exports = function (app) {


    function decryptPayload(key, wrappedKey, payload) {
        let decryptedKey = decrypt(wrappedKey, key);
        let decryptedMsg = decrypt(payload, decryptedKey);
        return decryptedMsg.toString('utf8');
    }

    function decrypt(encrypted, key) {
        let encryptedBuffer = Buffer.from(encrypted, 'base64');
        // TODO: Check that data(encryptedBuffer) is at least bigger // than HMAC + IV length , i.e. 48 bytes
        let hmac = Buffer.alloc(32);
        let iv = Buffer.alloc(16);
        encryptedBuffer.copy(hmac, 0, 0, 32);
        encryptedBuffer.copy(iv, 0, 32, 48);
        let data = Buffer.from(encryptedBuffer).slice(48);
        var hash = crypto.createHmac('SHA256', key).update(Buffer.concat([iv, data])).digest();
        if (!hmac.equals(hash)) {
            // TODO: Handle HMAC validation failure
            return '';
        }
        let decipher = crypto.createDecipheriv('aes-256-cbc', crypto.createHash('sha256').update(key).digest(), iv);
        let decryptedData = Buffer.concat([decipher.update(data), decipher.final()]);
        return decryptedData;
    }

    app.post("/visaCheckout", async function (req, res) {

        console.log("visaCheckout");

        var decryptedUser = decryptPayload("6UJUSKhXojn2kVJNVtIcodi0WzPdZLZUMNtfw$Lg", req.body.encKey, req.body.encPaymentData);
        //console.log(res.json(decryptedUser));

        console.log(decryptedUser);

        /*-----------------

        Put Visa Direct call into here^^^
        The "decryptedUser" variable is a json with all the necessary info so just parse and make
        the pull/push call

        ------------------*/
        var donatorData = {};
        var transactionData = {};

        /*
        decryptedUser payload will populate donatorData

        donatorData["acquirerCountryCode"] = decryptedUser.paymentInstrument.billingAddress.countryCode;
        donatorData["acquiringBin"] = decryptedUser.paymentInstrument.binSixDigits;
        donatorData["amount"] = decryptedUser.paymentRequest.subtotal;
        donatorData["businessApplicationId"] = "AA";
        donatorData["cardAcceptor"]["address"]["country"] = decryptedUser.paymentInstrument.billingAddress.countryCode;
        donatorData["cardAcceptor"]["address"]["county"] = "";//lack of data;
        donatorData["cardAcceptor"]["address"]["state"] = decryptedUser.paymentInstrument.billingAddress.stateProvinceCode;
        donatorData["cardAcceptor"]["address"]["zipCode"] = decryptedUser.paymentInstrument.billingAddress.postalCode;
        donatorData["cardAcceptor"]["idCode"] = "";
        donatorData["cardAcceptor"]["name"] = decryptedUser.paymentInstrument.billingAddress.personName;
        donatorData["cardAcceptor"]["terminalId"]= "";
        donatorData["senderPrimaryAccountNumber"] = decryptedUser.paymentInstrument.billingAddress.id;
        donatorData["senderCurrencyCode"] = "USD";
        donatorData["senderCardExpiryDate"] = decryptedUser.expirationDate.Year + "-" + decryptedUser.expirationDate.Year;
        donatorData["addressVerificationData"]["street"] = decryptedUser.paymentInstrument.billingAddress.line1;
        donatorData["addressVerificationData"]["postalCode"]= decryptedUser.paymentInstrument.billingAddress.postalCode;

        rest of data can be pre populated
        */

        let res1 = await pushFunds(donatorData);
        console.log("pushFunds", res1);

        /*
        res1 and decryptedUser payload will populate transactionData

        transactionData["acquirerCountryCode"] = decryptedUser.paymentInstrument.billingAddress.countryCode;
        transactionData["acquiringBin"] = decryptedUser.paymentInstrument.binSixDigits;
        transactionData["amount"] = decryptedUser.paymentRequest.subtotal;
        transactionData["businessApplicationId"] = "AA";
        transactionData["cardAcceptor"]["address"]["country"] = donator data from db
        transactionData["cardAcceptor"]["address"]["county"] = donator data from db
        transactionData["cardAcceptor"]["address"]["state"] = donator data from db
        transactionData["cardAcceptor"]["address"]["zipCode"] = donator data from db
        transactionData["recipientName"]= donator data from db
        transactionData["recipientPrimaryAccountNumber"]= donator data from db
        transactionData["retrievalReferenceNumber"]= res1.transactionIndentifier
        transactionData["senderAccountNumber"] = donator data from db
        transactionData["senderCity"] = donator data from db
        transactionData["senderCountryCode"] = donator data from db
        transactionData["senderName"] = donator data from db
        transactionData["senderReference"] = donator data from db
        transactionData["senderStateCode"] = donator data from db

        rest of data can be pre populated
        */

        let res2 = await pullFunds(transactionData);
        console.log("pullFunds", res2);

        res.json(decryptedUser);
        res.status("success");
    });

    function pushFunds(transactionData) {
        return new Promise(function (resolve, reject) {
            request.post({
                    url: "https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pushfundstransactions",
                    key: keyFile,
                    cert: certificateFile,
                    ca: caFile,
                    headers: headers,
                    json: data1,
                },
                function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        resolve(body);
                    } else {
                        console.log("push error is ", error);
                        reject(error);
                    }
                }
            );
        });
    }

    function pullFunds(donatorData) {
        return new Promise(function (resolve, reject) {
            request.post({
                    uri: "https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pullfundstransactions",
                    key: keyFile,
                    cert: certificateFile,
                    ca: caFile,
                    headers: headers,
                    json: data2,
                },
                function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        resolve(body);
                    } else {
                        console.log("pullFunds error is ", error);

                        reject(error);
                    }
                }
            );
        });
    }

}

var data1 = {
    "acquirerCountryCode": "840",
    "acquiringBin": "408999",
    "amount": "124.05",
    "businessApplicationId": "AA",
    "cardAcceptor": {
        "address": {
            "country": "USA",
            "county": "San Mateo",
            "state": "CA",
            "zipCode": "94404"
        },
        "idCode": "CA-IDCode-77765",
        "name": "Visa Inc. USA-Foster City",
        "terminalId": "TID-9999"
    },
    "localTransactionDateTime": "2020-06-29T15:06:17",
    "merchantCategoryCode": "6012",
    "pointOfServiceData": {
        "motoECIIndicator": "0",
        "panEntryMode": "90",
        "posConditionCode": "00"
    },
    "recipientName": "rohan",
    "recipientPrimaryAccountNumber": "4957030420210496",
    "retrievalReferenceNumber": "412770451018",
    "senderAccountNumber": "4653459515756154",
    "senderAddress": "901 Metro Center Blvd",
    "senderCity": "Foster City",
    "senderCountryCode": "124",
    "senderName": "Mohammed Qasim",
    "senderReference": "",
    "senderStateCode": "CA",
    "sourceOfFundsCode": "05",
    "systemsTraceAuditNumber": "451018",
    "transactionCurrencyCode": "USD",
    "transactionIdentifier": "381228649430015",
    "settlementServiceIndicator": "9",
    "colombiaNationalServiceData": {
        "countryCodeNationalService": "170",
        "nationalReimbursementFee": "20.00",
        "nationalNetMiscAmountType": "A",
        "nationalNetReimbursementFeeBaseAmount": "20.00",
        "nationalNetMiscAmount": "10.00",
        "addValueTaxReturn": "10.00",
        "taxAmountConsumption": "10.00",
        "addValueTaxAmount": "10.00",
        "costTransactionIndicator": "0",
        "emvTransactionIndicator": "1",
        "nationalChargebackReason": "11"
    }
};
var data2 = {
    "acquirerCountryCode": "840",
    "acquiringBin": "408999",
    "amount": "124.02",
    "businessApplicationId": "AA",
    "cardAcceptor": {
        "address": {
            "country": "USA",
            "county": "081",
            "state": "CA",
            "zipCode": "94404"
        },
        "idCode": "ABCD1234ABCD123",
        "name": "Visa Inc. USA-Foster City",
        "terminalId": "ABCD1234"
    },
    "cavv": "0700100038238906000013405823891061668252",
    "foreignExchangeFeeTransaction": "11.99",
    "localTransactionDateTime": "2020-06-29T15:06:17",
    "retrievalReferenceNumber": "330000550000",
    "senderCardExpiryDate": "2015-10",
    "senderCurrencyCode": "USD",
    "senderPrimaryAccountNumber": "4895142232120006",
    "surcharge": "11.99",
    "systemsTraceAuditNumber": "451001",
    "nationalReimbursementFee": "11.22",
    "cpsAuthorizationCharacteristicsIndicator": "Y",
    "addressVerificationData": {
        "street": "XYZ St",
        "postalCode": "12345"
    },
    "settlementServiceIndicator": "9",
    "colombiaNationalServiceData": {
        "countryCodeNationalService": "170",
        "nationalReimbursementFee": "20.00",
        "nationalNetMiscAmountType": "A",
        "nationalNetReimbursementFeeBaseAmount": "20.00",
        "nationalNetMiscAmount": "10.00",
        "addValueTaxReturn": "10.00",
        "taxAmountConsumption": "10.00",
        "addValueTaxAmount": "10.00",
        "costTransactionIndicator": "0",
        "emvTransactionIndicator": "1",
        "nationalChargebackReason": "11"
    },
    "riskAssessmentData": {
        "delegatedAuthenticationIndicator": true,
        "lowValueExemptionIndicator": true,
        "traExemptionIndicator": true,
        "trustedMerchantExemptionIndicator": true,
        "scpExemptionIndicator": true
    },
    "visaMerchantIdentifier": "73625198"
};