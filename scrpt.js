// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Search Bar Functionality ---
    // Get references to the search input, search button, and search select (dropdown)
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const searchSelect = document.querySelector('.search-select');

    /**
     * Handles the search action.
     * Logs the search query and the selected category to the console.
     */
    function performSearch() {
        const query = searchInput.value.trim(); // Get the search input value, trim whitespace
        const category = searchSelect.value; // Get the selected category value

        if (query) {
            console.log(`Searching for: "${query}" in category: "${category}"`);
            // In a real application, you would typically redirect to a search results page
            // For example: window.location.href = `/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`;
            // Or make an AJAX call to a backend API.
            // For this basic example, we'll just log it.
            displayMessageBox(`Searching for "${query}" in "${category}"`);
        } else {
            console.log('Search input is empty.');
            displayMessageBox('Please enter something to search.');
        }
    }

    // Add event listener to the search button for a click event
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Add event listener to the search input for the 'Enter' key press
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Add event listener to the search select (dropdown) for change event
    if (searchSelect) {
        searchSelect.addEventListener('change', () => {
            const selectedCategory = searchSelect.value;
            console.log(`Selected category: ${selectedCategory}`);
            displayMessageBox(`Category changed to: "${selectedCategory}"`);
        });
    }

    // --- "Shop Now" Button Functionality for Product Boxes ---
    // Get all elements that have a class ending with '-image-new' (e.g., box1-image-new)
    const shopNowButtons = document.querySelectorAll('[class$="-image-new"]');

    // Iterate over each "shop now" button and add a click event listener
    shopNowButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                // Get the parent box's text to provide more context
                const parentBox = button.closest('.box');
                let productCategory = "this category";
                if (parentBox) {
                    const boxTextElement = parentBox.querySelector('[class$="-text"]');
                    if (boxTextElement) {
                        productCategory = boxTextElement.textContent.trim();
                    }
                }
                console.log(`Clicked "Shop Now" for: ${productCategory}`);
                // In a real application, this would navigate to a specific product listing or category page.
                displayMessageBox(`Redirecting to products for: "${productCategory}"`);
            });
        }
    });

    // --- Hero Section Link Functionality ---
    const amazonInLink = document.querySelector('.hero-msg a');

    if (amazonInLink) {
        amazonInLink.addEventListener('click', (event) => {
            // Prevent the default link behavior (navigating away) for demonstration
            event.preventDefault();
            const linkText = amazonInLink.textContent.trim();
            console.log(`Clicked on: "${linkText}"`);
            displayMessageBox(`Simulating click on "${linkText}". In a real app, this would redirect to amazon.in.`);
            // In a real application, you would allow the default behavior or use window.location.href
            // window.location.href = 'https://www.amazon.in';
        });
    }

    // --- Panel Links Functionality ---
    const panelLinks = document.querySelectorAll('.panel-opp a');
    panelLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const linkText = link.textContent.trim();
            console.log(`Clicked panel link: "${linkText}"`);
            displayMessageBox(`Clicked on panel link: "${linkText}"`);
        });
    });

    // --- All Panel Button Functionality ---
    const allPanelButton = document.querySelector('.panel-opp .fa-list-ul').closest('div'); // Get the parent div of the icon

    if (allPanelButton) {
        allPanelButton.addEventListener('click', () => {
            console.log("Clicked 'All' button in the panel.");
            displayMessageBox("Displaying all categories (placeholder action).");
            // In a real application, this would open a sidebar menu or a full-page category list.
        });
    }


    // --- Custom Message Box Function (instead of alert) ---
    /**
     * Displays a temporary message box at the top of the screen.
     * @param {string} message - The message to display.
     */
    function displayMessageBox(message) {
        let messageBox = document.getElementById('customMessageBox');
        if (!messageBox) {
            messageBox = document.createElement('div');
            messageBox.id = 'customMessageBox';
            // Apply basic styling for visibility
            messageBox.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #4CAF50; /* Green */
                color: white;
                padding: 10px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                font-family: 'Inter', sans-serif;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
            `;
            document.body.appendChild(messageBox);
        }

        messageBox.textContent = message;
        messageBox.style.opacity = '1'; // Make it visible

        // Hide the message box after a few seconds
        setTimeout(() => {
            messageBox.style.opacity = '0';
        }, 3000); // Message visible for 3 seconds
    }
});
