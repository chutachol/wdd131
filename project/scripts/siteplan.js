// siteplan.js - Final version with Rwo, Johan, and Sita

// Player data array with updated names and images
const players = [
    { 
        name: "Johan", 
        position: "Center", 
        stats: "PPG: 18.5, RPG: 10.2, APG: 2.3",
        image: "images14.jpg",
        jerseyNumber: 13
    },
    { 
        name: "Sita", 
        position: "Guard", 
        stats: "PPG: 22.1, RPG: 4.5, APG: 7.8",
        image: "image3.jpg",
        jerseyNumber: 3
    },
    { 
        name: "Rwo", 
        position: "Forward", 
        stats: "PPG: 16.7, RPG: 8.9, APG: 3.4",
        image: "image11.jpg",
        jerseyNumber: 11
    }
];

// Function to show a welcome message based on time of day using template literals
function showWelcomeMessage() {
    const hours = new Date().getHours();
    const welcomeMessageElements = document.querySelectorAll('.welcome-message');
    const academyName = 'Flight 13 Sports Academy';
    
    let timeOfDay;
    if (hours < 12) {
        timeOfDay = 'Morning';
    } else if (hours < 18) {
        timeOfDay = 'Afternoon';
    } else {
        timeOfDay = 'Evening';
    }
    
    // Using template literals
    const message = `Good ${timeOfDay}! Welcome to ${academyName}.`;
    
    welcomeMessageElements.forEach(element => {
        if (element && !element.textContent.includes('©')) {
            element.textContent = message;
        }
    });
}

// Function to display players using template literals
function displayPlayers() {
    const playerContainer = document.querySelector('.player');
    if (!playerContainer) return;
    
    // Clear existing content
    playerContainer.innerHTML = '<h3>Meet Our Star Players</h3>';
    
    // Using template literals and array methods
    players.forEach((player, index) => {
        const playerHTML = `
            <div class="player-card" data-index="${index}">
                <div class="player-image-container">
                    <img data-src="images/${player.image}" src="images/placeholder.jpg" alt="${player.name}" class="player-image" loading="lazy">
                    <div class="jersey-number">#${player.jerseyNumber}</div>
                </div>
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <p><strong>Position:</strong> ${player.position}</p>
                    <p><strong>Statistics:</strong> ${player.stats}</p>
                    <button onclick="showPlayerDetails(${index})" class="view-details-btn">View Player Profile</button>
                </div>
            </div>
        `;
        playerContainer.innerHTML += playerHTML;
    });
    
    // Trigger lazy loading for the newly added images
    lazyLoadImages();
}

// Function to show player details using template literals
function showPlayerDetails(index) {
    const player = players[index];
    if (!player) return;
    
    const playerDetails = document.getElementById('playerDetails');
    
    // Player-specific details - FIXED ORDER TO MATCH YOUR PLAYER ARRAY
    const playerDetailsMap = {
        0: { // Johan (index 0 in your array)
            height: "6'3\"",
            weight: "195 lbs",
            experience: "3 years with Flight 13",
            achievements: "Team Captain, MVP 2023, Defensive Player of the Year",
            bio: "Dominant center with exceptional shot-blocking ability and post moves."
        },
        1: { // Sita (index 1 in your array)
            height: "6'3\"",
            weight: "195 lbs",
            experience: "3 years with Flight 13",
            achievements: "Top Scorer 2023, Assist Leader, 3-Point Specialist",
            bio: "Elite guard with incredible shooting range and playmaking skills."
        },
        2: { // Rwo (index 2 in your array)
            height: "6'8\"",
            weight: "220 lbs",
            experience: "2 years with Flight 13",
            achievements: "Most Improved Player 2023, All-Defensive Team",
            bio: "Versatile forward with excellent rebounding and perimeter defense."
        }
    };
    
    const details = playerDetailsMap[index];
    
    // Using template literals for detailed information
    const detailsHTML = `
        <div class="player-details-card">
            <h3>${player.name} - Player Profile</h3>
            <div class="details-content">
                <div class="details-image-container">
                    <img src="images/${player.image}" alt="${player.name}" class="details-image">
                    <div class="player-stats-summary">
                        <p><strong>Jersey:</strong> #${player.jerseyNumber}</p>
                        <p><strong>Position:</strong> ${player.position}</p>
                        <p><strong>Height:</strong> ${details.height}</p>
                        <p><strong>Weight:</strong> ${details.weight}</p>
                    </div>
                </div>
                <div class="details-info">
                    <h4>Player Bio</h4>
                    <p>${details.bio}</p>
                    
                    <h4>Season Statistics</h4>
                    <p>${player.stats}</p>
                    
                    <h4>Achievements</h4>
                    <p>${details.achievements}</p>
                    
                    <h4>Experience</h4>
                    <p>${details.experience}</p>
                </div>
            </div>
            <button onclick="closePlayerDetails()" class="close-details-btn">Close Profile</button>
        </div>
    `;
    
    playerDetails.innerHTML = detailsHTML;
    
    // Store in localStorage
    localStorage.setItem('lastViewedPlayer', JSON.stringify({
        player: player,
        details: details,
        viewedAt: new Date().toISOString()
    }));
    
    console.log(`Player details viewed: ${player.name}`);
}

