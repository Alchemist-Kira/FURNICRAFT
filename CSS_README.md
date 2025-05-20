# CSS Documentation for FurniCraft Website

## Table of Contents
1. [Product Card Hover Effect](#product-card-hover-effect)
2. [Scrollbar Styling](#scrollbar-styling)
3. [Form Input Focus Styles](#form-input-focus-styles)
4. [Button Hover Effects](#button-hover-effects)
5. [Cart Item Animation](#cart-item-animation)

## Product Card Hover Effect
```css
.product-card {
    transition: transform 0.3s ease-in-out;
}

.product-card:hover {
    transform: translateY(-5px);
}
```
- `transition`: Creates smooth animation for transform property
- `transform`: Moves element up by 5 pixels on hover
- `ease-in-out`: Smooth acceleration and deceleration
- Purpose: Creates an interactive "lifting" effect when hovering over products

## Scrollbar Styling
```css
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
```
- `::-webkit-scrollbar-thumb`: Targets the scrollbar thumb (draggable part)
- `:hover`: Applies style when mouse hovers over scrollbar
- `background: #555`: Changes scrollbar color to dark gray
- Purpose: Improves scrollbar visibility and user experience

## Form Input Focus Styles
```css
input:focus, textarea:focus {
    outline: none;
    border-color: #4F46E5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
```
- `:focus`: Applies styles when input is selected
- `outline: none`: Removes default browser outline
- `border-color`: Changes border color to indigo
- `box-shadow`: Adds subtle glow effect
- Purpose: Provides visual feedback when interacting with form elements

## Button Hover Effects
```css
button {
    transition: all 0.3s ease-in-out;
}

button:hover {
    transform: translateY(-1px);
}
```
- `transition: all`: Animates all changing properties
- `transform`: Slightly lifts button on hover
- Purpose: Makes buttons more interactive and engaging

## Cart Item Animation
```css
.cart-item {
    animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
```
- `animation`: Applies the slideIn animation
- `@keyframes`: Defines the animation sequence
- `from/to`: Specifies start and end states
- `opacity`: Controls transparency
- `transform`: Moves element horizontally
- Purpose: Creates smooth entrance animation for cart items

## CSS Properties Explained

### Transitions
- `transition`: Shorthand for transition properties
- `transition-property`: Which properties to animate
- `transition-duration`: How long the animation takes
- `transition-timing-function`: How the animation progresses
- `transition-delay`: When the animation starts

### Transforms
- `transform`: Applies 2D or 3D transformations
- `translateX/Y`: Moves element horizontally/vertically
- `scale`: Changes element size
- `rotate`: Rotates element
- `skew`: Skews element

### Animations
- `animation`: Shorthand for animation properties
- `animation-name`: Name of the keyframes
- `animation-duration`: How long animation takes
- `animation-timing-function`: How animation progresses
- `animation-delay`: When animation starts
- `animation-iteration-count`: How many times to repeat
- `animation-direction`: Which direction to play
- `animation-fill-mode`: How to apply styles before/after
- `animation-play-state`: Whether animation is running/paused

### Pseudo-classes
- `:hover`: When mouse is over element
- `:focus`: When element is selected
- `:active`: When element is being clicked
- `:visited`: For visited links
- `:first-child`: First element in parent
- `:last-child`: Last element in parent

### Box Model
- `margin`: Space outside element
- `padding`: Space inside element
- `border`: Element's border
- `box-shadow`: Adds shadow effect
- `border-radius`: Rounds corners

### Colors and Opacity
- `color`: Text color
- `background-color`: Background color
- `opacity`: Element transparency
- `rgba()`: Color with alpha channel
- `hsla()`: Color with hue, saturation, lightness, alpha

### Layout
- `display`: How element is displayed
- `position`: How element is positioned
- `z-index`: Stack order
- `float`: Element floating
- `clear`: Clearing floats 