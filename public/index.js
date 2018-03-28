/* eslint-disable */

// client side generic XML request func to make requests to the server 
function makeRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      var response = xhr.responseText;
      callback(JSON.parse(response));
      console.log(response);
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
  makeRequest('/api/search/?' + dateField.value, createImg)
})

function createImg(response) {
  var img = document.querySelector('img');
  img.setAttribute('src', response.hdurl);
}

function dateFormat(val) {
  if (val<10){
    return '0'+ val.toString();
  }else{
    return val;
  }
}

(function(){
  var today = new Date();
  var dd = dateFormat(today.getDate());
  var mm = dateFormat(today.getMonth()+1);
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  console.log(today);
  makeRequest('/api/search/?' + today, createImg);
})();
