chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource") {
        message.innerText = request.source;
    }

    console.log("message.innerText", message.innerText);

    var price = message.innerText;
    var el = document.getElementById('myButton');
    if (el) {
        document.getElementById("myButton").addEventListener("click", myFunction);
    }
    priceString = price.substring(2, price.length)

    function myFunction() {
        console.log("http://localhost:4200/" + priceString);
        window.open("http://localhost:4200/" + priceString);
    }
});


function onWindowLoad() {

    var message = document.querySelector('#message');

    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });


}

function myFunction() {

    console.log(" myFunction lol");

}


window.onload = onWindowLoad;