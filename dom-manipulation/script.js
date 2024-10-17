document.addEventListener('DOMContentLoaded', function () {
    // Initial array of quotes
    const quotes = [
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

    // Create the form for adding quotes
    function createAddQuoteForm() {
        const formContainer = document.createElement('div');

        // Create input fields
        const newQuoteText = document.createElement('input');
        newQuoteText.id = 'newQuoteText';
        newQuoteText.type = 'text';
        newQuoteText.placeholder = 'Enter a new quote';

        const newQuoteCategory = document.createElement('input');
        newQuoteCategory.id = 'newQuoteCategory';
        newQuoteCategory.type = 'text';
        newQuoteCategory.placeholder = 'Enter quote category';

        // Create add quote button
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Quote';
        addButton.onclick = addQuote;

        // Append elements to the form container
        formContainer.appendChild(newQuoteText);
        formContainer.appendChild(newQuoteCategory);
        formContainer.appendChild(addButton);

        // Append form container to the body (or any desired parent element)
        document.body.appendChild(formContainer);
    }

    // Function to add a new quote
    function addQuote() {
        const newQuoteText = document.getElementById('newQuoteText').value;
        const newQuoteCategory = document.getElementById('newQuoteCategory').value;

        if (newQuoteText && newQuoteCategory) {
            const newQuote = { text: newQuoteText, category: newQuoteCategory };
            quotes.push(newQuote);

            // Clear the input fields
            document.getElementById('newQuoteText').value = '';
            document.getElementById('newQuoteCategory').value = '';

            alert('New quote added successfully!');
        } else {
            alert('Please fill in both fields.');
        }
    }

    // Show a random quote on button click
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);

    // Call the createAddQuoteForm function to generate the form dynamically
    createAddQuoteForm();
});
