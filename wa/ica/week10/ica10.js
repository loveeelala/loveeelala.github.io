const quoteBtn = document.querySelector('#js-new-quote');
const answerBtn = document.querySelector('#js-tweet');
const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

quoteBtn.addEventListener('click', getQuote);
answerBtn.addEventListener('click', showAnswer);

let currentAnswer = "";

function getQuote(){
    fetch(endpoint)
    .then(response => {
        if(!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        currentAnswer=data.answer;
        displayQuote(data.question);
        clearAnswer();
    })
    .catch(error => {
        console.error("Fetch error:", error);
        alert("something went wrong");
    });
}

function displayQuote(quote) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
}

function showAnswer() {
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = currentAnswer || "Click 'Generate a new bit of trivia!' first!";
}

function clearAnswer() {
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = "";
}

getQuote();