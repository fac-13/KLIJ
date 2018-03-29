# KLIJ

[![Join the chat at https://gitter.im/fac-13/KLIJ](https://badges.gitter.im/fac-13/KLIJ.svg)](https://gitter.im/fac-13/KLIJ?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# NASA Pic Of Day

## User stories
- When I visit the page I can see the NASA picture of the day
- When I visit the page on different days I will automatically see the NASA photo of the day
- I can search for previous photos of the day
- If I search for a photo outside the date range I will see a message that lets me know 


## Our process
On our first day we discussed and finalised our idea. Initially we were going to use the News API however we wanted to do something that was different to other groups and had a more visual feel. As a result we decided to use NASA's API for photo of the day. 

Once we finalised our idea we spent some time whiteboarding our software architecture. This included deciding what our file structure would like, what functions we might need (and what files they would be located in) as well as an intial discussion of how our server side code would communicate with our client side code. 

Following this we decided to program on one computer to set up the initial files and the skeleton code for our server, router and handler. Then we divided tasks for pair programming (this was separated into client side and server side tasks). We ensured that we all got to work with one another throughout the project and tried to be mindful of our commit insights on github.



## Interesting code 
Our project is similar to other groups. However, two pieces of code that are different to other groups are: 
 - our form validation 
 - use of nock

### Form validation 
In our project we used an input tag with a type of date: 

```
<input id="date" class="form__input" type="date" min="1995-06-20" required="required">

```

This allowed us to create our date input field with a calendar ready for the user to use (should they want to use it). 

To validate our form we added the ```min``` attribute and the set the value to the earliest date that the NASA API had photos for. 

In our client side JS we added further form validation in the form of: 

```
function getOldDates(e) {
    e.preventDefault();

    var date = input.value;

    if(validDate(date)) {
        document.querySelector('form').childNodes\[1\].textContent = 'Find a past picture of the day';
        makeRequest('/api/search/?' + date, createImg)
    } else {
        document.querySelector('form').childNodes\[1\].textContent   =   "Enter a date between 20-06-1995 and "   +   todayDate();
    }
}


function validDate(date) {
    var minDate = new Date('1995-6-20').getTime();
    var maxDate = Date.now();
    date = new Date(date).getTime();

    return minDate <= date && date <= maxDate
}

```

Before we make our request to NASA's API for past photo's of the day, we validate the date using our validDate() function. 

The validDate() funciton works by converting dates into the number of seconds since 01/01/1970 which is a thing that JavaScript can do. 


We then return true or false depending on whether or not the users date falls within our specified range. 

``` 

return minDate <= date && date <= maxDate 

This line of code for the minDate of 20-06-95, the maxDate of 29-03-18 and the user date of 01-03-18 ends up being: 

return 803602800000 <= 1519862400000 && 1519862400000 <= 1522328386649


```

If true is returned, the API request is made to NASA's API. If false is returned, the current image being displayed won't change and the user will see a message telling them to enter a date that falls within our specified range. 


### Nock 
In order to test our server we used nock

```
test('Testing nock is working', (t) => {
    nock('https://api.nasa.gov/planetary/apod')
    .get('?date=2018-03-29')
    .replyWithError('There was a problem with NASA API');

     serverApiCall('https://api.nasa.gov/planetary/apod?date=2018-03-29', (err, res) => {

     if (err) {
        t.deepEqual(err, new   Error('There was a problem with NASA API'), 'Should return error');
     } else {
        console.log(res);
     }
 
     t.end();
    });
});

```
