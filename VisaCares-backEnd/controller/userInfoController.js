var json = require('./data/accountData.json'); //(with path)
var json2 = require('./data/transaction.json'); //(with path)

module.exports = function (app) {
    function validateUser(req, res) {
        if (req.body.username == json.username && req.body.password == json.password) {
            console.log(json);
            return res.status(200).json({
                code: 1,
                message: "success"
            });
        } else {
            return res.status(400).json({
                code: 2,
                message: "fail"
            });

        }

    }

    function transactions(req, res) {
        return res.status(200).json({
            code: 1,
            message: "success",
            data: transactionData
        });

    }

    function transactionsInsert(req, res) {

        var tmp = {
            amount: req.body.amount,
            date: req.body.date
        }

        transactionData.push(tmp)
        return res.status(200).json({
            code: 1,
            message: "success",
            data: tmp
        });
    }


    app.get("/transactions", transactions);
    app.post("/transactions/insert", transactionsInsert);


    app.post("/uservalidate", validateUser);

}

var transactionData = [

    {
        "amount": "31",
        "date": "1997-07-16T19:20+01:00"
    }, {
        "amount": "32",
        "date": "1997-07-16T19:20+01:00"
    }, {
        "amount": "31",
        "date": "1997-07-16T19:20+01:00"
    },    {
        "amount": "31",
        "date": "1997-07-16T19:20+01:00"
    },    {
        "amount": "31",
        "date": "1997-07-16T19:20+01:00"
    },    {
        "amount": "31",
        "date": "1997-07-16T19:20+01:00"
    },    {
        "amount": "31",
        "date": "1997-07-16T19:20+01:00"
    },


]