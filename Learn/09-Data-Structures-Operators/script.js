'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
  },
  //Destructing of arg object immediately
  orderDelivery: function ({ starterIndex, mainIndex, time, address}) {
    console.log(
      `Order Recieved! ${this.starterMenu[starterIndex]} & ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};


//* ================ DESTRUCTING THE OBJECTS ====================

// // When destructuring the objecs, we need to specify the same name as key in objects [because this is not index-based like arrays]
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// //INFO: If we want to specify our own names then, we can do like this-----
// const { name: resturantName, openingHours: hours, categories: tags } = restaurant;
// console.log(resturantName, hours, tags);

// //INFO: Using default values while destructuring ---------
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // BUGBUGBUGBUG: Mutating Variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// // As, a and b are already defined ---
// // { a, b } = obj;   // BUG: whenever we start statement with {} javasscript expects that as a code block, and we can not assign anything to a code block.

// ({ a, b } = obj);   // FIXME: Wrap it under paranthesis ()

// // INFO: Nested Objects -------------
// const { fri: { open, close } } = openingHours;
// console.log(open, close);

// restaurant.orderDelivery({
//   time: "22:30",
//   address: "Shiv Vihar Campus, 19",
//   mainIndex: 2,
//   starterIndex: 2,
// });

//* ================ DESTRUCTING THE OBJECTS ENDS ====================


//* ================ DESTRUCTING THE ARRAYS ====================

// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// // INFO: Destructing the array--- or unpacking the array -----
// const [x, y, z] = arr;
// console.log(x, y, z);

// // Destructing the first and second value of categories array----
// let [first, second] = restaurant.categories;
// console.log(first, second);

// // Destructing the first and third value of categories array -----
// let [main, , secondary] = restaurant.categories;   // INFO: Just leave the hole where you want to skip the value
// console.log(main, secondary);       // Italian Vegetarian

// // INFO: Swapping
// [main, secondary] = [secondary, main];
// console.log(main, secondary);       // Vegetarian Italian

// const [starterOrder, mainOrder] = restaurant.order(2, 0);
// console.log(starterOrder, mainOrder);

// const [u, v, w] = [3, 2];
// console.log(u, v, w);       // 3 2 undefined

// // INFO: Deafault values
// const [p = 1, q = 1, r = 1] = [3, 2];
// console.log(p, q, r);       // 3 2 1

//* ================ DESTRUCTING THE ARRAYS END====================


//* ==================== SPREAD OPERATOR ==========================

// // HEADLINE: Spread in function calls:
// function myFunction(x, y, z) {
//   console.log(x,y,z);
// }
// let args = [0, 1, 2];
// // Trivial way -------
// myFunction(args[0], args[1], args[2]);
// // Using Apply method -----------
// myFunction.apply(null, args);
// // Using Spread operator method -----------
// myFunction(...args);


// //HEADLINE: Spread in array literals---------
// const arr = [7, 8, 9];
// const newArr = [2, 4, ...arr];
// console.log(newArr);

// console.log(...newArr);
// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// //HEADLINE: Copy an array
// let arr2 = [...arr];    //like, arr.slice()
// arr2.push(4);
// console.log(arr2);

// // INFO: Spread syntax effectively goes one level deep while copying an array.
// // Therefore, it may be unsuitable for copying multidimensional arrays, as the following example shows.
// // (The same is true with Object.assign() and spread syntax.)

// let a = [[1], [2], [3]];
// let b = [...a];
// console.log(b);

// b.shift().shift();
// console.log(b); 
// //  Oh no!  Now array 'a' is affected as well:
// console.log(a);     //  [[], [2], [3]]

// // HEADLINE: join 2 arrays
// const joinArr = [...newMenu, ...arr2];
// console.log(joinArr);


// // INFO: Iterables: arrays, strings, maps, sets, objects
// // HEADLINE: Spread in object literals : proposed in ES2018
// let obj1 = { foo: 'bar', x: 42 };
// let obj2 = { foo: 'baz', y: 13 };

// let clonedObj = { ...obj1 };    // Object { foo: "bar", x: 42 }

// let mergedObj = { ...obj1, ...obj2 };   // Object { foo: "baz", x: 42, y: 13 }

// //HEADLINE: Spread in strings
// const str = 'Sarthak';
// // SPREAD, because on RIGHT side of =
// const letters = [...str, ' ', 'S.'];
// console.log(letters);

// //HEADLINE: USIng SPREAD as REST
// //INFO: spread operator can also be used to pack values
// // REST, because on LEFT side of =
// const [x, y, ...others] = [1, 2, 4, 5, 6];
// console.log(x, y, others);      // 1 2 [3, 4, 5]

// const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]
// console.log(pizza, risotto, otherFood);
// // INFO: We can use spread as REST in all iterables as well as in function arguments.

//* ================== SPREAD OPERATOR END ========================


//* =================== Short Circuiting (&& and ||) ===================

// // INFO: //? Logical operators can use any data type and return any type not just boolean type.
// console.log(3 || 'Sarthak');          // Both are truthy value => return 1st value
// console.log('' || "Sarthak");         // first value is falsy ans second is truthy => returns 2nd value
// console.log(true || 0);               // returns first value as it is truthy value
// console.log(undefined || null);       // returns second value as both are falsy
// console.log(undefined || 0 || '' || 'Hello' || null);   // Hello

// console.log("------AND------");
// console.log(0 && 'Sarthak');                      // 0 [because, js will not look at the second value as result will always be 0]
// console.log(7 && 'Sarthak');                      // Sarthak
// console.log('Hey' && 23 && null && 'sarthak');    // null [because js will not check further as result will always be falsy]

// // First way ----
// if (restaurant.orderPizza) {
//   restaurant.orderPizza();
// }
// // Second Way ----
// restaurant.orderPizza && restaurant.orderPizza()

//* ================= Short Circuiting (&& and ||) END =====================


//* ================= for-of loop =============================== 

// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu]
// for (const item of menu) console.log(item);

// // If you want indexes with items, then we can use Array.prototype.entries()
// console.log([...menu.entries()]);
// for (const item of menu.entries()) console.log(item);

//* ================ for-of loop END ===========================


//* =================== Optional Chaining (ES2020)=======================

// /*
// The optional chaining operator (?.) permits reading the value of a property located deep within a chain of connected objects without having to expressly validate that each reference in the chain is valid. 
// INFO: The ?. operator functions similarly to the . chaining operator, except that instead of causing an error if a reference is nullish (null or undefined), the expression short-circuits with a return value of undefined.

// INFO: When used with function calls, it returns undefined if the given function does not exist. 
// */

// // Lets imagine restaurant object is coming from real world data, so i dont know whether monday exists in or not ---

// // console.log(restaurant.openingHours.mon.open); // BUG: Uncaught TypeError, as mon not exists in object and we are trying to fetch open from monday.

// // FIXME: We can use optional Chaining. (If a particular chaining doesn't exists then it will immediately stops at that point)
// console.log(restaurant.openingHours.mon?.open); //if monday exists only then fetch open else resturn undefined.


// // HEADLINE: Exercise =====
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for (const day of days) {
//   // const open = restaurant.openingHours[day]?.open;
//   // WHen it recieves it undefined, turn it to infinity
//   let open = restaurant.openingHours[day]?.open || 'Infinity';
//   console.log("With || operator ==>>", `On ${day} we open at ${open}`);
//   // This generated a prob as we are using || which runs on falsy values so it considered 0 to be a false value and printed infinity, which is not acc to our need.
//   // FIXME: We can use coalescing operator (??) instead of (||), as it works on nullish values only.
//   open = restaurant.openingHours[day]?.open ?? 'Infinity';
//   console.log("With ?? operator ==>>", `On ${day} we open at ${open}`);
//   console.log("============================");
// }


// // HEADLINE: Optional Chaining on methods
// console.log(restaurant.order?.(1, 2) ?? "Method Doesn't Exsist");
// console.log(restaurant.orderPizza?.(1, 2) ?? "Method Doesn't Exsist");

// // We can use it with arrays as well
// const arr = [1, 2, 3, 4, 4, 2, 2, 4];
// console.log(arr?.[6]);


//* ============= Looping Objects: Object Keys, Values, and Entries ==========

// // Loop over keys -------------
// const properties = Object.keys(restaurant.openingHours);
// console.log(properties);

// for (const day of Object.keys(restaurant.openingHours)) {
//   console.log(day);
// }

// // Loop over value ------------
// const values = Object.values(restaurant.openingHours);
// console.log(values);

// for (const obj of Object.values(restaurant.openingHours)) {
//   console.log(obj);
// }

// // Loop over both key and value simultaneously
// // We have to use Object.enteries() method for objects unlike arrays.
// const enteries = Object.entries(restaurant.openingHours);
// console.log(enteries); // [ ["thu", {..}], ["fri", {}], ["sat", {}] ]

// for (const [key, {open, close}] of Object.entries(restaurant.openingHours)) {
//   console.log(key,": Opens at:",open,"  Closes at:", close);
// }

//* ================================================================= 


///////////////////////////////////////
//* ============= Coding Challenge #2 =============

// /* 
// Let's continue with our football betting app!

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }

// GOOD LUCK 😀
// */

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// // 1
// for (const [i, name] of game.scored.entries()) console.log(`Goal ${i + 1}: ${name}`);

// // 2
// let avg = 0, count = 0;
// for (const val of Object.values(game.odds)) {
//   avg += val;
//   count += 1;
// }
// console.log("Average:", avg / count);

// // 3
// for (const [i, obj] of Object.entries(game.odds)) {
//   // console.log(i, obj);
//   const teamName = game[i] ? 'Victory ' + game[i] : "Draw";
//   const st = `Odd of ${teamName}: ${obj}`
//   console.log(st);
// }

// // Bonus
// const scorer = {};
// for (const name of game.scored) {
//   scorer[name] ? scorer[name]++ : scorer[name] = 1; 
// }

// console.log(scorer);

//* ============= Coding Challenge #2 ENDS =============


//* ======================== SETS ========================

// const orderSet = new Set(['Pasta', 'Pasta', 'Pizza', 'Risotta', 'Pasta']);
// console.log(orderSet);

// console.log(orderSet.size);                 //Similar to array.length
// console.log(orderSet.has('Bread'));         // Similar to array.includes()
// console.log(orderSet.has('Pizza'));         // Similar to array.includes()

// orderSet.add('Garlic Bread');
// console.log(orderSet.has('Garlic Bread'));  // true

// orderSet.delete('Garlic Bread');
// console.log(orderSet.has('Garlic Bread'));  // false

// // Sets are iterables --> we can loop over them
// for (const order of orderSet) console.log(order);

// // Delete all elements of set 
// orderSet.clear();
// console.log(orderSet);

//* ===================== SETS ENDS ======================


//* ======================= MAPS =========================

// //INFO: In maps data is also stroed as key-value pairs, like objects. But the main difference is that in objects key's data type is always string whereas in maps keys can have any datatype.

// const rest = new Map();
// // We can add key-value pair in maps by using map.set() function....
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze Portugal');
// console.log(rest.set(2, 'Lisbon, Portugal'));     // This shows that set()fn returns the updated map object.

// // That's why we can do something like this---
// rest.set('categories', ['a', 'b', 'c', 'd']).set('open', 11).set('close', 23).set(true, 'We are Open 😊').set(false, 'We are Closed 😌');

// console.log(rest);
// console.log(rest.get(true));


// // If we try to get the value of key which is not present, then it returns undefined.
// console.log(rest.get('abs'));     // Undefined


// // has() method
// console.log(rest.has('categories'));  // true
// console.log(rest.has('abss'));        // false

// // delete() method
// rest.set('abss', undefined);
// rest.delete('abss');

// //HEADLINE: Using array as key -----
// // 1)
// // rest.set([1, 2], 'temp');
// // console.log(rest);
// // console.log(rest.get([1, 2]));          // BUG: Undefined

// // 2) FIXME: We are getting undefined because [1,2] refers to different memory location when adding it to map. And refers to different location when we are fetching the value using [1,2]
// const arr = [1, 2];
// rest.set(arr, 'Temp');          // Now both will refer to same location.
// console.log(rest.get(arr));


// // HEADLINE: Another way of initializing the map----
// const questions = new Map([
//   ['question', 'What is the best programming language in the world ?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'Python'],
//   [4, 'JavaScript']
// ])
// console.log(questions);

// // HEADLINE: Convert object to map ------
// console.log(Object.entries(restaurant.openingHours));   // Same format as we passed in above map creation.

// const hoursMap = new Map(Object.entries(restaurant.openingHours));
// console.log(hoursMap);

// // Loop over the map -------
// for (const [key, value] of questions) {
//   if(typeof key == 'number') console.log(`Answer ${key}: ${value}`);
// }

// // Convert map to array
// console.log([...questions]);

// console.log(questions.keys());        // Returns MapIterator
// console.log(questions.values());      // Returns MapIterator

// console.log([...questions.keys()]);
// console.log([...questions.values()]);

//* ======================= MAPS ENDS =========================

//* ======================= STRINGS ===========================
const st = "sArThak";
const s = st.replace('A', 'a');
console.log(s);

st.charAt(2);

st.replace()