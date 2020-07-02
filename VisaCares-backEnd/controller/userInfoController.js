var json = require('./data/accountData.json'); //(with path)
var json2 = require('./data/transaction.json'); //(with path)

module.exports = function (app) {
    function validateUser(req, res) {
        if (req.body.username == json.username && req.body.password == json.password) {
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

        console.log(tmp);

        transactionData.unshift(tmp);
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
        "amount": "0.65",
        "date": "2020-06-22T19:20+01:00"
    }, {
        "amount": "0.76",
        "date": "2020-06-21T19:20+01:00"
    }, {
        "amount": "0.34",
        "date": "2020-06-20T19:20+01:00"
    },    {
        "amount": "1.21",
        "date": "2020-06-19T19:20+01:00"
    },    {
        "amount": "0.02",
        "date": "2020-06-18T19:20+01:00"
    },    {
        "amount": "0.50",
        "date": "2020-06-17T19:20+01:00"
    },    {
        "amount": "0.32",
        "date": "2020-06-16T19:20+01:00"
    },    {
        "amount": "0.80",
        "date": "2020-06-14T19:20+01:00"
    }


]