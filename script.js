// Global variables
let cart = [];
const DELIVERY_CHARGE = 50;
const SHIPPING_CHARGE = 100;
const DISCOUNT_THRESHOLD = 1000;
const DISCOUNT_PERCENTAGE = 10;
const FREE_DELIVERY_THRESHOLD = 1500;

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const cartItems = document.querySelector('.cart-items');
const subtotalElement = document.querySelector('.subtotal');
const deliveryChargeElement = document.querySelector('.delivery-charge');
const shippingChargeElement = document.querySelector('.shipping-charge');
const discountElement = document.querySelector('.discount');
const totalElement = document.querySelector('.total');
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

// Reviews data
const reviews = [
    {
        name: "Mahfuz",
        rating: 5,
        comment: "Amazing products and fast delivery! Will definitely shop here again."
    },
    {
        name: "Aqib",
        rating: 4,
        comment: "Great quality items at reasonable prices. Customer service is excellent."
    },
    {
        name: "Imran",
        rating: 5,
        comment: "The best online shopping experience I've had. Highly recommended!"
    },
    {
        name: "Hossain",
        rating: 4,
        comment: "Good selection of products and easy checkout process."
    }
];

// Place order functionality
function placeOrder() {
    if (cart.length === 0) {
        return;
    }

    // Create confirmation message
    const confirmationMessage = document.createElement('div');
    confirmationMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4';
    confirmationMessage.innerHTML = `
        <strong class="font-bold">Order Confirmed!</strong>
        <span class="block sm:inline"> Thank you for your purchase. Your order has been placed successfully.</span>
    `;

    // Insert confirmation message at the top of cart section
    const cartSection = document.querySelector('#cart');
    cartSection.insertBefore(confirmationMessage, cartSection.firstChild);

    // Clear the cart
    cart = [];
    updateCart();
    updateCartSummary();

    // Remove confirmation message after 5 seconds
    setTimeout(() => {
        confirmationMessage.remove();
    }, 5000);
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    initializeReviews();
    initializeMobileMenu();
    updateCartSummary();

    // Add event listener to place order button
    const placeOrderButton = document.querySelector('#cart button');
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default button behavior
            placeOrder();
        });
    }
});

// Fetch products from API
async function fetchProducts() {
   
    const response = await fetch('https://alchemist-kira.github.io/shop-api/product.json');
    const data = await response.json();
    displayProducts(data.products);
}

// Display products in the grid
function displayProducts(products) {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <div class="relative">
                <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-cover">
                <div class="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-sm font-semibold text-indigo-600">
                    <i class="fas fa-tag mr-1"></i>${product.category}
                </div>
            </div>
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-lg font-semibold mb-2">${product.title}</h3>
                <p class="text-gray-600 text-sm mb-2 line-clamp-2">${product.description}</p>
                <div class="flex items-center mb-2">
                    <div class="text-yellow-400 flex">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating.rate))}${'<i class="far fa-star"></i>'.repeat(5 - Math.floor(product.rating.rate))}
                    </div>
                    <span class="text-gray-500 text-sm ml-2">(${product.rating.count})</span>
                </div>
                <p class="text-xl font-bold text-indigo-600 mb-4">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})" 
                        class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 mt-auto">
                    <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart functionality
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

// Update cart display
function updateCart() {
    if (!cartItems) return;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between py-4 border-b">
            <div class="flex items-center space-x-4">
                <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded">
                <div>
                    <h4 class="font-medium">${item.title}</h4>
                    <p class="text-sm text-gray-600">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" 
                        class="text-gray-500 hover:text-indigo-600">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="text-gray-600">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" 
                        class="text-gray-500 hover:text-indigo-600">
                    <i class="fas fa-plus"></i>
                </button>
                <button onclick="removeFromCart(${item.id})" 
                        class="text-red-500 hover:text-red-600 ml-2">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
        updateCartSummary();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    updateCartSummary();
}

// Update cart summary
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

// Initialize reviews
function initializeReviews() {
    const reviewsContainer = document.querySelector('#reviews .grid');
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = reviews.map(review => `
        <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center mb-4">
                <div class="text-yellow-400 flex">
                    ${'<i class="fas fa-star"></i>'.repeat(review.rating)}${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
                </div>
            </div>
            <p class="text-gray-600 mb-4">${review.comment}</p>
            <p class="font-semibold">- ${review.name}</p>
        </div>
    `).join('');
}

// Mobile menu functionality
function initializeMobileMenu() {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}
