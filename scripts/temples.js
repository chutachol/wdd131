document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector("nav ul");
    const currentYearSpan = document.getElementById("currentYear");
    const lastModifiedSpan = document.getElementById("lastModified");
    
    // Hamburger menu toggle
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        // Change hamburger icon to 'X' when menu is open
        hamburger.innerHTML = navLinks.classList.contains("show") ? "✕" : "&#9776;";
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest("nav")) {
            navLinks.classList.remove("show");
            hamburger.innerHTML = "&#9776;";
        }
    });
    
    // Update footer with current year and last modified date
    currentYearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;
});