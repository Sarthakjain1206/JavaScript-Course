"use script";

///////////////////////////////////////
// The call and apply Methods
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function() {}
    book(flightNum, name) {
      console.log(
        `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
      );
      this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams');


// Call method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

// Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);


// Bind Method

// We can bind book fuction for eurowings using bind method.
const bookEW = book.bind(eurowings);
// Now in bookEW() function we do not need to specify object for this keyword.
const bookLH = book.bind(lufthansa);

bookEW(23, 'Steven');

// We can also bind function with arguments as well.
const bookEW23 = book.bind(eurowings, 23);
bookEW23("Sarthak Jain");
bookEW23("Harshal Jain");


//HEADLINE: With Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   //INFO: this keyword will print current object which is <button> because this function is being called by eventListener function.
//   console.log(this);
//   this.planes++;
//   console.log(this.planes); // NaN
// };

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// With Event Listeners
//INFO: To make this keyword points to lufthansa object we need to bind buyPlane funciton with it.

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  //INFO: this keyword will print current object which is <button> because this function is being called by eventListener function.
  console.log(this);
  this.planes++;
  console.log(this.planes); // NaN
};

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));


//* ================ coding challenge ==================
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  registerNewAnswer: function(){
    const ans = Number(prompt(`${this.question}\n${this.options.join("\n")}\nEnter one option`));
    console.log(ans);

    if (typeof ans == 'number' && ans <= 3 && ans >= 0) {
      this.answers[ans] += 1;
    }
    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type='array') {
    if (type == 'array') console.log(this.answers);
    else if(type == 'string') console.log(`Poll Results are: ${this.answers.join(', ')}`);
  }
}
document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));
// poll.registerNewAnswer();

poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

const newFn = poll.displayResults;
newFn.call({ answers: [5, 2, 3] });

//* ================ coding challenge ends ==================



//* ================ IIFE(Immediately invoked function expression) ==================
// IIFE is useful when we want to immediately invoke the function only once.

(function () {
  console.log("I will run only once");
  const isPrivate = 45;
})()

// (() => console.log("I will also run only once"))();
// console.log(isPrivate); // Error

{
  const a = 45;
  let b = 46;
  var c = 47;
}

//INFO:::======================
// console.log(a); // Error
// console.log(a); // Error
console.log(c); // Correct



//* =============================== CLOSURES ===============================



//* ============================= CLOSURES END ===============================
