// Client data storage
let clients = [
    {
      id: '1',
      name: 'Alex Morgan',
      email: 'alex@example.com',
      phone: '(555) 123-4567',
      company: 'Acme Inc.',
      status: 'active',
      lastContact: new Date('2023-06-15'),
      notes: 'Key decision maker for the new project',
      createdAt: new Date('2022-11-10'),
    },
    {
      id: '2',
      name: 'Jamie Rodriguez',
      email: 'jamie@example.com',
      phone: '(555) 987-6543',
      company: 'Global Tech',
      status: 'active',
      lastContact: new Date('2023-05-22'),
      notes: 'Interested in premium subscription',
      createdAt: new Date('2023-01-20'),
    },
    {
      id: '3',
      name: 'Taylor Kim',
      email: 'taylor@example.com',
      phone: '(555) 321-7654',
      company: 'Design Studio',
      status: 'inactive',
      lastContact: new Date('2023-04-30'),
      notes: 'Follow up about contract renewal',
      createdAt: new Date('2022-08-05'),
    },
    {
      id: '4',
      name: 'Jordan Smith',
      email: 'jordan@example.com',
      phone: '(555) 567-8901',
      company: 'Startup Hub',
      status: 'pending',
      lastContact: new Date('2023-06-01'),
      notes: 'Waiting for final approval',
      createdAt: new Date('2023-03-17'),
    },
    {
      id: '5',
      name: 'Riley Johnson',
      email: 'riley@example.com',
      phone: '(555) 234-5678',
      company: 'Media Group',
      status: 'active',
      lastContact: new Date('2023-06-10'),
      notes: 'Potential expansion discussion',
      createdAt: new Date('2022-12-03'),
    },
  ];
  
  // DOM Elements
  const clientTable = document.getElementById('clients-table');
  const clientList = document.getElementById('client-list');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  const addClientBtn = document.getElementById('add-client-btn');
  const emptyState = document.getElementById('empty-state');
  const emptyTitle = document.getElementById('empty-title');
  const emptyDescription = document.getElementById('empty-description');
  const emptyAction = document.getElementById('empty-action');
  
  // Modal Elements
  const clientModal = document.getElementById('client-modal');
  const modalTitle = document.getElementById('modal-title');
  const clientForm = document.getElementById('client-form');
  const saveClientBtn = document.getElementById('save-client');
  const cancelClientBtn = document.getElementById('cancel-client');
  
  // Confirm Dialog Elements
  const confirmDialog = document.getElementById('confirm-dialog');
  const confirmTitle = document.getElementById('confirm-title');
  const confirmDescription = document.getElementById('confirm-description');
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  const cancelDeleteBtn = document.getElementById('cancel-delete');
  
  // State
  let currentClient = null;
  let clientToDelete = null;
  let filteredClients = [...clients];
  let sortColumn = 'name';
  let sortDirection = 'asc';
  
  // Initialize the app
  document.addEventListener('DOMContentLoaded', () => {
    renderClients();
    setupEventListeners();
  });
  
  // Setup event listeners
  function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', handleSearch);
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Add client button
    addClientBtn.addEventListener('click', openAddClientModal);
    emptyAction.addEventListener('click', openAddClientModal);
    
    // Client form
    clientForm.addEventListener('submit', handleSaveClient);
    cancelClientBtn.addEventListener('click', closeModal);
    
    // Confirm dialog
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    cancelDeleteBtn.addEventListener('click', closeConfirmDialog);
    
    // Sort column headers
    const headerCells = document.querySelectorAll('th.sortable');
    headerCells.forEach(cell => {
      cell.addEventListener('click', () => {
        handleSort(cell.dataset.sort);
      });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        closeModal();
        closeConfirmDialog();
      }
    });
  }
  
  // Event Handlers
  function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm) {
      clearSearchBtn.classList.remove('hidden');
      
      filteredClients = clients.filter(client => 
        client.name.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm) ||
        (client.company && client.company.toLowerCase().includes(searchTerm)) ||
        (client.phone && client.phone.includes(searchTerm))
      );
    } else {
      clearSearchBtn.classList.add('hidden');
      filteredClients = [...clients];
    }
    
    renderClients();
    updateEmptyState(searchTerm);
  }
  
  function clearSearch() {
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    filteredClients = [...clients];
    renderClients();
    updateEmptyState('');
  }
  
  function handleSort(column) {
    if (sortColumn === column) {
      // Toggle direction
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // New column, default to ascending
      sortColumn = column;
      sortDirection = 'asc';
    }
    
    // Update UI
    document.querySelectorAll('th.sortable').forEach(th => {
      th.classList.remove('sort-asc', 'sort-desc');
      if (th.dataset.sort === sortColumn) {
        th.classList.add(sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
      }
    });
    
    // Sort data
    sortClients();
    renderClients();
  }
  
  function openAddClientModal() {
    currentClient = null;
    modalTitle.textContent = 'Add New Client';
    saveClientBtn.textContent = 'Add Client';
    clientForm.reset();
    clientModal.classList.add('open');
    document.getElementById('name').focus();
  }
  
  function openEditClientModal(client) {
    currentClient = client;
    modalTitle.textContent = 'Edit Client';
    saveClientBtn.textContent = 'Update Client';
    
    // Fill form with client data
    document.getElementById('name').value = client.name;
    document.getElementById('email').value = client.email;
    document.getElementById('phone').value = client.phone || '';
    document.getElementById('company').value = client.company || '';
    document.getElementById('status').value = client.status;
    document.getElementById('notes').value = client.notes || '';
    
    clientModal.classList.add('open');
  }
  
  function closeModal() {
    clientModal.classList.remove('open');
    setTimeout(() => {
      clientForm.reset();
    }, 300);
  }
  
  function openDeleteConfirmDialog(client) {
    clientToDelete = client;
    confirmTitle.textContent = 'Delete Client';
    confirmDescription.textContent = `Are you sure you want to delete ${client.name}? This action cannot be undone.`;
    confirmDialog.classList.add('open');
  }
  
  function closeConfirmDialog() {
    confirmDialog.classList.remove('open');
    setTimeout(() => {
      clientToDelete = null;
    }, 300);
  }
  
  function handleSaveClient(e) {
    e.preventDefault();
    
    const formData = new FormData(clientForm);
    const clientData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      status: formData.get('status'),
      notes: formData.get('notes')
    };
    
    // Validate required fields
    if (!clientData.name.trim() || !clientData.email.trim()) {
      showToast('Name and email are required', 'error');
      return;
    }
    
    if (currentClient) {
      // Update existing client
      updateClient(clientData);
    } else {
      // Add new client
      addClient(clientData);
    }
    
    closeModal();
  }
  
  function confirmDelete() {
    if (clientToDelete) {
      deleteClient(clientToDelete.id);
      closeConfirmDialog();
    }
  }
  
  // CRUD operations
  function addClient(clientData) {
    const newClient = {
      ...clientData,
      id: generateId(),
      createdAt: new Date(),
      lastContact: new Date()
    };
    
    clients.unshift(newClient);
    filteredClients = [...clients];
    sortClients();
    renderClients();
    showToast(`${clientData.name} has been added`, 'success');
  }
  
  function updateClient(clientData) {
    const index = clients.findIndex(c => c.id === currentClient.id);
    
    if (index !== -1) {
      clients[index] = {
        ...currentClient,
        ...clientData
      };
      
      filteredClients = filteredClients.map(c => 
        c.id === currentClient.id ? { ...c, ...clientData } : c
      );
      
      sortClients();
      renderClients();
      showToast(`${clientData.name} has been updated`, 'success');
    }
  }
  
  function deleteClient(id) {
    const clientName = clients.find(c => c.id === id)?.name;
    
    clients = clients.filter(c => c.id !== id);
    filteredClients = filteredClients.filter(c => c.id !== id);
    
    renderClients();
    showToast(`${clientName} has been deleted`, 'success');
  }
  
  // Helpers
  function generateId() {
    return Math.random().toString(36).substring(2, 9);
  }
  
  function formatDistanceToNow(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  }
  
  function getInitials(name) {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
  
  function sortClients() {
    const compare = (a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];
      
      // Handle dates
      if (valueA instanceof Date && valueB instanceof Date) {
        return sortDirection === 'asc' 
          ? valueA.getTime() - valueB.getTime() 
          : valueB.getTime() - valueA.getTime();
      }
      
      // Handle strings
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      // Handle undefined/null
      if (!valueA && valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA && !valueB) return sortDirection === 'asc' ? 1 : -1;
      if (!valueA && !valueB) return 0;
      
      // Default for numbers etc.
      return sortDirection === 'asc' 
        ? valueA - valueB 
        : valueB - valueA;
    };
    
    filteredClients.sort(compare);
  }
  
  function updateEmptyState(searchTerm) {
    if (filteredClients.length === 0) {
      emptyState.classList.remove('hidden');
      
      if (searchTerm) {
        emptyTitle.textContent = 'No clients found';
        emptyDescription.textContent = `No clients matching "${searchTerm}" were found.`;
        emptyAction.textContent = 'Clear search';
        emptyAction.onclick = clearSearch;
      } else {
        emptyTitle.textContent = 'No clients yet';
        emptyDescription.textContent = 'Add your first client to get started.';
        emptyAction.textContent = 'Add Client';
        emptyAction.onclick = openAddClientModal;
      }
    } else {
      emptyState.classList.add('hidden');
    }
  }
  
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    }
    
    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <div class="toast-message">${message}</div>
      </div>
    `;
    
    document.getElementById('toast-container').appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('exiting');
      setTimeout(() => {
        toast.remove();
      }, 200);
    }, 3000);
  }
  
  // Render functions
  function renderClients() {
    clientList.innerHTML = '';
    
    if (filteredClients.length === 0) {
      emptyState.classList.remove('hidden');
      clientTable.classList.add('hidden');
      return;
    }
    
    emptyState.classList.add('hidden');
    clientTable.classList.remove('hidden');
    
    filteredClients.forEach(client => {
      const row = document.createElement('tr');
      row.className = 'client-row';
      row.setAttribute('data-id', client.id);
      
      const lastContactText = client.lastContact 
        ? formatDistanceToNow(client.lastContact)
        : 'Never';
      
      row.innerHTML = `
        <td>
          <div class="client-name">
            <div class="avatar">
              ${client.avatar 
                ? `<img src="${client.avatar}" alt="${client.name}">` 
                : getInitials(client.name)}
            </div>
            <span>${client.name}</span>
          </div>
        </td>
        <td>
          <div class="client-contact">
            <div>${client.email}</div>
            ${client.phone ? `<div class="client-phone">${client.phone}</div>` : ''}
          </div>
        </td>
        <td>${client.company || '-'}</td>
        <td>
          <span class="status ${client.status}">
            ${client.status.charAt(0).toUpperCase() + client.status.slice(1)}
          </span>
        </td>
        <td>${lastContactText}</td>
        <td>
          <div class="actions">
            <button class="action-button edit" data-id="${client.id}" title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path></svg>
            </button>
            <button class="action-button delete" data-id="${client.id}" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
            </button>
          </div>
        </td>
      `;
      
      // Add event listeners
      row.querySelector('.action-button.edit').addEventListener('click', () => {
        const clientId = row.dataset.id;
        const client = clients.find(c => c.id === clientId);
        if (client) openEditClientModal(client);
      });
      
      row.querySelector('.action-button.delete').addEventListener('click', () => {
        const clientId = row.dataset.id;
        const client = clients.find(c => c.id === clientId);
        if (client) openDeleteConfirmDialog(client);
      });
      
      clientList.appendChild(row);
    });
  }