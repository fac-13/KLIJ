// client side generic XML request func to make requests to the server 
function makeRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
            var response = xhr.responseText;
            callback(response);
        } else {
            console.log(`Status code ${xhr.status}`)
        }
    })
    xhr.open('GET', url)
    xhr.send();
}

