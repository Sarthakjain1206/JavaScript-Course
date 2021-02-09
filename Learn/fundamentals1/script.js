//* String Template Literals ================= 

console.log("Hello World");

const firstName = 'Sarthak';
const lastName = 'Jain';
const birthYear = 2000;
const year = 2021;

const sarthak = "I'm " + firstName + ', a ' + (year - birthYear) + ' year old';
console.log(sarthak);

// Better way of doing it by using string template literals(similar to f-string in python)
// We need to write these inside backticks ===> ``
const sarthakNew = `I'm ${firstName}, a ${year - birthYear} year old`;
console.log(sarthakNew);

console.log(`
I'm Sarthak
Working on JavaScript
`);

//* ====================== END ===================


//* Type Conversions and Coercion ================

// Type Conversion
const inputYear = '1991';
console.log("Before Conversion ==>", inputYear + 18);
console.log("After Conversion ==>", Number(inputYear) + 18);

console.log(Number('Sarthak'));
console.log(typeof NaN);

console.log(String(1562));

// Type Coercion -- Automatic type conversion done by javaScript
console.log('I am ' + 23 + ' years old');
// ======= Imp distinction 
console.log('23' - '10' - 3);
// =======
console.log('23' + '10' + 3);
// =======
console.log('23' * '4');
console.log('23' / '2');

//* ====================== END ===================



// 5 falsy values: 0, '', undefined, null, NaN
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Sathak'));
console.log(Boolean({}));
console.log(Boolean(''));


let age = 21;
if (age === 21) console.log("You're an adult");


//* Difference in '==' and '===' ?  --------------

// '==' this operator is loose equality operator
// '===' this operator is strict equality operator

age = '21';
// As we can see this conditional will result in true as it can perform coercion type conversion
if (age == 21) console.log("You're and adult acc to '==' operator");

// But this === operator checks for exactly equal on both sides..
if (age === 21) console.log("You're and adult acc to '===' operator");

//* ====================== END ===================


//* Switch case statement ========================
const day = 'monday';

switch (day) {
    case 'monday': // day === 'monday'
      console.log('Plan course structure');
      console.log('Go to coding meetup');
      break;
    case 'tuesday':
      console.log('Prepare theory videos');
      break;
    case 'wednesday':
    case 'thursday':
      console.log('Write code examples');
      break;
    case 'friday':
      console.log('Record videos');
      break;
    case 'saturday':
    case 'sunday':
      console.log('Enjoy the weekend :D');
      break;
    default:
      console.log('Not a valid day!');
  }
  
//* =================== END ========================


//* Ternary Operator ============================

let x = 23;
x >= 23 ? console.log("I m greater than 23") : console.log("I m not greater than 23");
