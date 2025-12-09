// siteplan.js

// Function to show a welcome message based on time of day
function showWelcomeMessage() {
    const hours = new Date().getHours();
    const welcomeMessageElement = document.querySelector('.welcome-message');

    if (hours < 12) {
        welcomeMessageElement.textContent = 'Good morning! Welcome to Solid Skills Sports Academy.';
    } else if (hours < 18) {
        welcomeMessageElement.textContent = 'Good afternoon! Welcome to Solid Skills Sports Academy.';
    } else {
        welcomeMessageElement.textContent = 'Good evening! Welcome to Solid Skills Sports Academy.';
    }
}

// Function to lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const config = {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0
    };

    let observer = new IntersectionObserver(function(entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        observer.observe(image);
    });
}

function preloadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) {
        return;
    }
    img.src = src;
}

// Function to handle form submission and store data in localStorage
function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const camp = document.getElementById('camp').value;

    localStorage.setItem('formSubmission', JSON.stringify({ name, email, camp }));
    alert('Thank you for registering!');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    showWelcomeMessage();
    lazyLoadImages();

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});
