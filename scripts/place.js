// Function to calculate wind chill
function calculateWindChill(temperature, windSpeed) {
    return 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16));
}

// Function to display wind chill
function displayWindChill() {
    const temperatureElement = document.getElementById('temperature');
    const windSpeedElement = document.getElementById('wind-speed');
    const windChillElement = document.getElementById('wind-chill');
    
    const temperature = parseFloat(temperatureElement.textContent);
    const windSpeed = parseFloat(windSpeedElement.textContent);
    
    // Check if conditions are met for wind chill calculation
    if (temperature <= 50 && windSpeed > 3) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = `${Math.round(windChill)}°F`;
    } else {
        windChillElement.textContent = "N/A";
    }
}

// Function to update footer with current year and last modified date
function updateFooter() {
    const currentYearElement = document.getElementById('current-year');
    const lastModifiedElement = document.getElementById('last-modified');
    
    // Set current year
    currentYearElement.textContent = new Date().getFullYear();
    
    // Set last modified date
    lastModifiedElement.textContent = document.lastModified;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateFooter();
    displayWindChill();
});