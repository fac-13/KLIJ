/* eslint-disable */

// client side generic XML request func to make requests to the server 
function makeRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      var response = xhr.responseText;
      callback(response);
    } else {
      console.log(`Status code ${xhr.status}`);
    }
  })
  xhr.open('GET', url);
  xhr.send();
}

// Event listener for date input, makes request to server on change 
var dateField = document.querySelector('#date');
dateField.addEventListener('input', function(){
  console.log('date field stuff: ', dateField.value)
  makeRequest('/api/search?' + dateField.value, createImg)
})
