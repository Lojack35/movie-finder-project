// ==== LOAD REQUIRED MODULES ====
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

// ==== SET UP ENVIRONMENT VARIABLE AND INITIALIZE APP ====
const API_KEY = process.env.API_KEY;
const app = express();

// ==== SET UP CACHE AND PERIODIC CACHE CLEARING ====
const cache = {}; // Simple in-memory cache to store movie data

setInterval(() => {
  // Clears the cache every 24 hours
  console.log("Clearing cache...");
  for (const key in cache) {
    delete cache[key];
  }
  console.log("Cache cleared.");
}, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

app.use(morgan("dev")); // Logs HTTP requests to the console for debugging
app.use(express.static("public")); // Serves static files from the 'public' directory

app.get("/api/movies", (req, res) => {
  const movieId = req.query.i; // Extracts movie ID from URL query (everything after '?i=' in the URL)
  const title = req.query.t; // Extracts movie title from URL query (everything after '?t=' in the URL)

  // ==== CHECK IF MOVIE DATA IS ALREADY CACHED ====
  if (movieId && cache[movieId]) {
    // Checks if movieId is provided and if its data is cached
    return res.status(200).json(cache[movieId]); // Returns cached movie data if available
  }
  if (title && cache[title.toLowerCase()]) {
    // Checks if movie title is provided and if its data is cached
    return res.status(200).json(cache[title.toLowerCase()]); // Returns cached movie data if available
  }

  // ==== CONSTRUCT THE API REQUEST URL ====
  let url = `http://www.omdbapi.com/?apikey=${API_KEY}`; // Constructs the base URL for the OMDB API
  if (movieId) {
    url += `&i=${movieId}`; // Appends movie ID to the URL if provided
  } else if (title) {
    url += `&t=${encodeURIComponent(title)}`; // Appends movie title to the URL if provided
  } else {
    return res.status(400).send("Please provide a movie ID or title."); // Returns an error if neither is provided
  }

  // ==== FETCH MOVIE DATA FROM THE OMDB API ====
  axios
    .get(url)
    .then((response) => {
      const data = response.data; // Extracts the data from the API response

      // ==== SAVE MOVIE DATA TO CACHE ====
      if (movieId) {
        // If movieId is provided in the request,
        cache[movieId] = data; // Cache the movie data using the movie ID as the key
      } else if (title) {
        // If title is provided in the request,
        cache[title.toLowerCase()] = data; // Cache the movie data using the title (in lowercase) as the key
      }
      res.status(200).json(response.data); // Then send the response data back to the user
    })
    .catch((error) => {
      // If an error occurs during the request to the OMDB API,
      console.error("Error fetching movie data:", error); // Log the error to the console for debugging
      res.status(500).send("Error fetching movie data");
    });
});

// // Duplicate route at "/" to support testing
// app.get("/", (req, res) => {
//   const movieId = req.query.i;
//   const title = req.query.t;

//   if (movieId && cache[movieId]) {
//     return res.status(200).json(cache[movieId]);
//   }
//   if (title && cache[title.toLowerCase()]) {
//     return res.status(200).json(cache[title.toLowerCase()]);
//   }

//   let url = `http://www.omdbapi.com/?apikey=${API_KEY}`;
//   if (movieId) {
//     url += `&i=${movieId}`;
//   } else if (title) {
//     url += `&t=${encodeURIComponent(title)}`;
//   } else {
//     return res.status(400).send("Please provide a movie ID or title.");
//   }

//   axios
//     .get(url)
//     .then((response) => {
//       const data = response.data;
//       if (movieId) {
//         cache[movieId] = data;
//       } else if (title) {
//         cache[title.toLowerCase()] = data;
//       }
//       res.status(200).json(response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching movie data:", error);
//       res.status(500).send("Error fetching movie data");
//     });
// });

// ==== EXPORT THE APP MODULE ====
module.exports = app;
