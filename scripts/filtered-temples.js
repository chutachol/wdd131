// Complete temple array with additional temples - FIXED IMAGE URLs
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Additional temples (3 more as required)
    {
        templeName: "Salt Lake City Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        // FIXED URL - Using reliable working URL
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-6932.jpg"
    },
    {
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, November, 2",
        area: 59246,
        // FIXED URL - Using reliable working URL
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/sao-paulo-brazil-temple/sao-paulo-brazil-temple-14825.jpg"
    }
];

// DOM Elements
const templeContainer = document.getElementById('temple-container');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const countElement = document.getElementById('count');
const currentYearElement = document.getElementById('currentYear');
const lastModifiedElement = document.getElementById('lastModified');

// Helper function to extract year from dedication date
function getDedicationYear(dedicationString) {
    const yearPart = dedicationString.split(',')[0].trim();
    return parseInt(yearPart);
}

// Filter functions
const filterFunctions = {
    all: () => true,
    
    old: (temple) => {
        const year = getDedicationYear(temple.dedicated);
        return year < 1900;
    },
    
    new: (temple) => {
        const year = getDedicationYear(temple.dedicated);
        return year > 2000;
    },
    
    large: (temple) => temple.area > 90000,
    
    small: (temple) => temple.area < 10000
};

// Create temple card element with error handling for images
function createTempleCard(temple) {
    const card = document.createElement('article');
    card.className = 'temple-card';
    
    // Format area with commas
    const formattedArea = temple.area.toLocaleString();
    
    // Create card with error handling for broken images
    card.innerHTML = `
        <img src="${temple.imageUrl}" 
             alt="${temple.templeName} Temple" 
             class="temple-image"
             loading="lazy"
             width="400"
             height="250"
             onerror="this.onerror=null; this.src='https://via.placeholder.com/400x250/2c3e50/ffffff?text=${encodeURIComponent(temple.templeName)}'">
        <div class="temple-info">
            <h3>${temple.templeName}</h3>
            <p class="location">${temple.location}</p>
            <p class="dedication">Dedicated: ${temple.dedicated}</p>
            <p class="area">Area: ${formattedArea} sq ft</p>
        </div>
    `;
    
    return card;
}

// Display temples based on filter
function displayTemples(filterType = 'all') {
    // Clear container
    templeContainer.innerHTML = '';
    
    // Filter temples
    const filteredTemples = temples.filter(filterFunctions[filterType]);
    
    // Update count
    countElement.textContent = filteredTemples.length;
    
    // Display filtered temples
    if (filteredTemples.length === 0) {
        templeContainer.innerHTML = `
            <div class="loading" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <p>No temples found for this filter.</p>
                <p>Try selecting a different category.</p>
            </div>
        `;
    } else {
        filteredTemples.forEach(temple => {
            const card = createTempleCard(temple);
            templeContainer.appendChild(card);
        });
    }
    
    // Update active navigation link
    navLinks.forEach(link => {
        if (link.dataset.filter === filterType) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize the page
function init() {
    // Set current year
    currentYearElement.textContent = new Date().getFullYear();
    
    // Set last modified date
    lastModifiedElement.textContent = document.lastModified;
    
    // Display all temples initially
    displayTemples('all');
    
    // Set up navigation event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filterType = link.dataset.filter;
            displayTemples(filterType);
            
            // Close mobile menu if open
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('show');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { temples, filterFunctions, createTempleCard };
}