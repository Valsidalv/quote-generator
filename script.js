const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const quoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector(".loader");

let quotes = [];

function showLoadingSpinner() {
  loader.style.display = "block";
  quoteContainer.style.display = "none";
}

function removeLoadingSpinner() {
  loader.style.display = "none";
  quoteContainer.style.display = "block";
}


async function getQuotesFromApi() {
  showLoadingSpinner();

  const apiUrl = "https://type.fit/api/quotes";

  try {
    const res = await fetch(apiUrl);
    quotes = await res.json();

    console.log(res);
    newQuote();

  } catch (err) {
      alert(err)
    console.log(err);
  }
}

// display fetched quote
function newQuote() {
  showLoadingSpinner();
  // pick random quote
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)] // kept this for reference if you want to get qoute from local file

  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }

  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  //   set quote and hide loader
  setTimeout(removeLoadingSpinner, 1500); // i added this function to make loading spinner visible in case it loads too fast :)
  //   loaded();
  quoteText.textContent = quote.text;
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

// handle events
quoteBtn.addEventListener("click", getQuotesFromApi);
twitterBtn.addEventListener("click", tweetQuote);

getQuotesFromApi();
// newQuote();
