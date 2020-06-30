// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                html += node.outerHTML;
                break;
            case Node.TEXT_NODE:
                html += node.nodeValue;
                break;
            case Node.CDATA_SECTION_NODE:
                html += '<![CDATA[' + node.nodeValue + ']]>';
                break;
            case Node.COMMENT_NODE:
                html += '<!--' + node.nodeValue + '-->';
                break;
            case Node.DOCUMENT_TYPE_NODE:
                // (X)HTML documents are identified by public identifiers
                html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
                break;
        }
        node = node.nextSibling;
    }
    var searchTerm = "a-color-price a-size-medium a-text-right grand-total-price aok-nowrap a-text-bold a-nowrap";
    var szie = searchTerm.length;
    var index = html.indexOf(searchTerm);
    var stringAmount = html.substring(index + szie + 2, index + szie + 80)
    var indexEnd = stringAmount.indexOf("</td>")

    return stringAmount.substring(0, indexEnd).trim();
}

function myFunction() {

    console.log("Test");

}


chrome.runtime.sendMessage({
    action: "getNewTag",
    source: myFunction()
});


chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});