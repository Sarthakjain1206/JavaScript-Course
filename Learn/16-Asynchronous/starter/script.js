'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const apiKey = '29ffe81fb6c3497ea493802cc5865b6e';

// Utility Functions
const renderCountry = function (data, className='') {
    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
    `;
    
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

const renderError = function(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  
      return response.json();
    });
  };
  
///////////////////////////////////////
//! Our First AJAX Call: XMLHttpRequest [Traditional Way of Doing AJAX]

/*
const getCountryData = function (country) {
    const t1 = new Date().getTime();
    
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);        // sending request to online ApI
    request.send();
    // https://restcountries.eu/rest/v2/alpha/ind
    
    // INFO: As soon as the data arrives from the server JS will fire the load event.
    request.addEventListener('load', function () {
        const t2 = new Date().getTime();
        console.log((t2 - t1)/1000);                      // time taken in seconds to load the content from API.
        
        const [data] = JSON.parse(this.responseText);     // parse the object and destructuring it because we receives : [{}]
        console.log(data);
    
        const html = `
            <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
                ).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
            </article>
            `;
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    });

};

getCountryData('usa');
getCountryData('bharat');
*/


//! HEADLINE ============ CALLBACK HELL ==============

/*
    HEADLINE What is callback hell ?
    Callback hell is a phenomenon that afflicts a JavaScript developer when he tries
    to execute multiple asynchronous operations one after the other.
    By nesting callbacks in such a way, we easily end up with error-prone, hard to read,
    and hard to maintain code.Soln: Best code practice to handle it.

    Layman terms ----
    When we have lot of nested callbacks, in order to executes asynchronous taks in sequential manner.
*/

//? Get country with their neighbouring country


/*
const getCountryAndNeighbour = function (country) {
    
    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);        // sending request to online ApI
    request.send();
    
    request.addEventListener('load', function () {

        const [data] = JSON.parse(this.responseText);     // parse the object and destructuring it because we receives : [{}]
        console.log(data);

        // Render country
        renderCountry(data);
        
        // Get neighbour country (2)
        const [neighbour] = data.borders;
        if (!neighbour) return;

        // AJAX call country 2 [ Dependent on first AJAX call ] {Nested Callback}
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.eu/rest/v2/name/${neighbour}`);
        request2.send();

        request2.addEventListener('load', function () {
            console.log(this.responseText);
            const [data2] = JSON.parse(this.responseText);
            renderCountry(data2, 'neighbour');
        })
    });

};

getCountryAndNeighbour('bharat');

*/


//! HEADLINE ========= Fetch API (promises) =========[Modern way for AJAX Call]

// const request = fetch('https://restcountries.eu/rest/v2/name/portugal');
// console.log(request);   // Promise

//? Basic Example

/*
const getCountryData = function (country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(function(response) {
            console.log(response);
            return response.json();     // this will also return promise
        })
        .then(function(data) {
            console.log(data);
            renderCountry(data[0]);
        });
};

getCountryData('portugal');
*/


//? Get country with their neighbouring country [Alternative of Callback hell]

// Every then() returns a promise.
/*
const getCountryData = function (country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(response => response.json())
        .then(function(data) {
            // To get data in required form we need to return promise using json method

            renderCountry(data[0]);
            const neighbour = data[0].borders[0]
            if(!neighbour) return;

            // neighbouring country
            return fetch(`https://restcountries.eu/rest/v2/name/${neighbour}`);
        })
        .then(response => response.json())
        .then(data => renderCountry(data[0], 'neighbour'));
};

getCountryData('bharat');
*/

//? ============== Handling Rejected Promises ======================
// btn.addEventListener('click', function() {
//     getCountryData('portugal');
// });

/*
const getCountryData = function (country) {
    // fetch call throws error only in case of no internet connection.

    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(response => response.json())
        .then(function(data) {
            // To get data in required form we need to return promise using json method

            renderCountry(data[0]);
            const neighbour = data[0].borders[0]
            if(!neighbour) return;

            // neighbouring country
            return fetch(`https://restcountries.eu/rest/v2/name/${neighbour}`);
        })
        .then(response => response.json())
        .then(data => renderCountry(data[0], 'neighbour'))
        .catch(err => {
            console.error(`${err} 😒😒`);
            renderError(`Something Went Wrong!! Error: ${err.message}.`);
        })
        .finally(() => {

        });
};

getCountryData('bharat');
// getCountryData('bharatttttt');   //BUG
*/

