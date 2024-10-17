document.addEventListener('DOMContentLoaded', function () {
    // Load quotes from localStorage or use default ones
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
        { text: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
    ];

    // Function to show a random quote
    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
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

            // Clear the input fields
            document.getElementById('newQuoteText').value = '';
            document.getElementById('newQuoteCategory').value = '';

            alert('New quote added successfully!');
        } else {
            alert('Please fill in both fields.');
        }
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
            alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
    }

    // Make import function accessible globally
    window.importFromJsonFile = importFromJsonFile;

    // Show a random quote on button click
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);

    // Call the function to load any existing quotes on page load
    showRandomQuote();
});
