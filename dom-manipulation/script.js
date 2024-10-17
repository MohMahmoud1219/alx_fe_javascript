document.addEventListener('DOMContentLoaded', function () {
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
        { text: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
    ];

    const serverURL = 'https://jsonplaceholder.typicode.com/posts';
    const notification = document.getElementById('notification');

    // Function to fetch quotes from server using async/await
    async function fetchQuotesFromServer() {
        try {
            const response = await fetch(serverURL);
            const serverQuotes = await response.json();
            return serverQuotes;
        } catch (error) {
            console.error("Error fetching from server:", error);
            notification.textContent = "Error fetching from server.";
            return [];
        }
    }

    // Function to sync with the server
    async function syncWithServer() {
        const serverQuotes = await fetchQuotesFromServer();
        const localQuoteIds = quotes.map(quote => quote.id);
        const newQuotes = serverQuotes.filter(serverQuote => !localQuoteIds.includes(serverQuote.id));

        if (newQuotes.length > 0) {
            quotes.push(...newQuotes);
            saveQuotes();
            notification.textContent = "New quotes from the server were added.";
        }
    }

    // Function to save quotes to localStorage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // باقي الكود مثل: إضافة اقتباسات جديدة، تصدير JSON، استيراد JSON، الفلترة، عرض اقتباسات عشوائية

    // Example: Add quote function
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

    // استدعاء المزامنة مع الخادم كل 30 ثانية
    setInterval(syncWithServer, 30000);

    // باقي الكود كما هو (مثل إضافة الاقتباسات، تصدير JSON، استيراد JSON)

});