// BUG: What will happen if we pass wrong country name in fetch call api ?
// BUG Above function is giving very weird error in that case because, fetch call throws error only in case of no internet connection.
// BUG fetch call will return promise as fulfilled even when status code is 404

// FIXME:

/*
const getCountryData2 = function (country) {
    // fetch call throws error only in case of no internet connection.

    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(response => {
            console.log(response);  // We can check in console that status is 404 and ok is false
            
            if(!response.ok)
                throw new Error("Country Not Found!");  // After this it will immediately fallback to catch() handler
            
            return response.json();
        })
        .then(function(data) {
            // To get data in required form we need to return promise using json method

            renderCountry(data[0]);
            const neighbour = data[0].borders[0]
            if(!neighbour) return;

            // neighbouring country
            return fetch(`https://restcountries.eu/rest/v2/name/${neighbour}`);
        })
        .then(response => response.json())
        .then(data => renderCountry(data[0], 'neighbour'))
        .catch(err => {
            console.error(`${err} 😒😒`);
            renderError(`Something Went Wrong!! Error: ${err.message}.`);
        })
        .finally(() => {
            console.log("I am inside finally call");
        });
};

getCountryData2('bharatttt');
*/

//! HEADLINE =============== Event Loop ===================

/* Watch these videos of the course:: 
https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22649347
https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22649351
*/


//! HEADLINE =========== Building Our Own Simple Promises ==============

/*

// const obj = new Promise( executor function )     Promise is a constructor function which takes executor function as a parameter

const executorFunction = function (resolve, reject) {
    if(Math.random() >= 0.5) {
        // Resolving the promise means marking it as a fulfilled which further will be consumed by then() call.
        resolve("You Win the Lottery!!");
    }
    else {
        // Rejecting the promise means marking it as a rejected promise which will not be consumed by then() call.
        reject("You lost your lottery!!");
    }
};

const lotteryPromise = new Promise(executorFunction);
// Consuming the promise
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));


// HEADLINE Promisifying the setTimeout function
const wait = function(seconds) {
    // No need to pass reject argument
    return new Promise( function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

// Consuming
wait(1)
    .then(() => {
        console.log("1 seconds passed");
        return wait(1);
    })
    .then(() => {
        console.log("2 seconds passed");
        return wait(1);
    })
    .then(() => {
        console.log("3 seconds passed");
        return wait(1);
    })
    .then(() => {
        console.log("4 seconds passed");
    });

*/

//! HEADLINE =========== Promisifying the Geolocation API ============

// Geolocation api is callback based api therefore it can be made promise based api.

/*
navigator.geolocation.getCurrentPosition( position => console.log(position), err => console.log(err) );

const getPosition = function () {
    return new Promise(function(resolve, reject) {
        // navigator.geolocation.getCurrentPosition( position => resolve(position), err => reject(err) );
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

// consuming the promise
getPosition().then(pos => console.log(pos)).catch(err => console.error("Please allow access of location"));




//INFO: Example of converting latitude and longitude data to country using fetch api call i.e promises

const whereAmI = function () {
    getPosition()
        .then(pos => {
            const {latitude, longitude} = pos.coords;
            // This api will give information about country using current lat longitude.
            return fetch(`https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${encodeURIComponent(latitude +','+ longitude)}&pretty=1&no_annotations=1`);
            // return fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
        })
        .then(res => {
            console.log(res);
            if(!res.ok) throw new Error(`Problem with GeoCoding ${res.status}`);
            // console.log("DATA:::: ", res.text());
            return res.json();
        })
        .then(data => {
            console.log(data);
            let country = data.results[0].components.country;
            console.log(country);
            if(country == "India") country = "Bharat";
            return fetch(`https://restcountries.eu/rest/v2/name/${country}`);
        })
        .then(res => {
            if(!res.ok) throw new Error("Country NOt Found!");
            return res.json();
        })
        .then(data => renderCountry(data[0]))
        .catch(err => renderError(err.message));
}

btn.addEventListener('click', whereAmI);
*/


