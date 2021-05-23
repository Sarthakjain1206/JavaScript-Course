// Exporting Module
console.log("Exporting Module");

// All Top level variables are private in modules, so we cannot access these variables directly by other modules without exporting them.
// That means they are scoped only to the current module.
const shippingCost = 10;
const cart = [];

// If we want script.js to use shippingCost variable then we must export it.

// Two types of exports:
// 1. Named Exports
// 2. Default Exports

// Named Exports ----- [several per module with name]
export const addToCart = function(product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export {totalPrice, totalQuantity as tq};


// Default Exports ---- [one per module, and also without name]
export default function(product, quantity) {
    cart.push( {product, quantity} );
    console.log(`${quantity} ${product} added to cart`);
}