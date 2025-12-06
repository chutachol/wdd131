// Product Array Data
const products = [
    { id: "p1", name: "TechPro Wireless Earbuds" },
    { id: "p2", name: "UltraView 4K Monitor" },
    { id: "p3", name: "SpeedBoost Gaming Laptop" },
    { id: "p4", name: "SmartHome Hub Pro" },
    { id: "p5", name: "PowerMax Portable Charger" },
    { id: "p6", name: "CaptureMaster DSLR Camera" },
    { id: "p7", name: "FitTrack Smart Watch" },
    { id: "p8", name: "AudioWave Bluetooth Speaker" },
    { id: "p9", name: "GameZone Pro Controller" },
    { id: "p10", name: "WorkFlex Ergonomic Chair" }
];

// DOM Elements
const productSelect = document.getElementById('productName');
const currentYearElement = document.getElementById('currentYear');
const lastModifiedElement = document.getElementById('lastModified');

// Initialize the page
function init() {
    // Set current year
    currentYearElement.textContent = new Date().getFullYear();
    
    // Set last modified date
    lastModifiedElement.textContent = document.lastModified;
    
    // Populate product select options
    populateProductOptions();
    
    // Set minimum date to today for installation date
    setMinDate();
    
    // Add form validation
    setupFormValidation();
}

// Populate product select options
function populateProductOptions() {
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Set minimum date for installation date
function setMinDate() {
    const today = new Date();
    const installDateInput = document.getElementById('installDate');
    
    // Format date as YYYY-MM-DD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;
    
    installDateInput.min = minDate;
    installDateInput.value = minDate;
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('reviewForm');
    
    form.addEventListener('submit', function(event) {
        let isValid = true;
        
        // Check required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                highlightError(field);
            } else {
                removeErrorHighlight(field);
            }
        });
        
        // Check rating (special case for radio buttons)
        const ratingSelected = form.querySelector('input[name="rating"]:checked');
        if (!ratingSelected) {
            isValid = false;
            const ratingContainer = document.querySelector('.rating-container');
            ratingContainer.style.borderColor = '#ef4444';
            ratingContainer.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        }
        
        if (!isValid) {
            event.preventDefault();
            showValidationMessage();
        }
    });
    
    // Remove error highlight when user starts typing
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            removeErrorHighlight(this);
            
            // Special handling for rating
            if (this.type === 'radio' && this.name === 'rating') {
                const ratingContainer = document.querySelector('.rating-container');
                ratingContainer.style.borderColor = '#e2e8f0';
                ratingContainer.style.boxShadow = 'none';
            }
        });
    });
}

// Helper functions for validation
function highlightError(element) {
    element.style.borderColor = '#ef4444';
    element.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
}

function removeErrorHighlight(element) {
    element.style.borderColor = '';
    element.style.boxShadow = '';
}

function showValidationMessage() {
    // Create or show validation message
    let message = document.querySelector('.validation-message');
    if (!message) {
        message = document.createElement('div');
        message.className = 'validation-message';
        message.style.cssText = `
            background-color: #fee2e2;
            color: #991b1b;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            border-left: 4px solid #ef4444;
        `;
        message.innerHTML = `
            <strong>Please complete all required fields:</strong>
            <ul style="margin: 0.5rem 0 0 1.5rem;">
                <li>Select a product</li>
                <li>Provide an overall rating</li>
                <li>Select the installation date</li>
            </ul>
        `;
        document.querySelector('#reviewForm').insertBefore(message, document.querySelector('.form-actions'));
    }
    
    // Scroll to message
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);