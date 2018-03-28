/* eslint-disable */
const buttonBlastOff = document.getElementById("submit-button");
const input = document.getElementById("date");

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

function createImg(response) {
  var img = document.querySelector('img');
  img.setAttribute('src', response.url);
}

function getOldDates(e){
  e.preventDefault();
  var date = input.value;
  console.log('input value date check: ', date);
  makeRequest('/api/search/?' + date, createImg)
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
  input.value=today;
  makeRequest('/api/search/?' + today, createImg);
})();

// dateField.addEventListener('input', function(){
  buttonBlastOff.addEventListener('click', getOldDates);