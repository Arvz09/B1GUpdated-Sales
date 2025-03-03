const productOptions = [
  { id: "product-a", name: "Product A", price: 10.99 },
  { id: "product-b", name: "Product B", price: 24.99 },
  { id: "product-c", name: "Product C", price: 15.50 },
  { id: "product-d", name: "Product D", price: 32.99 },
  { id: "product-e", name: "Product E", price: 8.75 },
  { id: "product-f", name: "Product F", price: 19.95 },
  { id: "product-g", name: "Product G", price: 27.50 },
  { id: "product-h", name: "Product H", price: 14.25 },
  { id: "product-i", name: "Product I", price: 21.75 },
  { id: "product-j", name: "Product J", price: 36.49 },
  { id: "product-k", name: "Product K", price: 12.99 },
  { id: "product-l", name: "Product L", price: 29.95 },
  { id: "product-m", name: "Product M", price: 17.25 },
  { id: "product-n", name: "Product N", price: 22.50 },
  { id: "product-o", name: "Product O", price: 39.99 },
];

// Mock existing clients data
const existingClients = [
  { id: "client-001", name: "John Doe", shopName: "Doe's Shop", email: "john@example.com" },
  { id: "client-002", name: "Jane Smith", shopName: "Smith Retail", email: "jane@example.com" },
  { id: "client-003", name: "Robert Johnson", shopName: "Johnson Mart", email: "robert@example.com" },
  { id: "client-004", name: "Emily Wilson", shopName: "Wilson Goods", email: "emily@example.com" },
  { id: "client-005", name: "Michael Brown", shopName: "Brown's Store", email: "michael@example.com" },
  { id: "client-006", name: "Sarah Davis", shopName: "Davis Retail", email: "sarah@example.com" },
  { id: "client-007", name: "David Miller", shopName: "Miller Outlet", email: "david@example.com" },
  { id: "client-008", name: "Jennifer Wilson", shopName: "Jennifer's Shop", email: "jennifer@example.com" },
  { id: "client-009", name: "Thomas Clark", shopName: "Clark Enterprises", email: "thomas@example.com" },
  { id: "client-010", name: "Lisa Anderson", shopName: "Anderson Goods", email: "lisa@example.com" },
  { id: "client-011", name: "James Taylor", shopName: "Taylor Market", email: "james@example.com" },
  { id: "client-012", name: "Patricia Moore", shopName: "Moore Supplies", email: "patricia@example.com" },
];

// DOM Elements
const clientSearch = document.getElementById('client-search');
const clientList = document.getElementById('client-list');
const selectedClientInfo = document.getElementById('selected-client-info');
const selectedClientDetails = document.getElementById('selected-client-details');
const existingClientProducts = document.getElementById('existing-client-products');
const existingClientSubmit = document.getElementById('existing-client-submit');
const existingClientForm = document.getElementById('existing-client-form');

// State
let selectedClientId = null;
let isSubmitting = false;

// Initialize the page
function initPage() {
  // Populate product lists
  renderProductsList(existingClientProducts);
  
  // Populate client list
  renderClientsList(existingClients);
  
  // Setup event listeners
  setupEventListeners();
}

// Render products list
function renderProductsList(container) {
  container.innerHTML = '';
  
  productOptions.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product-item';
    productElement.innerHTML = `
      <div class="product-info">
        <p class="product-name">${product.name}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
      <div class="product-quantity-container">
        <input 
          type="number" 
          name="products.${product.id}" 
          min="0" 
          value="0" 
          class="product-quantity"
        >
        <p class="error-message product-error" id="product-${product.id}-error"></p>
      </div>
    `;
    container.appendChild(productElement);
  });
}

// Render clients list
function renderClientsList(clients) {
  clientList.innerHTML = '';
  
  if (clients.length === 0) {
    clientList.innerHTML = `
      <div class="p-4 text-center text-neutral-500">
        No clients found matching "${clientSearch.value}"
      </div>
    `;
    return;
  }
  
  clients.forEach(client => {
    const clientElement = document.createElement('div');
    clientElement.className = `client-item ${selectedClientId === client.id ? 'selected' : ''}`;
    clientElement.dataset.clientId = client.id;
    clientElement.innerHTML = `
      <input 
        type="radio" 
        id="client-${client.id}"
        name="clientSelection"
        ${selectedClientId === client.id ? 'checked' : ''}
        class="client-radio"
      >
      <label for="client-${client.id}" class="client-info">
        <div class="client-name">${client.name}</div>
        <div class="client-shop">${client.shopName}</div>
        <div class="client-email">${client.email}</div>
      </label>
    `;
    
    clientElement.addEventListener('click', () => {
      selectClient(client.id);
    });
    
    clientList.appendChild(clientElement);
  });
}

