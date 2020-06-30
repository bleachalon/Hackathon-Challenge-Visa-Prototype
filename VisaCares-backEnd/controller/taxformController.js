const pdftk = require("node-pdftk");
var hummus = require("hummus"),
    PDFDigitalForm = require("./pdf-digital-form");
let fs = require("fs");
var util = require("util");
var pdfParser = hummus.createReader("./controller/myfile.pdf"); // the path to the pdf file
var digitalForm = new PDFDigitalForm(pdfParser);
var pdfFiller = require("pdffiller");
const express = require("express");

module.exports = function (app) {
    async function taxformfill(req, res) {


        // if (digitalForm.hasForm()) {
        //     fs.writeFileSync(
        //         "./controller/fields.json",
        //         JSON.stringify(digitalForm.fields, null, 4)
        //     );
        // }
        var sourcePdf = "./controller/myfile.pdf";
        var destinationPDF = "./controller/myfile222.pdf"
        // use the "name" field in the json
        var data = {

            //address 
            "topmostSubform[0].Page1[0].Table1[0].Line1A[0].f1_3[0]": "123 N Happy Drive",

            //Donor's cost or adjustec basis
            "topmostSubform[0].Page1[0].Pg1Table2[0].Line1A[0].f1_21[0]": "11111111",
            //fair market value
            "topmostSubform[0].Page1[0].Pg1Table2[0].Line1A[0].f1_22[0]": "2222222 ",
            // How queiry By donor 
            "topmostSubform[0].Page1[0].Pg1Table2[0].Line1A[0].f1_20[0]": "33333333333",

            //date
            "topmostSubform[0].Page1[0].Pg1Table2[0].Line1A[0].f1_19[0]": "May 20 2020",

            //date
            "topmostSubform[0].Page1[0].Pg1Table2[0].Line1A[0].f1_18[0]": "May 20 2020",


            "topmostSubform[0].Page1[0].f1_48[0]": "A",

            //subtotal
            "topmostSubform[0].Page1[0].f1_49[0]": "100"
        };

        console.log("taxformfill")

        var res = await fillPdf(sourcePdf, destinationPDF, data);

        // pdftk
        //     .input(sourcePdf).fillForm({
        //         some: data,
        //         to: 'fill',
        //         the: 'form'
        //     })
        //     .stamp()
        //     .output(destinationPD)
        //     .then(buffer => {
        //         // Do stuff with the output buffer
        //     })
        //     .catch(err => {
        //         // handle errors
        //     });



        console.log("lol");


    }

    function fillPdf(sourcePdf, destPdf, data) {
        return new Promise((resolve, reject) => {
            pdfFiller.fillFormWithFlatten(sourcePdf, destPdf, data, true, function (
                err
            ) {
                if (err) reject(err);
                resolve();
            });
        });
    }
    app.post("/taxform", function (req, res) {

        taxformfill();
        res.sendFile(__dirname + "/" + req.body.filename);


    });
};