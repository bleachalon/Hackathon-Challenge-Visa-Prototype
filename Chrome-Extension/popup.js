chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource") {
        message.classList.remove("loader");
        message.innerText = request.source;
    }

    console.log("message.innerText", message.innerText);

    var price = message.innerText;
    var el = document.getElementById('myButton');
    if (el) {
        document.getElementById("myButton").addEventListener("click", redirectUser);
    }
    priceString = price.substring(1, price.length)

    function redirectUser() {
        //console.log("http://localhost:4200/checkout/" + priceString);
        window.open("https://bleachalon.github.io/VisaCares-frontend/checkout/" + priceString);
    }
});


function onWindowLoad() {

    var message = document.querySelector('#message');

    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.classList.remove("loader");
            message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });


}


window.onload = onWindowLoad;