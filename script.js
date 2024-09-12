// Include API for currency exchange
const api = "https://api.exchangerate-api.com/v4/latest/USD";

// For selecting different controls
var search = document.querySelector(".searchBox");
var convert = document.querySelector(".convert");
var fromCurrency = document.querySelector(".from");
var toCurrency = document.querySelector(".to");
var finalValue = document.querySelector(".finalValue");
var finalAmount = document.getElementById("finalAmount");

var resultFrom = "USD"; // Initialize with default value
var resultTo = "INR"; // Initialize with default value
var searchValue = 1; // Initialize with a default value

// Event when the 'From' currency is changed
fromCurrency.addEventListener('change', (event) => {
    resultFrom = event.target.value;
});

// Event when the 'To' currency is changed
toCurrency.addEventListener('change', (event) => {
    resultTo = event.target.value;
});

// Event when the input value is updated
search.addEventListener('input', updateValue);

// Function for updating the search value
function updateValue(e) {
    searchValue = e.target.value;
}

// When user clicks, it calls function getResults
convert.addEventListener("click", getResults);

// Function to fetch and display results
function getResults() {
    fetch(`${api}`)
        .then(response => {
            return response.json();
        })
        .then(displayResults)
        .catch(error => {
            console.error("Error fetching the currency data: ", error);
        });
}

// Display results after conversion
function displayResults(currency) {
    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];
    let convertedValue = ((toRate / fromRate) * searchValue).toFixed(2);
    finalValue.innerHTML = convertedValue;
    finalAmount.style.display = "block";
}

// When user clicks on reset button
function clearVal() {
    window.location.reload(); // Reload the page to reset
    finalValue.innerHTML = ""; // Clear the displayed value
}