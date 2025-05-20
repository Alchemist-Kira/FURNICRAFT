# HTML Documentation for FurniCraft Website

## Table of Contents
1. [Basic Structure](#basic-structure)
2. [Meta Tags](#meta-tags)
3. [External Resources](#external-resources)
4. [Navigation Bar](#navigation-bar)
5. [Hero Section](#hero-section)
6. [Products Section](#products-section)
7. [Cart Section](#cart-section)
8. [Contact Section](#contact-section)
9. [Footer](#footer)

## Basic Structure
```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <!-- Meta tags and resources -->
</head>
<body class="bg-gray-50">
    <!-- Website content -->
</body>
</html>
```
- `<!DOCTYPE html>`: Declares the document type as HTML5
- `lang="en"`: Specifies the language as English
- `class="scroll-smooth"`: Enables smooth scrolling behavior
- `class="bg-gray-50"`: Sets a light gray background color using Tailwind CSS

## Meta Tags
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FurniCraft - Premium Furniture Store</title>
```
- `charset="UTF-8"`: Specifies character encoding
- `viewport`: Makes the website responsive on mobile devices
- `title`: Sets the browser tab title

## External Resources
```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="styles.css">
```
- Tailwind CSS: Utility-first CSS framework
- Flowbite: UI component library
- Font Awesome: Icon library
- Custom CSS file

## Navigation Bar
```html
<nav class="bg-white shadow-lg fixed w-full z-[9999] top-0 left-0">
    <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex items-center">
                <a href="#" class="text-2xl font-bold text-indigo-600">FurniCraft</a>
            </div>
            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center space-x-8">
                <!-- Navigation Links -->
            </div>
            <!-- Mobile Menu Button -->
            <div class="md:hidden">
                <button class="mobile-menu-button">
                    <i class="fas fa-bars w-6 h-6"></i>
                </button>
            </div>
        </div>
    </div>
</nav>
```
- `fixed`: Makes the navigation bar stick to the top
- `z-[9999]`: Ensures the nav stays above other elements
- `hidden md:flex`: Hides on mobile, shows on medium screens
- `md:hidden`: Shows on mobile, hides on medium screens

## Hero Section
```html
<div id="home" class="relative h-screen pt-16">
    <div id="default-carousel" class="relative h-full" data-carousel="slide">
        <!-- Carousel Items -->
    </div>
</div>
```
- `h-screen`: Sets height to 100% of viewport height
- `pt-16`: Adds padding-top to account for fixed navbar
- `data-carousel`: Flowbite carousel attributes

## Products Section
```html
<section id="products" class="max-w-7xl mx-auto px-4 py-12">
    <h2 class="text-3xl font-bold text-center mb-8">Featured Furniture</h2>
    <div class="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- Products will be dynamically inserted here -->
    </div>
</section>
```
- `max-w-7xl`: Sets maximum width
- `grid-cols-1 sm:grid-cols-2`: Responsive grid layout
- `gap-6`: Adds spacing between grid items

## Cart Section
```html
<section id="cart" class="max-w-7xl mx-auto px-4 py-12 bg-gray-100">
    <h2 class="text-3xl font-bold text-center mb-8">Your Cart</h2>
    <div class="cart-items space-y-4">
        <!-- Cart items will be dynamically inserted here -->
    </div>
    <div class="cart-summary mt-8 p-6 bg-white rounded-lg shadow-md">
        <!-- Cart summary details -->
    </div>
</section>
```
- `space-y-4`: Adds vertical spacing between cart items
- `rounded-lg`: Rounds the corners
- `shadow-md`: Adds medium shadow effect

## Contact Section
```html
<section id="contact" class="max-w-7xl mx-auto px-4 py-12 bg-gray-100">
    <h2 class="text-3xl font-bold text-center mb-8">Contact Us</h2>
    <div class="max-w-lg mx-auto">
        <form class="space-y-4">
            <!-- Form fields -->
        </form>
    </div>
</section>
```
- `max-w-lg`: Sets maximum width for the form
- `space-y-4`: Adds vertical spacing between form elements

## Footer
```html
<footer class="bg-gray-800 text-white py-8">
    <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Footer content -->
        </div>
    </div>
</footer>
```
- `bg-gray-800`: Dark background color
- `grid-cols-1 md:grid-cols-3`: Responsive grid layout
- `gap-8`: Adds spacing between grid items

## Common Tailwind CSS Classes Used
- `flex`: Creates a flex container
- `items-center`: Centers items vertically
- `justify-between`: Spaces items evenly
- `text-center`: Centers text
- `rounded`: Rounds corners
- `shadow`: Adds shadow effect
- `hover:`: Applies styles on hover
- `transition`: Adds smooth transitions
- `bg-{color}-{shade}`: Background colors
- `text-{color}-{shade}`: Text colors
- `p-{size}`: Padding
- `m-{size}`: Margin
- `w-{size}`: Width
- `h-{size}`: Height 