//! HEADLINE ============= Coding Challenge #2 ==============

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/*
const imgContainer = document.querySelector('.images');

const wait = function(seconds) {
    // No need to pass reject argument
    return new Promise( function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

const createImage = function (imagePath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imagePath;

        img.addEventListener('load', function() {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', err => reject(err) );
    });
};
let currentImg;
createImage('img/img-1.jpg')
    .then(function (img) {
        currentImg = img;
        console.log("Image 1 loaded");
        return wait(2);
    })
    .then(() => {
        currentImg.style.display = 'none';
        return createImage('img/img-2.jpg');
    })
    .then(img => {
        currentImg = img;
        console.log("Image 2 loaded");
        return wait(2);
    })
    .then(() => {
        currentImg.style.display = 'none';
        return createImage('img/img-3.jpg');
    })
    .then(() => {
        wait(2);
        currentImg.style.display = 'none';
    })
    .catch(err => console.log(err));
*/


//!  ================ Async/Await ======================== 

/*  INFOHEADLINEFIXME:BUG
    * There’s a special syntax to work with promises in a more comfortable fashion, called “async/await”.
    
    * It’s surprisingly easy to understand and use.
    
    * "Async" before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.
    
    * "Await" --> There’s another keyword, await, that works only inside async functions.

    * The keyword await makes JavaScript wait until that promise settles and returns its result.
*/

/* EXAMPLE
async function f() {
    return 1;
  }
  
f().then(alert); // 1
// So, async ensures that the function returns a promise, and wraps non-promises in it.
*/

/* EXAMPLE
async function f() {
    let promise = new Promise((resolve) => {
        setTimeout(() => resolve("I am Done!"), 1000);
    });

    let result = await promise;
    console.log("REsult: ", result);
}
f();
*/

/*
===================================

const getPosition = function () {
    return new Promise(function(resolve, reject) {
        // navigator.geolocation.getCurrentPosition( position => resolve(position), err => reject(err) );
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};


// HEADLINE: Modifying the whereAmI function using async/await
const whereAmI = async function(country) {
    ///////////////////

    // fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    //     .then(res => console.log(res));

    // const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    // console.log(res);
    //INFO Both of the way mentioned above works for the same purpose.

    ///////////////////

    try {
        // Geolocation
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;

        // Reverse geocoding
        const resGeo = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${encodeURIComponent(lat +','+ lng)}&pretty=1&no_annotations=1`);

        if(!resGeo.ok) throw new Error('Problem in Getting Location');

        const dataGeo = await resGeo.json();

        // Country Data
        country = dataGeo.results[0].components.country;
        if(country == "India") country = "Bharat";

        const resCountry = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);

        if(!resCountry.ok) throw new Error('Country not found!');

        const data = await resCountry.json();
        console.log(data);
        
        // Rendering data on page
        renderCountry(data[0]);

        return `You are in ${country}`;
        
    } catch (error) {
        console.error(error);
    }

}

// whereAmI('bharat');

console.log("1: Will get location");
//! ================ Returning Value from Async Functions ==================

//INFO: It will print promise <pending> because by default async function returns promise not strings.

// const city = whereAmI();
// console.log(city);               // primise <pending>

// INFO: We have to treat it as consuming the promise to get the returned statement
whereAmI()
    .then(country => console.log(`2: ${country}`))    // O/P: 2: You are in Bharat
    .catch(err => console.error(`2: ${err.message}`))
    .finally(() => console.log(`3: Finshed getting location`));


//INFO: We can also use await to consume the promise, but as we know we can use await only inside async function. Therefore, we can use anonymous async function to fulfill the purpose.

(async function () {
    try {
        const countryy = await whereAmI();
        console.log(`2: ${countryy}`);
    }
    catch (err) {
        console.error(`2: 💕 ${err.message}`);
    }
    finally {
        console.log(`3: Finshed getting location`);
    }
})();


========================================
*/


//! HEADLINE ============= Running Promises in Parallel =================

