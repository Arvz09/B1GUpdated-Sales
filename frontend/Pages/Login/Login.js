// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // Get DOM elements
    const userBtn = document.getElementById('user-btn');
    const adminBtn = document.getElementById('admin-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeOffIcon = document.getElementById('eye-off-icon');
    const loginForm = document.getElementById('login-form');
    const submitBtn = document.getElementById('submit-btn');
    const buttonText = document.getElementById('button-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const signupText = document.getElementById('signup-text');
    const toastContainer = document.getElementById('toast-container');

    // Hardcoded credentials
    const credentials = {
        admin: { email: "admin@company.com", password: "admin123" },
        agent: { email: "agent@company.com", password: "agent123" }
    };

    // Initialize state
    let userType = 'agent'; // Default to 'agent'

    // Update UI based on user type
    const updateUserTypeUI = () => {
        emailInput.placeholder = userType === 'admin' ? 'admin@company.com' : 'agent@company.com';
        buttonText.textContent = `Sign in as ${userType === 'admin' ? 'Administrator' : 'Agent'}`;
        
        // Show/hide signup text for agents
        signupText.style.display = userType === 'user' ? 'block' : 'none';
    };
    
    // User type selection
    userBtn.addEventListener('click', () => {
        if (userType !== 'agent') {
            userType = 'agent';
            userBtn.classList.add('active');
            adminBtn.classList.remove('active');
            updateUserTypeUI();
        }
    });

    adminBtn.addEventListener('click', () => {
        if (userType !== 'admin') {
            userType = 'admin';
            adminBtn.classList.add('active');
            userBtn.classList.remove('active');
            updateUserTypeUI();
        }
    });

    // Password visibility toggle
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;

        if (type === 'text') {
            eyeIcon.classList.add('hidden');
            eyeOffIcon.classList.remove('hidden');
        } else {
            eyeIcon.classList.remove('hidden');
            eyeOffIcon.classList.add('hidden');
        }
    });

    // Login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const enteredEmail = emailInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        // Show loading state
        submitBtn.disabled = true;
        buttonText.textContent = 'Signing in...';
        loadingSpinner.classList.remove('hidden');

        setTimeout(() => {
            if (
                enteredEmail === credentials[userType].email &&
                enteredPassword === credentials[userType].password
            ) {
                showToast({
                    title: 'Success!',
                    message: `Logged in as ${userType === 'admin' ? 'Administrator' : 'agent'}`,
                    type: 'success'
                });

                // Redirect to respective dashboard
                setTimeout(() => {
                    window.location.href = userType === 'admin' 
                        ? "/Pages/Dashboard/AdminDashboard.html" 
                        : "/Pages/Dashboard/AgentsDashboard.html";
                }, 1500);
            } else {
                showToast({
                    title: 'Error',
                    message: 'Invalid credentials. Please try again.',
                    type: 'error'
                });
            }

            // Reset loading state
            submitBtn.disabled = false;
            buttonText.textContent = `Sign in as ${userType === 'admin' ? 'Administrator' : 'Agent'}`;
            loadingSpinner.classList.add('hidden');
        }, 1000);
    });

    // Toast notification function
    function showToast({ title, message, type = 'default', duration = 3000 }) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">
                <i data-lucide="x" class="toast-close-icon"></i>
            </button>
            <div class="toast-progress"></div>
        `;

        toastContainer.appendChild(toast);
        lucide.createIcons({ icons: { x: toast.querySelector('.toast-close-icon') } });

        // Close toast when clicking the close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            removeToast(toast);
        });

        // Auto-remove toast after duration
        setTimeout(() => {
            removeToast(toast);
        }, duration);
    }

    function removeToast(toast) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        setTimeout(() => {
            toast.remove();
        }, 300);
    }

    // Initialize UI
    updateUserTypeUI();
});
