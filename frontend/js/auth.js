// MOCK LOGIN (until backend is ready)
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  let role = "USER";
  if (email.includes("admin")) role = "ADMIN";

  // Fake JWT for demo
  localStorage.setItem("token", "fake-jwt-token");
  localStorage.setItem("role", role);
  localStorage.setItem("email", email);

  window.location.href = "dashboard.html";
});

// Protect any page
function protectPage() {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "login.html";
}

// Show user info
function showUserInfo() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  document.getElementById("welcomeText").innerText =
    `👋 Welcome ${email} | Role: ${role}`;
}

// Admin-only protection
function protectAdmin() {
  protectPage();
  const role = localStorage.getItem("role");
  if (role !== "ADMIN") window.location.href = "denied.html";
}

// Go to admin panel
function goAdmin() {
  window.location.href = "admin.html";
}

// Logout
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
