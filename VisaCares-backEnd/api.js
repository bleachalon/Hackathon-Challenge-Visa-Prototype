let express = require("express");

let apiRouter = express.Router();

let sampleController = require("./controller/sampleController");

apiRouter.get("/sampleAPI", sampleController.querySampleController);

module.exports = apiRouter;