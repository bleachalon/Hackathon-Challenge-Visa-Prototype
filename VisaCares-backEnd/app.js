var express = require("express");
var app = express();

// let apiRouter = require("./api");
// app.use('/api', apiRouter);

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.use(express.urlencoded());
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");

    next();
});

let donationService = require('./controller/donationController');
donationService(app)

let visaCheckoutService = require('./controller/visaCheckoutController');
visaCheckoutService(app);
let visauserValidateService = require('./controller/userInfoController');
visauserValidateService(app);


app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});