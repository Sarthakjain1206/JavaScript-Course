'use strict';

let arr = ['a', 'b', 'c', 'd', 'e', 'f'];

//HEADLINE: SLICE Method ------ It do not mutates the array.
console.log(arr.slice(2));        // args -> [starting_index, ending_index)
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
// For shallow copy we can use slice method
console.log(arr.slice());


//HEADLINE: SPLICE method ----- It mutates the array.
console.log(arr.splice(4));
console.log(arr);

console.log(arr.splice(1, 2));    // args -> [starting_index, delete_count]
console.log(arr);

//HEADLINE: Reverse method--------
arr = ['a', 'b', 'c', 'd', 'e', 'f'];
console.log(arr.reverse());       // It mutates the array.
console.log(arr);

//HEADLINE: CONCAT
let arr2 = ['g', 'h', 'i', 'j', 'k', 'l'];
let concatLetters = arr.concat(arr2);  // similar to, let concatLetters = [...arr, ...arr2]
console.log(concatLetters);


//HEADLINE: JOIN
console.log(concatLetters.join(' -- '));
