const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const statusText = document.getElementById("status");
const favoritesDiv = document.getElementById("favorites");

// loading previously saved favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// display saved favorites on load
renderFavorites();

searchBtn.addEventListener("click", async () => {
    // get & clean up text entered by user
    const query = searchInput.value.trim();

    // if user didn't type anything, alert
    if(!query)
        return alert("Please enter a book title.");

    // show loading message & clear previous results
    statusText.textContent = "Loading...";
    results.innerHTML = "";

    try{
        // fetch book data from API
        // encodeURIComponent - makes it so spaces or symbols dont mess with URL
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        
        if(!response.ok)
            throw new Error("API request failed");

        // parse JSON data returned by API
        const data = await response.json();
        statusText.textContent = "";

        // if no books found
        if(data.docs.length === 0){
            results.innerHTML = "<p>No books found.</p>";
            return;
        }

        // looping through first 10 results & displaying
        data.docs.slice(0, 10).forEach(book => {
            // book info
            const title = book.title;
            const author = book.author_name ? book.author_name.join(", ") : "Unknown";
            const year = book.first_publish_year || "N/A"; 

            // for each book result, create a <div>
            const div = document.createElement("div");
            div.classList.add("book");

            // use template to insert book info into div
            div.innerHTML =`
                <strong>${title}</strong> by ${author} (${year})
                <button>Add to Favorites</button>
            `;
            div.querySelector("button").addEventListener("click", () => addFavorite({title, author, year}));
            
            // adding new div to results
            results.appendChild(div);
        });
    }
    catch (err){
        statusText.textContent = "Error loading books. Please try again";
    }
});

function addFavorite(book){
    // only add if book isn't already in favorites list
    if(!favorites.some(f => f.title === book.title)) {
        favorites.push(book);
        // save to localStorge
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();
    }
}

// show list of saved favorites
function renderFavorites(){
    favoritesDiv.innerHTML = "";
    favorites.forEach(book => {
        const div = document.createElement("div");
        div.classList.add("fav-book");
        div.textContent = `${book.title} by ${book.author}`;
        favoritesDiv.appendChild(div);
    });
}

// export favorites
document.getElementById("exportBtn").addEventListener("click", () => {
    // turning favorites array into JSON file
    const blob = new Blob([JSON.stringify(favorites, null, 2)], { type:"application/json"});
    
    // creating temp <a> to download file
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favorites.json";
    a.click();

    // free temp file URL from memory
    URL.revokeObjectURL(url);
});

// Clear data
document.getElementById("clearBtn").addEventListener("click", () => {
  if (confirm("Clear all favorites?")) {
    localStorage.removeItem("favorites");
    favorites = [];
    renderFavorites();
  }
});