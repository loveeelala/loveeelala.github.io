const posts = [
    {type: "popular", content: "Dance trend (1M views)"},
    {type: "diverse", content: "Indigenous beadwork (12k views)"},
    {type: "educational", content: "Calculus in 30 seconds (15k views)"}
];

function showFeed(priority) {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    // Rank posts: prioritize selected type
    const ranked = [...posts].sort((a, b) => {
        if (a.type === priority && b.type !== priority) 
            return -1;
        if (b.type === priority && a.type !== priority) 
            return 1;
        return 0;
    });

    ranked.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post", post.type);
    div.textContent = post.content;

    // Make non-priority posts appear faded (to show bias)
    if (post.type !== priority) 
        div.style.opacity = 0.4;
        
    feed.appendChild(div);
  });
}

document.getElementById("popular").addEventListener("click", () => showFeed("popular"));
document.getElementById("diverse").addEventListener("click", () => showFeed("diverse"));
document.getElementById("educational").addEventListener("click", () => showFeed("educational"));

// default view
showFeed("popular");
