let express = require("express");

let apiRouter = express.Router();

let sampleController = require("./controller/sampleController");

let donationController = require("./controller/donationController")

apiRouter.get("/sampleAPI", sampleController.querySampleController);

apiRouter.get("/donate", donationController.donateProcess);

//  /api/sampleAPI

module.exports = apiRouter;