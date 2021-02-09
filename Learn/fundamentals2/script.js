//* Activating Strict mode ======================

// Strict mode can help in debugging the potential bugs
// To activate strict mode, "user strict" should be written at the top of the js file.
'use strict';

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriverLicense = true;
// // Without strict this will not get print out on console and we to debug why is that happening
// if (hasDriversLicense) console.log('I can drive');
// // But with strict mode, it will show error on console.


//* Function Declarations and expressions ========

sayHello();

// Function Declarations ====
function sayHello() {
    console.log("Hello World");
}

sayHello();

// Error----
// func();

// Function Expressions ===== function is assigned to func variable
const func = function () {
    console.log("Hello From Function expression");
}

func();

// What's the difference in between both of these ?

// Ans. We can call function declaration anywhere in script(because of code hoisting), but we can call function expression only after its declaration.

//* ==============================================


//* Arrow Functions ==============================

const calcAge = birthYear => 2021 - birthYear;
const age = calcAge(1999);
console.log(age);

const yearsUntilRetirement = birthYear => {
    let age = 2021 - birthYear;
    const retirement = 65 - age;
    return retirement;
}
console.log(yearsUntilRetirement(1999));

const yearsUntilRetirement2 = (birthYear, firstName) => {
    let age = 2021 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement}`;
}
console.log(yearsUntilRetirement2(1999, 'Sarthak'));

//! ======= We can not use this keyword inside arrow functions ======= 
//* ==============================================


//* Arrays =======================================

// First way of initializing array
let friends = ['Sarthak', 'Akshat', 'Paras'];
console.log(friends.length);

// Second way
let friends2 = new Array(200, 22, 1, 34115, 153, 21, 'Sarthak');
console.log(friends2)

// Append element at the last of the array ------------------------
friends.push('hello');
let currLength = friends.push('world');
console.log(currLength);
console.log(friends);

// Add element on the first position in the array ------------------------
friends2.unshift('Jain');
console.log(friends2)

// Remove last element ----------------------------------------
friends.pop();
// We can also save the element which is being removed.
const element = friends.pop();

// Remove First Element ----------------------------------------
friends2.shift();

console.log(element);
console.log(friends);
console.log(friends2);


// Get the index of the element of an array---------------------------

// If present, Returns index--
console.log(friends.indexOf('Paras'));
// If not present, Returns -1 ---
console.log(friends.indexOf('Parasss'));

friends.push(23);

// Check whether element is present or not ---------------------------
console.log(friends.includes('Paras'));
console.log(friends.includes('Bob'));
// Imp NOTE: includes() does strict matching (just like '===' operator), therefore foll. statement will return false.
console.log(friends.includes('23'));

// INFO
// forEach() of an array: Loop over all elements and perform some action --------------------------------
// args: element, index, array are passed by default by forEach fn.
friends.forEach(function (element, index, array) {
    friends[index] = element + ' $$$$';
});
console.log(friends);

// INFO
// splice function: Delete # of elements from particular index-------------
// splice() accepts two args: first arg => index 
// Second arg => Number of elements to be deleted after that index.
friends2.splice(1, 2);
console.log(friends2);

// Accessing an array element -------------------------

// The 2 in friends[2] is coerced into a string by the JavaScript engine through an implicit toString conversion.
console.log(friends[2]);  // => js engine will convert it to (friends['2'])
console.log(friends['2']);

console.log(friends['02']);  // => but this will return undefined, coz as we passed string to access the element so there will not be any type coercion.
// As a result, '2' and '02' would refer to two different slots on the years object, and the following example could be true:
console.log(friends['2'] != friends['02']);

// Js returns Undefined when we try to access the element which is out of bound.
console.log(friends['20']);


// Relationship between length and numberical properties ==============================
const fruits = []
console.log(fruits.length);
fruits.push('banana', 'apple', 'peach');
console.log(fruits.length);

//! When setting a property on a JavaScript array when the property is a valid array index
//! and that index is outside the current bounds of the array, the engine will update the array's length property accordingly:

fruits[5] = 'mango';
console.log(fruits[5]);            // 'mango'
console.log(Object.keys(fruits));  // ['0', '1', '2', '5']
console.log(fruits);               // ['banana', 'apple', 'peach', empty x 2, 'mango']
console.log(fruits.length);        // 6
console.log(fruits[4]);            // undefined

// INFO Increasing the length: 
fruits.length = 10;
console.log(fruits)              // ['banana', 'apple', 'peach', empty x 2, 'mango', empty x 4]
console.log(Object.keys(fruits)) // ['0', '1', '2', '5']
console.log(fruits.length)       // 10
console.log(fruits[8])           // undefined

// INFO Decreasing the length property does, however, delete elements. 
fruits.length = 2
console.log(Object.keys(fruits)) // ['0', '1']
console.log(fruits.length)       // 2

// =============== Convert an Array-like or iterable object to an array ==================
// Static method is used --- Array.from()

console.log(Array.from('Hello'));
// We can also pass mapping fn to it.
console.log(Array.from([1, 2, 3, 4], x => 2 ** x));


let arr = Array.from({ length: 5 }, (v, i) => i);
console.log(arr);
// INFO
// Confused ? Let's break it down ----
console.log(Array.from({ length: 5 }));  // [undefined, undefined, undefined, undefined, undefined]
// Now, lets pass mapping funciton --
function temp(v, i) {
    // Second arg refers to indexes....
    // console.log(i);
    return i;
}
console.log(Array.from({ length: 5 }, temp));

//* ================ END =========================


//* Sequence Generator ==> Range() fn
const range = (start, stop, step=1) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
console.log(range(0, 4));       // both start and end are inclusive.
console.log(range(0, 4, 2));

//* =============== END ============= 


//* Objects =====================================

const sarthak = {
    'firstName': 'sarthak',
    lastName: 'Jain',
    age: '21',
    birthYear: '1991',
}

console.log(sarthak['firstName']);
console.log(sarthak.firstName);

// INFO We can inlcude any data structure type in objects i.e we can include array, objects even functions as well.
const sarthakNew = {
    'firstName': 'sarthak',
    lastName: 'Jain',
    age: '21',
    birthYear: '1999',
    friends: ['Harshal', 'paras', 'Abhay', 'Sanskar'],
    hasDriverLicense: true,
    // This will be a function expression not function declaration.
    calcAge: function () {
        return 2021 - this.birthYear;           // this keyword refers to current object
    }
}
console.log(sarthakNew.calcAge());

console.log("Hiiii");