'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2021-03-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementsDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date1 - date2) / (24 * 60 * 60 * 1000));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed == 0) return 'Today';
  if (daysPassed == 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
}

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    
    const displayDate = formatMovementsDate(new Date(account.movementsDates[i]), currentAccount.locale);
    
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
      } ${type}</div>
        <div class="movements__dates">${displayDate}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
let currentAccount;

// Fake always logged in
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;


// Event handlers
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // create a current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      // month: 'long',
      // month: '2-digit',
      year: 'numeric',
      // year: '2-digit',
      // weekday: 'long',
    }

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);


    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
        // Add movement
        currentAccount.movements.push(amount);

        // Add loan date
        currentAccount.movementsDates.push(new Date().toISOString());
        // Update UI
        updateUI(currentAccount);
      }, 3000
    )
    
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



//HEADLINE:  Create a date

/*
const now = new Date();     // Date constructor
console.log(now);

// Passing string in Date constructor to create date object
console.log(new Date('Tue Mar 02 2021 01:31:04'));
console.log(new Date('December 24, 2020'));
console.log(account1.movementsDates[0]);

// Passing year month date hours mins secs
console.log(new Date(2021, 3, 2, 1, 35, 30));   // year -> 2021 month -> 3(April ==> 0-based indexing for month)

// INFO autocorrecting of dates in javascript
console.log(new Date(2021, 10, 33)); // 33 november 2021 --> 03 Dec 2021
console.log(new Date(2021, 11, 33)); // 33 December 2021 --> 02 Jan 2022


// INFO:
console.log(new Date(0));       // Day on which unix time system started
// Date and time after exactly 3 days.
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Standard way to calculate dates after n days --> n * 24 * 60 * 60 * 1000
// timestamp --> 3 * 24 * 60 * 60 * 1000
*/

//HEADLINE: Working with Dates

/*
const future = new Date(2021, 3, 2, 1, 35, 30);
console.log(future);

//INFO: get dates methods
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // Standard string for date-time

console.log(future.getTime());    // Returns timestamp -> 1617307530000, which is time spent from jan 1, 1970 till future date.
console.log(new Date(1617307530000));

console.log(Date.now()); // Timestamp for right now

//INFO: set dates methods
future.setFullYear('2022');
console.log(future);
*/

//HEADLINE: Operations with Dates

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);    //Thu Nov 19 2037 15:23:00 GMT+0530 (India Standard Time)
//INFO====
console.log(+future);   // +future will convert future from string to number i.e timestamp

const calcDaysPassedTimeStamp = (date1, date2) => Math.abs(date1 - date2);
// Dividing total timestamp by timestamp of 1 day, to get difference in terms of days.
const calcDaysPassed = (date1, date2) => Math.abs(date1 - date2) / (24 * 60 * 60 * 1000);

const daysDifferenceTimeStamp = calcDaysPassedTimeStamp(new Date(2037, 3, 4), new Date(2037, 3, 14))
const daysDifference = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14))

console.log(daysDifferenceTimeStamp);
console.log(daysDifference);


// //HEADLINE: Experimenting Intl API for Dates

// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'numeric',
//   // month: 'long',
//   // month: '2-digit',
//   year: 'numeric',
//   // year: '2-digit',
//   weekday: 'long',
// }

// // Internationalizing Dates --> Intl is namespace for API
// // labelDate.textContent = new Intl.DateTimeFormat('hi-IN', options).format(now); // This function accepts locale as first arg and options as second arg.

// /*
// ISO language code table --> http://www.lingoes.net/en/translator/langcode.htm
// 'hi-IN' -> Hindi, India
// 'en-US' -> English, United States
// 'en-UK' -> English, United Kingdom
// */

// //INFO: Instead of hardcoding locales we can directly get it from the user's browser.
// const locale = navigator.language;
// console.log(locale);
// console.log(new Intl.DateTimeFormat(locale, options).format(now));


//HEADLINE: Intl API for numbers

const num = 38882710.90;

// Check mdn intl documentation for more knowledge about options etc.
const options = {
  // style: 'unit',
  // unit: 'celsius'
  // unit: 'mile-per-hour',
  
  // style: 'percent',
  style: 'currency',
  currency: 'INR'

};

console.log('US:           ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany:      ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:        ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log('India:        ', new Intl.NumberFormat('hi-IN', options).format(num));


//HEADLINE: setTimeOut

setTimeout((ing1, ing2) => console.log('Your pizza is ready'), 3000);  //This function will execute after 3 seconds.
// But this doesn't mean that execution will stop at this point for 3 seconds. Javascript when sees setTimeOut fn it immediately saves the callback fn and starts timer behind the scenes, after completion of time Javascript will call the callback fn.
console.log('Waiting...');

const ingredients = ['Olives', 'Spinach']
const pizzaTimer = setTimeout((ing1, ing2) => console.log('Second Timer: Your pizza is ready'), 3000, ...ingredients);

// Canceling timeout
if (ingredients.includes('Spinach')) clearTimeout(pizzaTimer);

//HEADLINE: setInterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 3000);