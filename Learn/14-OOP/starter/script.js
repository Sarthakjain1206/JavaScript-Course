'use strict';

// Constructor Function ---- [convention --> First letter is capital]
const Person = function (firstName, birthYear) {
    // Instance Properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    //INFO: Never Do this (method inside constructor object)======== bcoz for every instance same copy of this method will be copied with this keyword pointing to that instance object.
    // This can be very bad for performance, as unnecessary memory is being occupied.
    //INFO: Solution ==> //* Prototypes *//
    // this.calcAge = function () {
    //     console.log(2037 - this.birthYear);
    // }
};

const sarthak = new Person('Sarthak', 2000);

// new Operator functionality =====>>
// 1. New {} is created
// 2. function is called, and this will point to {}
// 3. {} linked to prototype
// 4. function automatically return {}

console.log(sarthak);
// sarthak.calcAge();

const jonas = new Person('Jonas', 1999);
const jack = new Person('Jack', 2017);

console.log(jonas, jack);
console.log(jonas instanceof Person);

//HEADLINE: Prototypes and Prototypal Inheritance
/* 
* Prototypes are the mechanism by which JavaScript objects inherit features from one another.
* JavaScript is often described as a prototype-based language — to provide inheritance, objects can have a prototype object,
* which acts as a template object that it inherits methods and properties from.
*/

console.log(Person.prototype);

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};

console.log(jonas);     // We can see that jonas does not contains calcAge method as its direct method
jonas.calcAge();        // Still we can access this because of //? Prototypal Inheritance

console.log(jonas.__proto__);   // We can see calcAge is defined inside it
console.log(jonas.__proto__ === Person.prototype);          // true

console.log(Person.prototype.isPrototypeOf(jonas));         // true
console.log(Person.prototype.isPrototypeOf(jack));          // true
console.log(Person.prototype.isPrototypeOf(sarthak));       // true

/*
! How __proto__ property is present in instances or object?
* Remeber 3) step above --->  {} linked to prototype
* When we are creating object/instance with new keyword then in the 
* background object (which we are creating, jonas) will be linked to the prototype of Constructor Function (Person).
*/

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, sarthak.species);

//INFO: Prototype Chain --> JS will first look in jonas object, if it is 
//not there then its prototype object i.e Person() and if it is not there
//as well, then JS will look inside Object.prototype

console.log(jonas.hasOwnProperty('firtName')); // hasOwnProperty() is defined inside Object.prototype()
console.log(jonas.hasOwnProperty('species'));       // false

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);


const arr = [3, 6, 4, 5, 6, 9, 3]; // Behind the scene: const arr = new Array(3,6,4,..)
console.log(arr.__proto__);
// Prototype property of the constructor is same as the prototype property of objects created by that constructor.
console.log(arr.__proto__ === Array.prototype);

// Remember Lecture: How DOM really works behind the scenes
const h1 = document.querySelector('h1');
// console.log(dir(h1));
// Coonfirm inheritance of dom in console.


//HEADLINE: ES6 Classes  [Exactly same as prototypes in backend working.. It's just more of a syntactical sugar]

class Person1 {
    constructor(fullname, birthYear) {
        this.fullname = fullname;
        this.birthYear = birthYear;
    }
    // Methods will be added to .prototype property
    calcAge() {
        console.log(2037 - this.birthYear);
    }
    greet() {
        console.log(`Hey ${this.fullname}`);
    }
    
    // getter
    get age() {
        return 2037 - this.birthYear;
    }
    // Setter [setting a property which already exists]
    set fullname(name) {
        //BUG: We cannot set this.fullname because our constructor function is also trying to set the same property so there will be a conflict.
        //FIXME: To avoid this we can use one convention which says use _firstname (Similar to python). But, if we do this we cannot access "fullname" property so we have to creater getter as well.
        
        // if (name.includes(' ')) this.fullname = name;    //BUG
        if (name.includes(' ')) this._fullname = name;      //FIXME
        else alert(`${name} is not a full name`);
        // else return;

    }
    // getter
    get fullname() {
        return this._fullname;
    }

    // Static method
    static hey() {
        console.log("Hey There! From ES6 class ✌✌");
    }
};

const jessica = new Person1('Jessica Davis', 1996);

//Another way of greet() method inside class
// Person1.prototype.greet = function () {
//     console.log(`Hey ${this.firstName}`);
// }
// jessica.greet();

console.log(jessica);
console.log(jessica.__proto__ === Person1.prototype);

// If we remove getter, this line will give an error.
console.log(jessica.fullname);
jessica.calcAge();

// const walter = new Person1('walter', 1995);
// console.log(walter.fullname);
// ======================INFO=======================
//! 1. Classes are NOT hoisted [functions are hoisted]
//! 2. Classes are first-class citizens 
//! 3. Classes are executed in strict mode


// HEADLINE: Getters and Setters
const account = {
    owner: 'jonas',
    movements: [200, 530, 120, 300],

    // Getter
    get latest() {
        return this.movements.slice(-1).pop();
    },
    // Setter
    set latest(mov) {
        this.movements.push(mov);
    }
};

// get latest movement --- like property
console.log(account.latest);
// set latest movement --- like property
account.latest = 50;
console.log(account.movements);


//HEADLINE: Static Methods [Not inheritable]

/*
    Array.from() method is a static method of Array class, which means from method is not inheritable by its instances
    In pythonic words: from() is bound to class itself not to instances
*/

// Create static method in Constructor functions
Person.hey = function () {
    return "Hey There! from prototype ✌✌";
}
console.log(Person.hey());
const obj1 = new Person("SarthakJain", "1999");
// console.log(obj1.hey());    //BUG: As hey() is not inheritable by Person class objects

// Create static method in ES6 classes --- by using static keyword [see above]
Person1.hey();