// Select a client
function selectClient(clientId) {
  selectedClientId = clientId;
  
  // Update UI
  document.querySelectorAll('.client-item').forEach(item => {
    item.classList.toggle('selected', item.dataset.clientId === clientId);
    const radio = item.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = item.dataset.clientId === clientId;
    }
  });
  
  // Show selected client info
  const client = existingClients.find(c => c.id === clientId);
  if (client) {
    selectedClientInfo.classList.remove('hidden');
    selectedClientDetails.innerHTML = `
      <div class="flex">
        <span class="text-neutral-600 w-24">Name:</span>
        <span class="font-medium">${client.name}</span>
      </div>
      <div class="flex">
        <span class="text-neutral-600 w-24">Shop:</span>
        <span class="font-medium">${client.shopName}</span>
      </div>
      <div class="flex">
        <span class="text-neutral-600 w-24">Email:</span>
        <span class="font-medium">${client.email}</span>
      </div>
      <div class="flex">
        <span class="text-neutral-600 w-24">Client ID:</span>
        <span class="font-medium">${client.id}</span>
      </div>
    `;
  }
  
  // Hide error message
  document.getElementById('clientId-error').classList.add('hidden');
}

// Setup event listeners
function setupEventListeners() {
  // Search clients
  clientSearch.addEventListener('input', () => {
    const searchTerm = clientSearch.value.toLowerCase();
    const filteredClients = existingClients.filter(client => 
      client.name.toLowerCase().includes(searchTerm) || 
      client.shopName.toLowerCase().includes(searchTerm)
    );
    renderClientsList(filteredClients);
  });
  
  // Existing client form submission
  existingClientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Validate form
    let isValid = true;
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
      el.classList.add('hidden');
    });
    
    // Validate client selection
    if (!selectedClientId) {
      const errorElement = document.getElementById('clientId-error');
      errorElement.textContent = 'Please select a client';
      errorElement.classList.remove('hidden');
      isValid = false;
    }
    
    // Get products with quantity > 0
    const orderedProducts = {};
    let hasAnyProducts = false;
    
    existingClientProducts.querySelectorAll('input').forEach(input => {
      const productId = input.name.split('.')[1];
      const quantity = parseInt(input.value);
      if (quantity > 0) {
        orderedProducts[productId] = quantity;
        hasAnyProducts = true;
      }
    });
    
    // Validate at least one product is ordered
    if (!hasAnyProducts) {
      isValid = false;
      // Show generic error message at the top
      const errorElement = document.createElement('div');
      errorElement.className = 'text-sm font-medium text-red-500 mt-2';
      errorElement.id = 'products-error';
      errorElement.textContent = 'Please input product amount for at least one product';
      
      // Insert error message before the submit button
      const submitButton = existingClientForm.querySelector('button[type="submit"]').parentNode;
      
      // Check if the error message already exists
      const existingError = document.getElementById('products-error');
      if (existingError) {
        existingError.textContent = 'Please input product amount for at least one product';
        existingError.classList.remove('hidden');
      } else {
        submitButton.insertBefore(errorElement, existingClientSubmit);
      }
    } else {
      const existingError = document.getElementById('products-error');
      if (existingError) {
        existingError.classList.add('hidden');
      }
    }
    
    if (!isValid) return;
    
    // Get selected client
    const client = existingClients.find(c => c.id === selectedClientId);
    
    // Prepare form data
    const formData = {
      clientId: selectedClientId,
      clientDetails: client,
      products: orderedProducts
    };
    
    // Submit form
    isSubmitting = true;
    existingClientSubmit.textContent = 'Processing...';
    
    // Simulate API call
    setTimeout(() => {
      console.log('Existing client order submitted:', formData);
      
      isSubmitting = false;
      existingClientSubmit.textContent = 'Submit Order';
      
      // Show success toast
      showToast('Order submitted successfully', 'We\'ll be in touch shortly.', 'success');
      
      // Reset form
      existingClientForm.reset();
      resetProductQuantities(existingClientProducts);
      selectedClientId = null;
      selectedClientInfo.classList.add('hidden');
      renderClientsList(existingClients);
      
      // Remove any error messages
      const productsError = document.getElementById('products-error');
      if (productsError) {
        productsError.remove();
      }
      
      // Redirect to home page (simulated)
      // window.location.href = '/';
    }, 1500);
  });
}

// Reset product quantities
function resetProductQuantities(container) {
  container.querySelectorAll('input').forEach(input => {
    input.value = 0;
  });
}

// Show error message
function showError(id, message) {
  const errorElement = document.getElementById(id);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }
}

// Hide error message
function hideError(id) {
  const errorElement = document.getElementById(id);
  if (errorElement) {
    errorElement.classList.add('hidden');
  }
}

// Show toast notification
function showToast(title, description, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  toast.innerHTML = `
    <div class="toast-icon">
      ${type === 'success' 
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
      }
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${description ? `<div class="toast-description">${description}</div>` : ''}
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.add('fadeOut');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);