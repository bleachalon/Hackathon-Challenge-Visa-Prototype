let express = require("express");

let apiRouter = express.Router();


let donationController = require("./controller/donationController")


apiRouter.get("/donate", donationController.donateProcess);


module.exports = apiRouter;