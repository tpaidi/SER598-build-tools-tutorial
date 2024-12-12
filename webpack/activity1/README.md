
## Activity 1: Without Rollup ##

### For this activity ###

### Folder Structure ###
```
activity1/
├── index.html
├── index.js
├── math.js
```

### Code ###

**math.js**
```javascript
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

// Attach functions to the global window object
window.add = add;
window.multiply = multiply;
```

**index.js**
```javascript
console.log("Sum:", add(2, 3));    // Access global add function
console.log("Product:", multiply(2, 3)); // Access global multiply function
```

**index.html**
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Without Rollup</title>
        <!-- Load scripts manually in the incorrect order -->
        <script src="index.js"></script>
        <script src="math.js"></script>
        <!-- The above throws an error -->
    </head>
    <body>
        <h1>Without Rollup</h1>
    </body>
</html>
```

**Correct Alternative**

**index.html**
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Without Rollup</title>
        <!-- Load scripts manually in the correct order -->
        <script src="math.js"></script>
        <script src="index.js"></script>
        <!-- The above throws an error -->
    </head>
    <body>
        <h1>Without Rollup</h1>
    </body>
</html>
```

**Why It Fails**
- Manual Dependency Management:  
  If the `<script>` tags in index.html are not in the correct order (for example, loading `index.js` before `math.js`), the browser will throw an error like:  
  `Uncaught ReferenceError: add is not defined`

- Global Namespace Pollution:  
  All functions are attached to the global `window` object, increasing the risk of name conflicts as the application grows.

- Performance Issues:  
  Each `<script>` tag results in a separate HTTP request, slowing down page load times.
