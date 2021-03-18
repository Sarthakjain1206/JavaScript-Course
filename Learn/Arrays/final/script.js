'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''
  
  movements.forEach(function (movement, i) {
    const type = movement > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type.toUpperCase()}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${movement}💲</div>
    </div>
    `;

    //INFO: INFO INFO INFO
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    containerMovements.insertAdjacentHTML('afterbegin', html);

  })
}
displayMovements(account1.movements);

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  })
}
createUsernames(accounts);

const calcPrintBalance = function (account) {
  account.balance = account.movements.reduce((acc, movement) => acc + movement, 0);
  labelBalance.textContent = `${account.balance}💲`;
}


const calcPrintSummary = function (account) {
  const incomes = account.movements.filter(mov => mov > 0).reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${incomes}💲`;

  const outcomes = account.movements.filter(mov => mov < 0).reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}💲`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * account.interestRate)
    .filter(interest => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  
  labelSumInterest.textContent = `${interest}💲`;
}

const updateUI = function (currentAccount) {
  // Display Movements
  displayMovements(currentAccount.movements);

  // Display balance
  calcPrintBalance(currentAccount);

  // Display Summary
  calcPrintSummary(currentAccount);
  
}

// Event handler for form
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Welcome msg
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
    // Display UI
    containerApp.style.opacity = 100;
    
    inputLoginUsername.value = inputLoginPin.value = '';   // Clearing these input fields after logging in
    inputLoginPin.blur();             // To remove the focus of cursor.

    updateUI(currentAccount);
  }
})

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(amount, receiverAcc);

  if (amount > 0 && amount <= currentAccount.balance && receiverAcc && receiverAcc.username != currentAccount.username) {
    // Perform transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);

    // clear input fields
    inputTransferAmount.value = inputTransferTo.value = '';
  }
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//* =================== reduce method ==========================
// reduce method takes second parameter which is initial value of accumulator (acc).
const balance = movements.reduce(function (acc, curr, i, arr) {
  return acc + curr;
}, 0);
console.log(balance);

// maximum value
const maxVal = movements.reduce(function (acc, curr) {
  if (curr > acc) acc = curr;
  return acc;
 }, -999999999);
console.log(maxVal);

//* =================== map method in arrays ======================
const eurToUsd = 1.1;
// const movementsUSD = movements.map(function (movement) {
//   return movement * eurToUsd;
// })

const movementsUSD = movements.map(movement => movement * eurToUsd)

console.log(movements);
console.log(movementsUSD);

//* =================== map method in arrays end ======================

console.log(typeof movements);

/////////////////////////////////////////////////
