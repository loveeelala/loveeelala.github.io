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

// resource filter
const filterButtons = document.querySelectorAll('#resource-filter button');
const resourceCards = document.querySelectorAll('.resource-card');

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

// feedback button

const feedbackButtons = document.querySelectorAll('.feedback-btn');

feedbackButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const countSpan = button.querySelector('.count');
        let currentCount = parseInt(countSpan.textContent);
        countSpan.textContent = currentCount+1;
    })
})


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