// Function to close player details
function closePlayerDetails() {
    const playerDetails = document.getElementById('playerDetails');
    playerDetails.innerHTML = '';
}

// Function to lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                    
                    // Add loaded class for styling
                    img.classList.add('loaded');
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.1
        });
        
        images.forEach(img => observer.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        });
    }
}

// Function to handle form submission and store data in localStorage
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const camp = document.getElementById('camp').value;
    
    // Create form data object
    const formData = {
        name: name,
        email: email,
        camp: camp,
        timestamp: new Date().toISOString(),
        id: Date.now()
    };
    
    // Get existing registrations or create new array
    let registrations = JSON.parse(localStorage.getItem('campRegistrations')) || [];
    registrations.push(formData);
    
    // Save to localStorage
    localStorage.setItem('campRegistrations', JSON.stringify(registrations));
    localStorage.setItem('lastRegistration', JSON.stringify(formData));
    
    // Using template literals for success message
    const campName = camp.split(' - ')[0];
    const successMessage = `Thank you ${name}! You have successfully registered for our ${campName}. A confirmation email will be sent to ${email} within 24 hours.`;
    alert(successMessage);
    
    // Reset form
    event.target.reset();
    
    // Log to console for debugging
    console.log(`Camp registration saved:`, formData);
    
    // Update registration count display
    updateRegistrationCount();
}

// Function to update registration count display
function updateRegistrationCount() {
    const registrations = JSON.parse(localStorage.getItem('campRegistrations')) || [];
    console.log(`Total camp registrations: ${registrations.length}`);
}

// Function to display last registration
function displayLastRegistration() {
    const lastRegistration = localStorage.getItem('lastRegistration');
    if (lastRegistration) {
        const registration = JSON.parse(lastRegistration);
        console.log(`Last camp registration: ${registration.name} for ${registration.camp}`);
    }
}

// Function to count players - demonstrating array methods
function getPlayerCount() {
    const count = players.length;
    console.log(`Total players on roster: ${count}`);
    return count;
}

// Function to get players by position - demonstrating array filtering
function getPlayersByPosition(position) {
    const filteredPlayers = players.filter(player => player.position === position);
    console.log(`Players in ${position} position:`, filteredPlayers.map(p => p.name));
    return filteredPlayers;
}

// Function to display current date and time in footer
function displayCurrentDateTime() {
    const dateTimeElement = document.getElementById('currentDateTime');
    if (!dateTimeElement) return;
    
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const dateTimeString = now.toLocaleDateString('en-US', options);
    dateTimeElement.textContent = `Current Date & Time: ${dateTimeString}`;
}

// Function to display summary of stored data
function displayStoredDataSummary() {
    const registrations = JSON.parse(localStorage.getItem('campRegistrations')) || [];
    const lastPlayer = JSON.parse(localStorage.getItem('lastViewedPlayer'));
    
    console.log('=== Stored Data Summary ===');
    console.log(`Camp Registrations: ${registrations.length}`);
    console.log(`Last Viewed Player: ${lastPlayer ? lastPlayer.player.name : 'None'}`);
}

// Function to initialize page - SINGLE VERSION (REMOVED DUPLICATE)
function initializePage() {
    // Check current page and run appropriate functions
    const path = window.location.pathname;
    const page = path.split('/').pop();
    
    switch(page) {
        case 'players.html':
            displayPlayers();
            getPlayerCount();
            // Example: Get all Guards
            getPlayersByPosition('Guard');
            break;
        case 'camps.html':
            displayLastRegistration();
            updateRegistrationCount();
            break;
        case 'index.html':
            // Initialize homepage features
            console.log('Homepage loaded');
            break;
    }
    
    // Display stored data summary
    displayStoredDataSummary();
    
    // Display current date and time
    displayCurrentDateTime();
    
    // Update time every second
    setInterval(displayCurrentDateTime, 1000);
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', () => {
    // Always run these
    showWelcomeMessage();
    lazyLoadImages();
    initializePage();  // Call the SINGLE initializePage function
    
    // Add form event listener if form exists
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Add click event to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            console.log('Flight 13 logo clicked');
        });
    }
    
    // Add navigation tracking
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log(`Navigating to: ${this.textContent}`);
        });
    });
    
    // Log initialization complete
    console.log('Flight 13 Sports Academy website initialized successfully');
    console.log('Players: Johan, Sita, Rwo');
});