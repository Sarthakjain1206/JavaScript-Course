// Importing Module

// When we have to connect the module to HTML file, we have to specify the type as "module"

/*  INFO
 !  All importing statements are hoisted to the top. [Always present at the top of script file]
 *  The static import statement is used to import read only live bindings which are exported by another module.
 !  Imported modules are in strict mode whether you declare them as such or not. 
 *  The import statement cannot be used in embedded scripts unless such script has a type="module". 
 !  Bindings imported are called live bindings because they are updated by the module that exported the binding. 
 ! Imports and exports must be at the top-level i.e importing or exporting inside a function or block will generate error.
 *  For more Info: https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22649453#overview
 *                 https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22649463#overview
 */

// import './shoppingCart.js';
console.log("Importing Module");       // The code in exporting module is executed first after that importing module code will execute.


// Importing named exports requires {}
// import {addToCart} from './shoppingCart.js';

// import {addToCart, totalPrice as tp, tq} from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(tp, tq);

// Import Everything.
// ShoppingCart will be an object which contains everything which was exported by module
import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice, ShoppingCart.tq);


// importing from Default Export
import add from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);




// HEADLINE CommonJS Module system (currently used only by node js) [it will not work in browser]

// export.addToCart = function(product, quantity) {
//     cart.push({product, quantity});
//     console.log(`${quantity} ${product} added to cart`);
// };

// // Import
// const { addToCart } = require('./shoppingCart.js');



// importing file from lodash package --------
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
