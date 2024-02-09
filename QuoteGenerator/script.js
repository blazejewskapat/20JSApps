let apiQuotes = []; // At the beginning it is empty (therefore let not const)

const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const quoteTextContainer = document.getElementById("quote-text");
const loader = document.getElementById("loader");
const view = document.getElementById("view");

// Show loading
function loading() {
  loader.style.display = "flex";
  view.style.display = "none";
}

// Hide loading
function showing() {
  loader.style.display = "none";
  view.style.display = "flex";
}

// Show New Quotes
function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * 1000) + 1];
  if (quote.text.length > 100) {
    quoteTextContainer.classList.add("long-quote-text");
  } else {
    quoteTextContainer.classList.remove("long-quote-text");
  }
  if (!quote.author) {
    authorText.textContent = "Undefined";
  } else {
    authorText.textContent = quote.author;
  }
  quoteText.textContent = quote.text;
}

// Get Quotes From Api
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    showing();
  } catch (error) {
    console.log(error);
  }
}

// Show Twitter with Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

getQuotes();
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);