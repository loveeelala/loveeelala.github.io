document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('expanded');
    });
});

const darkModeToggle = document.getElementById('darkModeToggle');

if(localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if(document.body.classList.contains('dark-mode')){
        localStorage.setItem('theme', 'dark');
    }
    else{
        localStorage.setItem('theme','light')
    }
});