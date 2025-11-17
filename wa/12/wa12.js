const posts = [
    {
        type: "popular",
        creator: "@dancequeen",
        followers: "2.3M",
        engagement: "14%",
        caption: "New trend just dropped",
        content: "Dance trend (1M views)",
        image: "images/pexels-dance.jpg"
    },

    {
        type: "diverse",
        creator: "@IndigenousArt",
        followers: "12k",
        engagement: "8%",
        caption: "Handmade beadwork from my tribe",
        content: "Indigenous beadwork (12k views)",
        image: "images/pexels-beads.jpg"
    },

    {
        type: "educational",
        creator: "@mathShorts",
        followers: "30k",
        engagement: "9%",
        caption: "Calculus in 30 seconds",
        content: "Quick Calculus",
        image: "images/pexels-math.jpg"
    }
];

// Get slider values for algorithm weights
function getWeights() {
    return {
        popular: Number(document.getElementById("popularity").value),
        diverse: Number(document.getElementById("diversity").value),
        educational: Number(document.getElementById("education").value)
    };
}

// Update explanation box
function updateExplanation(weights) {
    const box = document.getElementById("explanation");
    let dominant;

    if (weights.popular > weights.diverse && weights.popular > weights.educational) {
        dominant = "popular content, boosting already large creators.";
    } 
    else if (weights.diverse > weights.popular && weights.diverse > weights.educational) {
        dominant = "diverse creators and underrepresented communities.";
    }
    else if (weights.educational > weights.popular && weights.educational > weights.diverse) {
        dominant = "educational videos focus on depth over engagement.";
    } 
    else {
        dominant = "all categories are weighted evenly, resulting in a more balanced feed.";
    }

    box.textContent = "Your algorithm currently prioritizes " + dominant;
}

// Render the feed
function showFeed() {
    const weights = getWeights();
    updateExplanation(weights);

    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    const ranked = [...posts].sort((a, b) => weights[b.type] - weights[a.type]);

    ranked.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.setAttribute("role", "article");

        // Video area
        const videoDiv = document.createElement("div");
        videoDiv.classList.add("video-area");
        videoDiv.style.backgroundImage = `url(${post.image})`;

        // Creator info
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("creator-info");
        infoDiv.innerHTML = `
            <div class="creator-name">${post.creator}</div>
            <div class="creator-stats">${post.followers} • ${post.engagement} engagement</div>
            <div class="caption">${post.caption}</div>
        `;

        // Actions
        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("actions");
        actionsDiv.innerHTML = `
            <div>❤️<br>${Math.floor(Math.random()*200)+100}</div>
            <div>💬<br>${Math.floor(Math.random()*50)+10}</div>
            <div>↗️<br>${Math.floor(Math.random()*30)+5}</div>
        `;

        // Suppression visual
        const highestWeight = Math.max(weights.popular, weights.diverse, weights.educational);
        if (weights[post.type] < highestWeight) {
            postDiv.style.opacity = "0.4";
            postDiv.style.filter = "blur(1px)";
            postDiv.style.transform = "scale(0.95)";
        }

        // Append all post elements
        postDiv.appendChild(videoDiv);
        postDiv.appendChild(infoDiv);
        postDiv.appendChild(actionsDiv);

        // Add to feed
        feed.appendChild(postDiv);
    });
}

// Event listeners
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("input", showFeed);
});

// Initial render
showFeed();
