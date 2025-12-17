// frontend/js/navigation.js

const NAV_LINKS = {
    employee: [
        { href: 'dashboard.html', text: 'Dashboard' },
        { href: 'manager_portal.html', text: 'Manager Portal', roles: ['manager', 'admin'] },
        { href: 'admin.html', text: 'Admin Tools', roles: ['admin'] }
    ],
    manager: [
        { href: 'manager_portal.html', text: 'Manager Portal' },
        { href: 'admin.html', text: 'Admin Tools', roles: ['admin'] }
    ],
    admin: [
        { href: 'admin.html', text: 'Admin Tools' },
        { href: 'manager_portal.html', text: 'Manager Portal' },
        { href: 'dashboard.html', text: 'Employee Dashboard' }
    ]
};

function decodeToken(token) {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch (e) {
        return null;
    }
}

function updateNavigation(role) {
    const navBar = document.getElementById('navBar');
    if (!navBar) return;

    navBar.innerHTML = ''; // Clear existing navigation

    const roleLinks = NAV_LINKS[role] || NAV_LINKS.employee;
    
    roleLinks.forEach(link => {
        // Check if the current user role has permission to see this link
        const allowed = !link.roles || link.roles.includes(role);
        
        if (allowed) {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            navBar.appendChild(a);
        }
    });
}

function getStoredRole() {
    const token = localStorage.getItem('token');
    if (token) {
        const payload = decodeToken(token);
        return payload ? payload.role : null;
    }
    return null;
}

// Global function used on page load to check auth and update UI
function checkAuthAndRedirect() {
    const token = localStorage.getItem('token');
    const role = getStoredRole();
    const currentPage = window.location.pathname.split('/').pop();

    if (!token) {
        if (currentPage !== 'login.html') {
            window.location.href = 'login.html';
        }
        return;
    }

    if (!role) {
        window.location.href = 'denied.html';
        return;
    }

    // Dynamic Redirection after login or page load check
    if (currentPage === 'login.html') {
        if (role === 'admin') {
            window.location.href = 'admin.html';
        } else if (role === 'manager') {
            window.location.href = 'manager_portal.html';
        } else {
            window.location.href = 'dashboard.html';
        }
        return;
    }
    
    // Check if current page matches role access
    const requiredRoles = {
        'admin.html': ['admin'],
        'manager_portal.html': ['manager', 'admin'],
        'dashboard.html': ['employee', 'manager', 'admin']
    };

    const required = requiredRoles[currentPage];
    if (required && !required.includes(role)) {
        window.location.href = 'denied.html';
        return;
    }
    
    // Update UI elements
    updateNavigation(role);
    const greeting = document.getElementById('userGreeting');
    if (greeting) {
        greeting.textContent = role.charAt(0).toUpperCase() + role.slice(1);
    }
}