// Global token check + logout button creation
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    // If NOT logged in → redirect to login
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // Create floating logout button
    const logoutBtn = document.createElement("div");
    logoutBtn.className = "floating-logout";
    logoutBtn.innerHTML = `<i class="fas fa-right-from-bracket"></i>`;

    logoutBtn.onclick = () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    };

    document.body.appendChild(logoutBtn);
});
