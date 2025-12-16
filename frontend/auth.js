const API_URL = "http://localhost:5000/api/auth";

// LOGIN WITH BACKEND
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // STORE REAL DATA FROM BACKEND
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("email", data.email);

    window.location.href = "dashboard.html";
  } catch (err) {
    alert("Backend not reachable");
  }
});

// PROTECT ANY PAGE
function protectPage() {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "login.html";
}

// SHOW USER INFO
function showUserInfo() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  document.getElementById("welcomeText").innerText =
    `👋 Welcome ${email} | Role: ${role}`;
}

// ADMIN ONLY
function protectAdmin() {
  protectPage();
  const role = localStorage.getItem("role");
  if (role !== "ADMIN") window.location.href = "denied.html";
}

// NAVIGATION
function goAdmin() {
  window.location.href = "admin.html";
}

// LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
