const pdftk = require("node-pdftk");

module.exports = function (app) {
    function taxformfill(req, res) {
        // pdftk
        //   .input("./myfile.pdf")
        //   .fillForm({
        //     some: "data",
        //     to: "fill",
        //     the: "form",
        //   })
        //   .flatten()
        //   .output("./myfile2.pdf")
        //   .then((buffer) => {
        //     // Do stuff with the output buffer
        //   })
        //   .catch((err) => {
        //     // handle errors
        //   });
    }

    app.post("/taxform", taxformfill);
};