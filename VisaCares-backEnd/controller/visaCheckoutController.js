const crypto = require('crypto');


module.exports = function (app) {

    async function visaCheckoutProcess(req, res) {
        try {

        } catch (err) {

        }

    }

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

    app.post("/visaCheckout", function (req, res) {

        var decryptedUser = decryptPayload("6UJUSKhXojn2kVJNVtIcodi0WzPdZLZUMNtfw$Lg", req.body.encKey, req.body.encPaymentData);

        res.json(decryptedUser);


    });




}