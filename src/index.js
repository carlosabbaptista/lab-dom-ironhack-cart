// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');

  //... your code goes here
  // Get the DOM elements for price and quantity
  const priceElement = product.querySelector('.price span');
  const quantityInput = product.querySelector('.quantity input');

  // Extract the values from the DOM elements
  const price = parseFloat(priceElement.innerHTML); // Parse price as a floating-point number
  const quantity = quantityInput.valueAsNumber; // Parse quantity as a number

  const subtotal = price * quantity;

  // Now, we should update the subtotal value in the DOM
  const subtotalElement = product.querySelector('.subtotal span');
  // Display the subtotal with two decimal places
  subtotalElement.innerHTML = subtotal.toFixed(2); 

    // Return the calculated subtotal value
  return subtotal;
}

// function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  // const singleProduct = document.querySelector('.product');
  // updateSubtotal(singleProduct);
  // end of test

  // ITERATION 2
  //... your code goes here
function calculateAll() {
  const productRows = document.getElementsByClassName('product');
  let total = 0;

  for (const productRow of productRows) {
    // ITERATION 3
    //... your code goes here
    const subtotal = updateSubtotal(productRow);
    total += subtotal;
  }

    // Update the DOM element with the total value
  const totalValue = document.getElementById('total-value');
  totalValue.querySelector('span').textContent = total.toFixed(2);
}


// }

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  //... your code goes here
  // Access the parent node of the button, which is the product row
  const productRow = target.parentNode.parentNode;

  // Remove the product row from the DOM
  productRow.parentNode.removeChild(productRow);

  // After removing the product, recalculate the total
  calculateAll();
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  //... your code goes here
  // Add event listeners to "Remove" buttons
  const removeButtons = document.querySelectorAll('.btn-remove');
  removeButtons.forEach((button) => {
    button.addEventListener('click', removeProduct);
  });

  // Get a reference to the "Create Product" button
  const createProductBtn = document.getElementById('create');

  // Add a click event listener to create a new product
createProductBtn.addEventListener('click', createProduct);
});

// ITERATION 5

function createProduct() {
  //... your code goes here
    // Get the input fields for product name and unit price
    const nameInput = document.querySelector('tfoot input[placeholder="Product Name"]');
    const priceInput = document.querySelector('tfoot input[placeholder="Product Price"]');
  
    // Extract values from the input fields
    const productName = nameInput.value;
    const productPrice = parseFloat(priceInput.value); // Parse the price as a floating-point number
  
    // Validate the input
    if (productName.trim() === '' || isNaN(productPrice) || productPrice < 0) {
      alert('Please enter a valid product name and price.');
      return;
    }
  
    // Clone a product row template
    const productTemplate = document.querySelector('.product');
    const newProduct = productTemplate.cloneNode(true);
  
    // Set the product name and unit price in the new product row
    newProduct.querySelector('.name span').textContent = productName;
    newProduct.querySelector('.price span').textContent = productPrice.toFixed(2);
  
    // Add the new product to the cart
    const cartBody = document.querySelector('tbody');
    cartBody.appendChild(newProduct);
  
    // Clear the input fields
    nameInput.value = '';
    priceInput.value = '0';
  
    // Add event listeners for the new "Remove" button
    const removeButton = newProduct.querySelector('.btn-remove');
    removeButton.addEventListener('click', removeProduct);
  
    // Update the total
    calculateAll();
}