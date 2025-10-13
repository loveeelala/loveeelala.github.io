// Hamburger menu
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

var menu_shown = false;

function showMenu(){
    var shown = navMenu.classList.toggle("show");
    navMenu.classList.toggle("hide");

    if(shown){
        navToggle.setAttribute("aria-expanded", "true");
    }
    else{
        navToggle.setAttribute("aria-expanded", "false");
    }

}

navToggle.addEventListener('click', showMenu);

// resource filter & expansion
const filterButtons = document.querySelectorAll('#resource-filter button');
const resourceCards = document.querySelectorAll('.resource-card');
const expandButtons = document.querySelectorAll('.expand-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const filterValue = button.dataset.category;
        filterResources(filterValue);
    });
});

function filterResources(category){
    resourceCards.forEach(card => {
        if(category === 'all' || card.dataset.category === category){
            card.style.display = 'block';
        }
        else{
            card.style.display = 'none';
        }
    });
}

expandButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const card = button.closest('.resource-card');
        card.classList.toggle('expanded');
    });
});

// feedback button

// selecting all feedback buttons
const feedbackButtons = document.querySelectorAll('.feedback-btn');

// looping through each feedback button
feedbackButtons.forEach(button => {

        // finding span that displays count
        const countSpan = button.querySelector('.count');
        // getting resource name
        const resource = button.closest('.feedback').dataset.resource;
        // getting type of feedback (helpful/not helpful)
        const feedbackType = button.dataset.feedback;

        // creating unique key for THIS feedback button depending on resource & feedback type
        const key = `feedback-${resource}-${feedbackType}`;

        let savedCount = localStorage.getItem(key);
        
        // if there's saved data from localStorage 
        if(savedCount){
            // update visible number
            countSpan.textContent = savedCount;
        }

        button.addEventListener('click', () => {
            // get current num shown in count span
            let currentCount = parseInt(countSpan.textContent);
            currentCount++;
            // update count shown on page
            countSpan.textContent = currentCount;

            // saving new count to localStorage
            localStorage.setItem(key, currentCount);
        });
});


// theme

// Save user's theme choice
function setTheme(theme) {
    // stores user's theme preference (light/dark) in localStorage
    localStorage.setItem('userTheme', theme);

    //applies theme by updating class on the document body
    document.body.className = theme;
}

// Load saved theme on page load
window.addEventListener('load', function() {
    // retreives saved theme from localStorage, defaults to light if none exists
    const savedTheme = localStorage.getItem('userTheme') || 'light';

    // applies retrieved/default theme to document body
    document.body.className = savedTheme;
});

// retrieves theme toggle button element
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
    // checks current theme class on body to determine new theme
    const newTheme = document.body.className === 'dark' ? 'light': 'dark';

    // saves and applies new theme
    setTheme(newTheme);
});


// modal

document.addEventListener('DOMContentLoaded', () => {
    const openPrivacyBtn = document.getElementById('open-privacy');
    const privacyModal = document.getElementById('privacy-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const clearDataBtn = document.getElementById('clear-data-btn');
    
    if(!openPrivacyBtn || !privacyModal || !closeModalBtn || !clearDataBtn)
        return;

    // open modal
    openPrivacyBtn.addEventListener('click', () => {
        privacyModal.classList.remove('hide');
    });

    closeModalBtn.addEventListener('click', () =>{
        privacyModal.classList.add('hide');
    });

    window.addEventListener('click', (event) =>{
        if(event.target === privacyModal)
        {
            privacyModal.classList.add('hide');
        }
    });

    clearDataBtn.addEventListener('click', () => {
        localStorage.clear();
        alert("Your saved data has been cleared.");
    });
});