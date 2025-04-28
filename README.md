# Movie Finder

A full-stack web application that allows users to explore top-rated movies and latest releases. Built with Node.js, Express, and a Tailwind CSS frontend. Movie data is dynamically fetched from the OMDb API.

---

## Project Features

- Frontend styled with Tailwind CSS and animated with AOS (Animate On Scroll)
- Backend server using Express and Axios to fetch movie data from OMDb API
- Simple in-memory caching mechanism to improve API efficiency
- Responsive design with smooth scroll animations
- Dynamic display of movie cards based on real API data

---

## Tech Stack

- **Frontend**: HTML, Tailwind CSS (via CDN), AOS (Animate on Scroll)
- **Backend**: Node.js, Express, Axios
- **API**: [OMDb API](http://www.omdbapi.com/)
- **Testing**: Mocha, Chai (Test file provided by apprenticeship instructors)

---

## How to Run Locally

1. **Clone the repository**

```bash
git clone <your-repository-url>
cd movie-finder
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up your environment variables**

- Create a `.env` file at the root
- Add your OMDb API key:
  ```bash
  API_KEY=your_omdb_api_key_here
  ```

4. **Start the server**

```bash
npm start
```

5. **Visit the app**

- Open your browser at: [http://localhost:3000](http://localhost:3000)

---

## Running Tests

This project includes provided tests for backend functionality.

> **Important:** In order to pass all tests, you must comment/uncomment certain sections of `app.js`.

### Why?

- This project has two working versions:
  - One for serving the frontend (public-facing site)
  - One for strict backend testing (no static file serving)

### How to prepare for testing:

1. In `server/app.js`:

   - **Comment out**:
     ```javascript
     app.use(express.static("public"));
     ```
   - **Comment out**:
     ```javascript
     app.get("/api/movies", (req, res) => {...})
     ```
   - **Uncomment** the existing root route:
     ```javascript
     app.get("/", (req, res) => {...})
     ```

2. Run tests:

```bash
npm test
```

Now all tests should pass successfully!

---

## Notes About This Project

- This project was created as part of an apprenticeship.
- TailwindCSS was used via CDN for faster prototyping.
- **This was my first experience working with TailwindCSS**, and using the CDN allowed me to learn and experiment quickly without setting up a full build environment. I am aware that using the CDN is not optimal for production.
- Frontend movie display pulls live data from the backend API.
- AOS was used to enhance user experience with smooth scroll animations.
- Code is heavily commented to aid my own understanding and future improvements.

---

## Future Improvements

- Add a live search feature to find any movie by title by giving some functionality to the Get Started button
- Implement error handling UI for missing posters or invalid API responses
- Transition to using a local Tailwind build for production optimization
- Expand API routes for genre, rating, or year-based searches

---

# Thank you for reviewing this project!
