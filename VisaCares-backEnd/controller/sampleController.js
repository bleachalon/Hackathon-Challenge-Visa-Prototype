const fetch = require("node-fetch");

class SampleController {
    /**
     * sample
     */

    static async querySampleController(req, res) {
        console.log("querySampleController");

        const response = await fetch('http://dummy.restapiexample.com/api/v1/employees');
        const data = await response.json();
        console.log(data);
        res.status(200).json({
            code: 1,
            message: data
        });
    }
}

module.exports = SampleController;