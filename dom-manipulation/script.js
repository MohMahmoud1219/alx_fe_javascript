document.addEventListener('DOMContentLoaded', function () {
    // Load quotes from localStorage or use default ones
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
        { text: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
    ];

    const serverURL = 'https://jsonplaceholder.typicode.com/posts';
    const notification = document.getElementById('notification');

    // Load last selected filter from localStorage
    const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';

    // Function to populate categories dynamically
    function populateCategories() {
        const categories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories
        const categoryFilter = document.getElementById('categoryFilter');

        // Clear previous categories
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';

        // Add categories to dropdown
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        // Restore last selected filter
        categoryFilter.value = lastSelectedCategory;
    }

    // Function to show a random quote based on selected category
    function showRandomQuote() {
        const selectedCategory = document.getElementById('categoryFilter').value;
        const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[randomIndex];
        document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - <strong>Category:</strong> ${quote.category}`;
    }

    // Save quotes to localStorage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Function to add a new quote
    function addQuote() {
        const newQuoteText = document.getElementById('newQuoteText').value;
        const newQuoteCategory = document.getElementById('newQuoteCategory').value;

        if (newQuoteText && newQuoteCategory) {
            const newQuote = { text: newQuoteText, category: newQuoteCategory };
            quotes.push(newQuote);
            saveQuotes();  // Save the new quote in localStorage

            // Update the category dropdown if a new category is introduced
            populateCategories();

            // Clear the input fields
            document.getElementById('newQuoteText').value = '';
            document.getElementById('newQuoteCategory').value = '';

            alert('New quote added successfully!');
        } else {
            alert('Please fill in both fields.');
        }
    }

    // Function to filter quotes by category
    function filterQuotes() {
        const selectedCategory = document.getElementById('categoryFilter').value;
        localStorage.setItem('selectedCategory', selectedCategory);  // Save selected filter to localStorage
        showRandomQuote();
    }

    // Sync with the server every 30 seconds
    function syncWithServer() {
        fetch(serverURL)
            .then(response => response.json())
            .then(serverQuotes => {
                // Simulate conflict resolution: Server takes precedence
                const localQuoteIds = quotes.map(quote => quote.id);
                const newQuotes = serverQuotes.filter(serverQuote => !localQuoteIds.includes(serverQuote.id));
                
                if (newQuotes.length > 0) {
                    quotes.push(...newQuotes);
                    saveQuotes();
                    notification.textContent = "New quotes from the server were added.";
                }
            })
            .catch(error => {
                console.error("Error syncing with server:", error);
                notification.textContent = "Error syncing with server.";
            });
    }

    // Export quotes to JSON file
    document.getElementById('exportQuotes').addEventListener('click', function () {
        const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    // Import quotes from JSON file
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);  // Add imported quotes to the array
            saveQuotes();  // Save updated quotes to localStorage
            populateCategories();  // Repopulate categories
            alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
    }

    // Make import function accessible globally
    window.importFromJsonFile = importFromJsonFile;

    // Initialize the app
    populateCategories();  // Populate the categories dropdown
    filterQuotes();  // Show quotes based on the last selected filter

    // Show a random quote on button click
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);

    // Periodically sync with the server every 30 seconds
    setInterval(syncWithServer, 30000);
});
