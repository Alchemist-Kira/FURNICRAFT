# JavaScript Documentation for FurniCraft Website

## Table of Contents
1. [Global Variables](#global-variables)
2. [DOM Elements](#dom-elements)
3. [Initialization](#initialization)
4. [Product Management](#product-management)
5. [Cart Management](#cart-management)
6. [Review System](#review-system)
7. [Mobile Menu](#mobile-menu)

## Global Variables
```javascript
let cart = [];
const DELIVERY_CHARGE = 50;
const SHIPPING_CHARGE = 100;
const DISCOUNT_THRESHOLD = 1000;
const DISCOUNT_PERCENTAGE = 10;
const FREE_DELIVERY_THRESHOLD = 1500;
```
- `cart`: Array to store cart items
- Constants for various charges and thresholds
- Purpose: Centralized configuration and state management

## DOM Elements
```javascript
const productsGrid = document.querySelector('.products-grid');
const cartItems = document.querySelector('.cart-items');
const subtotalElement = document.querySelector('.subtotal');
// ... more elements
```
- `document.querySelector()`: Selects first matching element
- Purpose: Caches DOM elements for better performance

## Initialization
```javascript
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    initializeReviews();
    initializeMobileMenu();
    updateCartSummary();
});
```
- `DOMContentLoaded`: Event fires when HTML is fully loaded
- Purpose: Initializes all website features

## Product Management

### Fetching Products
```javascript
async function fetchProducts() {
    const response = await fetch('https://alchemist-kira.github.io/shop-api/product.json');
    const data = await response.json();
    displayProducts(data.products);
}
```
- `async/await`: Handles asynchronous operations
- `fetch`: Gets data from API
- Purpose: Loads product data from external source

### Displaying Products
```javascript
function displayProducts(products) {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <!-- Product HTML template -->
        </div>
    `).join('');
}
```
- Template literals: Creates HTML strings
- `map()`: Transforms array of products to HTML
- `join('')`: Combines array into string
- Purpose: Renders products in the grid

## Cart Management

### Adding to Cart
```javascript
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    updateCartSummary();
}
```
- `find()`: Searches array for matching item
- Spread operator: Copies object properties
- Purpose: Manages cart item addition

### Updating Cart
```javascript
function updateCart() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <!-- Cart item HTML template -->
        </div>
    `).join('');
}
```
- Purpose: Refreshes cart display

### Cart Summary
```javascript
function updateCartSummary() {
    if (!subtotalElement || !deliveryChargeElement || !shippingChargeElement || !discountElement || !totalElement) return;

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = subtotal >= DISCOUNT_THRESHOLD ? (subtotal * DISCOUNT_PERCENTAGE / 100) : 0;
    
    // Apply free delivery if subtotal is over threshold
    const finalDeliveryCharge = cart.length > 0 ? (subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE) : 0;
    const finalShippingCharge = cart.length > 0 ? (subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : SHIPPING_CHARGE) : 0;
    
    const total = subtotal + finalDeliveryCharge + finalShippingCharge - discount;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    deliveryChargeElement.textContent = cart.length > 0 ? `$${finalDeliveryCharge.toFixed(2)}` : '$0.00';
    shippingChargeElement.textContent = cart.length > 0 ? `$${finalShippingCharge.toFixed(2)}` : '$0.00';
    discountElement.textContent = `$${discount.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}
```

#### How Cart Summary Works

1. **Initial Check**
   ```javascript
   if (!subtotalElement || !deliveryChargeElement || !shippingChargeElement || !discountElement || !totalElement) return;
   ```
   - Checks if all required DOM elements exist
   - Returns early if any element is missing to prevent errors

2. **Subtotal Calculation**
   ```javascript
   const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
   ```
   - Uses `reduce()` to sum up all items in cart
   - For each item: price × quantity
   - Starts from 0 (initial value)

3. **Discount Calculation**
   ```javascript
   const discount = subtotal >= DISCOUNT_THRESHOLD ? (subtotal * DISCOUNT_PERCENTAGE / 100) : 0;
   ```
   - Checks if subtotal meets discount threshold ($1000)
   - If yes: applies 10% discount
   - If no: no discount (0)

4. **Delivery and Shipping Charges**
   ```javascript
   const finalDeliveryCharge = cart.length > 0 ? (subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE) : 0;
   const finalShippingCharge = cart.length > 0 ? (subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : SHIPPING_CHARGE) : 0;
   ```
   - First checks if cart has items (`cart.length > 0`)
   - If cart is empty: charges are 0
   - If cart has items:
     - Checks if subtotal meets free delivery threshold ($1500)
     - If yes: charges are 0
     - If no: applies normal charges ($50 delivery, $100 shipping)

5. **Total Calculation**
   ```javascript
   const total = subtotal + finalDeliveryCharge + finalShippingCharge - discount;
   ```
   - Adds all components: subtotal + delivery + shipping
   - Subtracts discount
   - This gives final amount to pay

6. **Display Updates**
   ```javascript
   subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
   deliveryChargeElement.textContent = cart.length > 0 ? `$${finalDeliveryCharge.toFixed(2)}` : '$0.00';
   shippingChargeElement.textContent = cart.length > 0 ? `$${finalShippingCharge.toFixed(2)}` : '$0.00';
   discountElement.textContent = `$${discount.toFixed(2)}`;
   totalElement.textContent = `$${total.toFixed(2)}`;
   ```
   - Updates each element with calculated values
   - Uses `toFixed(2)` to show 2 decimal places
   - Shows $0.00 for charges when cart is empty
   - Formats all numbers as currency with $ symbol

#### Example Scenarios

1. **Empty Cart**
   - Subtotal: $0.00
   - Delivery: $0.00
   - Shipping: $0.00
   - Discount: $0.00
   - Total: $0.00

2. **Cart with $800 Total**
   - Subtotal: $800.00
   - Delivery: $50.00
   - Shipping: $100.00
   - Discount: $0.00 (below $1000 threshold)
   - Total: $950.00

3. **Cart with $1200 Total**
   - Subtotal: $1200.00
   - Delivery: $50.00
   - Shipping: $100.00
   - Discount: $120.00 (10% of $1200)
   - Total: $1230.00

4. **Cart with $1600 Total**
   - Subtotal: $1600.00
   - Delivery: $0.00 (free delivery over $1500)
   - Shipping: $0.00 (free shipping over $1500)
   - Discount: $160.00 (10% of $1600)
   - Total: $1440.00

### Placing Order
```javascript
function placeOrder() {
    if (cart.length === 0) return;

    const confirmationMessage = document.createElement('div');
    confirmationMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4';
    // ... message content

    cart = [];
    updateCart();
    updateCartSummary();
}
```
- `createElement()`: Creates new DOM element
- Purpose: Handles order placement and confirmation

## Review System
```javascript
const reviews = [
    {
        name: "Mahfuz",
        rating: 5,
        comment: "Amazing products and fast delivery!"
    },
    // ... more reviews
];

function initializeReviews() {
    const reviewsContainer = document.querySelector('#reviews .grid');
    reviewsContainer.innerHTML = reviews.map(review => `
        <!-- Review HTML template -->
    `).join('');
}
```
- Array of review objects
- Purpose: Displays customer reviews

## Mobile Menu
```javascript
function initializeMobileMenu() {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}
```
- `addEventListener()`: Attaches event handler
- `classList.toggle()`: Toggles CSS class
- Purpose: Handles mobile menu functionality

## JavaScript Concepts Used

### Variables and Constants
- `let`: Mutable variables
- `const`: Immutable variables
- Purpose: Data storage and configuration

### Functions
- Regular functions
- Arrow functions
- Async functions
- Purpose: Code organization and reusability

### Array Methods
- `map()`: Transform array elements
- `find()`: Search array
- `reduce()`: Calculate totals
- `filter()`: Filter array elements
- Purpose: Data manipulation

### DOM Manipulation
- `querySelector()`: Select elements
- `innerHTML`: Update content
- `createElement()`: Create elements
- `classList`: Manage classes
- Purpose: Update webpage content

### Events
- `addEventListener()`: Handle events
- `DOMContentLoaded`: Page load
- `click`: User clicks
- Purpose: User interaction handling

### Async/Await
- `async`: Declare async function
- `await`: Wait for promise
- `fetch()`: Get data
- Purpose: Handle asynchronous operations

### Template Literals
- Backticks (`)
- `${expression}`
- Purpose: Create dynamic strings

### Object Methods
- Spread operator
- Object destructuring
- Purpose: Object manipulation

### Error Handling
- Try/catch blocks
- Error messages
- Purpose: Graceful error management 