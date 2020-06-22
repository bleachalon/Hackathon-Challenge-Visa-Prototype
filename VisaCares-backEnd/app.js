var express = require("express");

let apiRouter = require("./api");

var app = express();

app.use('/api', apiRouter);

app.get("/", function (req, res) {
    res.send("Hello World!");
});



app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});