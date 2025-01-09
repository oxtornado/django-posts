// API details
const API_URL = "https://api.themoviedb.org/3/movie/now_playing"; // URL to get the latest movies
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjllOGYzMDgzNTY0NmM1ZTAxN2RjYzVlMTAyZGZmZCIsIm5iZiI6MTczNjQ1NjY0NC4yNTEwMDAyLCJzdWIiOiI2NzgwMzljNGE2Nzc4YWE1YjM3YjQ5N2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FO8O_GLM1Wkykv7HC9yUFYCvb4VP3mpU4CT2hpjXjOs";

// HTML container to show movies
const content = document.querySelector(".content");

// Function to fetch movies
async function fetchLatestMovies() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        // Convert response to JSON
        const data = await response.json();

        // Show movies on the page
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Function to display movies
function displayMovies(movies) {
    const moviesContainer = document.querySelector(".movies-container");
    moviesContainer.innerHTML = ""; // Clear previous content

    movies.forEach((movie) => {
        if (!movie.poster_path) return; // Skip movies without a poster

        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        const poster = document.createElement("img");
        poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        poster.alt = movie.title;

        const title = document.createElement("h3");
        title.textContent = movie.title;

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        moviesContainer.appendChild(movieDiv);
    });
}

fetch("https://api.themoviedb.org/3/movie/upcoming", {
    method: "GET",
    headers: {
        Authorization: "Bearer YOUR_API_TOKEN",
    },
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data.results); // Inspect the API response here
        displayMovies(data.results);
    })
    .catch((error) => console.error("Error fetching movies:", error));


// Call the function to fetch movies
fetchLatestMovies();