/*

const get3Countries = async function(c1, c2, c3) {

    // For asynchronous request i.e one fetch call is independent of other which means data can arrive in any order. We have to use Promise.all() function (Combinators function) and it will return array of promises.

    // INFO: Also, If any of fetch call promise gets rejected then Promise.all() returns rejected promise for all requests.

    try {
        const data = await Promise.all([
            getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${c2}`), 
            getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
        ]);

        console.log(data.map(d => d[0].capital));

    } catch (error) {
        console.error(error);
    }    
}

get3Countries('portugal', 'canada', 'tanzania');


// HEADLINE: Promise.race()
// INFO: The Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.
// INFO: Return Value --> A pending Promise that asynchronously yields the value of the first promise in the given iterable to fulfill or reject.


(async function() {
    const res = await Promise.race([
        getJSON(`https://restcountries.eu/rest/v2/name/italy`),
        getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
        getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
    ]);

    console.log(res);   
})();


const timeout = function(sec) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error('Request took too long!'));
        }, sec * 1000);
    });
};

Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
    timeout(5),     // After 5seconds if promise is still not settled then it will settle the promise as rejected.
]).then(res => console.log(res[0])).catch(err => console.log(err));


// INFO: An empty iterable causes the returned promise to be forever pending:

// EXAMPLE:
(function() {
    //INFO: If the iterable contains one or more non-promise value and/or an already settled promise, then Promise.race will resolve to the first of these values found in the array:

    var foreverPendingPromise = Promise.race([]);
    var alreadyFulfilledProm = Promise.resolve(100);

    var arr = [foreverPendingPromise, alreadyFulfilledProm, "non-Promise value"];
    var arr2 = [foreverPendingPromise, "non-Promise value", Promise.resolve(100)];
    var p = Promise.race(arr);
    var p2 = Promise.race(arr2);

    console.log(p);
    console.log(p2);
    setTimeout(function(){
        console.log('the stack is now empty');
        console.log(p);
        console.log(p2);
    });

    // logs, in order:
    // Promise { <state>: "pending" }
    // Promise { <state>: "pending" }
    // the stack is now empty
    // Promise { <state>: "fulfilled", <value>: 100 }
    // Promise { <state>: "fulfilled", <value>: "non-Promise value" }
})()



// HEADLINE: Promise.allSettled

//INFO:  The Promise.allSettled() method returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.
// INFO: In comparison, the Promise returned by Promise.all() may be more appropriate if the tasks are dependent on each other / if you'd like to immediately reject upon any of them rejecting.
// INFO: A pending Promise that will be asynchronously fulfilled once every promise in the specified collection of promises has completed, either by successfully being fulfilled or by being rejected. 


Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another Success'),
]).then(res => console.log(res)).catch(err => console.error(err));


//HEADLINE: Promise.any()

// INFO: Promise.any() takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfills, returns a single promise that resolves with the value from that promise. 
// INFO: If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an AggregateError

// INFO: Return Value ==> An already rejected Promise if the iterable passed is empty.
// An asynchronously resolved Promise if the iterable passed contains no promises.
// A pending Promise in all other cases. This returned promise is then resolved/rejected asynchronously (as soon as the stack is empty) when any of the promises in the given iterable resolve, or if all the promises have rejected.

const pErr = new Promise((resolve, reject) => {
    reject("Always fails");
  });
  
const pSlow = new Promise((resolve, reject) => {
setTimeout(resolve, 500, "Done eventually");
});

const pFast = new Promise((resolve, reject) => {
setTimeout(resolve, 100, "Done quick");
});

Promise.any([pErr, pSlow, pFast]).then((value) => {
    // It ignored the rejected promise and returns the first fullfilled promise.

    console.log(value, "🎂🎂");     // Done Quick
    // pFast fulfils first
});

*/


//! HEADLINE =============== Coding Challenge #3 =====================

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

// HEADLINE Part 1
const imgContainer = document.querySelector('.images');

const wait = function(seconds) {
    // No need to pass reject argument
    return new Promise( function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

const createImage = function (imagePath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imagePath;

        img.addEventListener('load', function() {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', err => reject(err) );
    });
};
let currentImg;

const loadNPause = async function() {
    try {
        let img = await createImage('img/img-1.jpg');
        currentImg = img;
        console.log("Image 1 loaded");
        
        await wait(2);
        
        currentImg.style.display = 'none';
        img = await createImage('img/img-2.jpg');
        currentImg = img;
        console.log("Image 2 loaded");
    
        await wait(2);
    
        currentImg.style.display = 'none';
        img = await createImage('img/img-3.jpg');
        currentImg = img;
        console.log("Image 3 loaded");
    
        await wait(2);

        currentImg.style.display = 'none';
            
    } catch (error) {
        console.error(error);
    }
}
// loadNPause();

// HEADLINE: PART 2

async function loadAll(imageArr) {
    let imgs = imageArr.map(async function (image) {
        return await createImage(image);
    });
    // console.log(imgs);
    const imagesLoad = await Promise.all(imgs);
    // console.log(imagesLoad);
    imagesLoad.forEach(img => img.classList.add('parallel'));

}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);