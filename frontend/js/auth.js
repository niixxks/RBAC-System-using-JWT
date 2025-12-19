// Import navigation script in your HTML files, not here.
// <script src="js/navigation.js"></script>

const API_URL = 'http://localhost:5000/api/auth';

// --- Utility Functions (Not Exported to HTML) ---

function getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { 'x-auth-token': token } : {};
}

function showStatus(elementId, message, isError = false) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.color = isError ? 'red' : 'green';
    }
}

// --- Frontend API Functions (Called by HTML) ---

async function registerUser() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole') ? document.getElementById('registerRole').value : 'employee'; 
    const statusElementId = 'registerStatus';

    if (!username || !password) {
        showStatus(statusElementId, 'Please enter username and password.', true);
        return;
    }

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role })
        });

        const data = await res.json();
        if (res.ok) {
            showStatus(statusElementId, `Registration successful! Role: ${data.role}. Redirecting to login...`, false);
            // Prefill login form and switch to login view for easier flow
            try {
                const loginUserInput = document.getElementById('loginUsername');
                const loginPassInput = document.getElementById('loginPassword');
                const showLoginBtn = document.getElementById('showLoginBtn');
                if (loginUserInput) loginUserInput.value = username;
                if (loginPassInput) loginPassInput.value = '';
                if (showLoginBtn) showLoginBtn.click();
                // Also notify loginStatus
                showStatus('loginStatus', 'Account created — enter password and Sign In.', false);
            } catch (e) {
                // ignore DOM errors silently
            }
        } else {
            showStatus(statusElementId, data.msg || 'Registration failed.', true);
        }
    } catch (err) {
        showStatus(statusElementId, 'Network error during registration.', true);
        console.error(err);
    }
}

async function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const statusElementId = 'loginStatus';

    if (!username || !password) {
        showStatus(statusElementId, 'Please enter username and password.', true);
        return;
    }

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        
        if (res.ok) {
            localStorage.setItem('token', data.token);
            // Use navigation.js function for redirection
            checkAuthAndRedirect(); 
        } else {
            showStatus(statusElementId, data.msg || 'Login failed.', true);
        }
    } catch (err) {
        showStatus(statusElementId, 'Network error during login.', true);
        console.error(err);
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// --- Protected Data Fetching Functions ---

async function fetchProfileData() {
    const statusElementId = 'profileStatus';
    try {
        const res = await fetch(`${API_URL}/profile`, {
            headers: { 
                'Content-Type': 'application/json',
                ...getAuthHeader()
            }
        });

        const data = await res.json();
        
        if (res.ok) {
            showStatus(statusElementId, JSON.stringify(data, null, 2), false);
        } else {
            showStatus(statusElementId, `Error (${res.status}): ${data.msg || 'Unauthorized Access'}`, true);
        }
    } catch (err) {
        showStatus(statusElementId, 'Network error fetching profile data.', true);
        console.error(err);
    }
}

async function fetchManagerReports() {
    const statusElementId = 'managerReportStatus';
    try {
        const res = await fetch(`${API_URL}/manager-portal`, {
            headers: { 
                'Content-Type': 'application/json',
                ...getAuthHeader()
            }
        });

        const data = await res.json();
        
        if (res.ok) {
            showStatus(statusElementId, JSON.stringify(data, null, 2), false);
        } else {
            showStatus(statusElementId, `Error (${res.status}): ${data.msg || 'Unauthorized Access'}`, true);
        }
    } catch (err) {
        showStatus(statusElementId, 'Network error fetching manager reports.', true);
        console.error(err);
    }
}

async function fetchAllUsers() {
    const statusElementId = 'allUsersStatus';
    try {
        const res = await fetch(`${API_URL}/admin/users`, {
            headers: { 
                'Content-Type': 'application/json',
                ...getAuthHeader()
            }
        });

        const data = await res.json();
        
        if (res.ok) {
            showStatus(statusElementId, JSON.stringify(data, null, 2), false);
        } else {
            showStatus(statusElementId, `Error (${res.status}): ${data.msg || 'Forbidden Access'}`, true);
        }
    } catch (err) {
        showStatus(statusElementId, 'Network error fetching all users.', true);
        console.error(err);
    }
}