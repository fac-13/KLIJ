/* eslint-disable */
const buttonBlastOff = document.getElementById("submit-button");
const input = document.getElementById("date");
const content = document.querySelector(".js-content");

// client side generic XML request func to make requests to the server 
function makeRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      var response = xhr.responseText;
      callback(JSON.parse(response));
    } else {
      console.log(`Status code ${xhr.status}`);
    }
  })
  xhr.open('GET', url);
  xhr.send();
}

function createImg(response) {
  var title = document.createElement('h2');
  title.textContent = response.title;
  title.classList.add("content__title");
  content.appendChild(title);
  var img = document.createElement('img');
  img.classList.add("content__img");
  img.setAttribute('src', response.url);
  content.appendChild(img);
  appendFurtherContent(response);
}

function appendFurtherContent(response) {
  var photographer = document.createElement('h3');
  photographer.textContent = response.copyright;
  photographer.classList.add("content__photographer");
  content.appendChild(photographer);
  var explanation = document.createElement('p');
  explanation.textContent = response.explanation;
  explanation.classList.add("content__explanation");
  content.appendChild(explanation);
}

function getOldDates(e) {
  e.preventDefault();
  var date = input.value;
  if (validDate(date)) {
    document.querySelector('form').childNodes[1].textContent = 'Find a past picture of the day';
    makeRequest('/api/search/?' + date, createImg)
  } else {
    document.querySelector('form').childNodes[1].textContent = "Enter a date between 16-06-1995 and " + todayDate();
  }
}

function validDate(date) {
  var minDate = new Date(1995, 6, 16).getTime();
  var maxDate = Date.now();
  date = new Date(date).getTime();

  return minDate <= date && date <= maxDate
}

function dateFormat(val) {
  if (val < 10) {
    return '0' + val.toString();
  } else {
    return val;
  }
}

function todayDate(arg) {
  var today = new Date();
  var dd = dateFormat(today.getDate());
  var mm = dateFormat(today.getMonth() + 1);
  var yyyy = today.getFullYear();

  return arg ?  yyyy + '-' + mm + '-' + dd : dd + '-' + mm + '-' + yyyy;
}

(function () {
  var today = todayDate(true);
  input.value = today;
  makeRequest('/api/search/?' + today, createImg);
})();

buttonBlastOff.addEventListener('click', getOldDates);