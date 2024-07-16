const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const generalBtn = document.getElementById('general');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById("loader")


let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    loading()
    // Pick random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if auther field is blank
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length to determin styling

    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    //Set quote hide loader
    quoteText.textContent = quote.text;
    complete();
}

function generalButton() {
    // const generalQuotes = apiQuotes.filter(quote => quote.tag === 'general');
    // console.log('f');
    console.log('Hello');
}

// Get Quotes form API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    // const apiUrl = 'https://zenquotes.io/api/random';
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();
        newQuote()
        // console.table(quote);
        // apiQuotes.forEach((quote, index) => {
        //     console.log(`${index + 1}: ${quote.text}`);
        // });
    } catch (err) {
        console.error('Error fetching quotes:', err);
    }
}

function selectType() {
    console.log(apiQuotes);
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    open(twitterUrl, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
generalBtn.addEventListener('click', generalButton);

// On Load
getQuotes()
