# Project Title
CineLog

# Application Type
Movie Review and Tracking System

# Problem Statement
The objective of this assignment is to develop a streamlined, full-stack web application that allows users to interact with a centralized database of films. The system must provide an accessible, responsive interface where individuals can browse available movies, view detailed information about specific titles, and submit personal ratings and written reviews which are then dynamically displayed in a public feed. Let users easily track their thoughts on films without requiring complex onboarding.

# Tech Stack

**Frontend Technologies:**
- React.js (Vite)
- CSS3 (Vanilla CSS with a custom, elegant light theme)

**Backend Technologies:**
- Node.js
- Express.js

**Database:**
- MongoDB

**Libraries/Tools Used:**
- `mongoose`: For MongoDB object modeling and schema validation.
- `cors`: To enable Cross-Origin Resource Sharing between the frontend and backend.
- `dotenv`: For managing application environment variables securely.
- `react-router-dom`: For client-side routing and navigation.

# Features Implemented
- **Browse Movies Portfolio:** View an aggregate, grid-based list of all available movies retrieved from the database.
- **Detailed View:** Dedicated pages for individual movies displaying the poster, release year, director, and plot description.
- **Review System:** Users can submit text-based reviews for specific movies.
- **Rating System:** Simple standard `<select>` dropdown menu to assign a 1-to-5 star rating.
- **Real-Time Review Feed:** Displays all historic reviews and ratings submitted for a given film, sorted chronologically.
- **Basic Aesthetic UI:** Built using standard HTML tags and minimalistic CSS to prioritize functionality and a clean, readable layout without relying on bloated framework templates.
- **Database Seeding:** Standalone seeding mechanism to initially populate the database with realistic movie data and posters.

# Folder Structure
- `frontend/`: Contains the React.js client application.
  - `src/components/`: Reusable React components (e.g., Header navigation).
  - `src/pages/`: Main route-level view components (e.g., Home, MovieDetail).
  - `src/index.css`: Global styling and UI design tokens.
  - `src/App.jsx`: Entry point for client-side routing.
- `backend/`: Contains the Node.js/Express.js server and API logic.
  - `models/`: Mongoose schemas defining the MongoDB collections (Movie, Review).
  - `server.js`: Core Express server configuration, middleware integration, and API routes definition.
  - `seed.js`: Script utilized to wipe and pre-populate the database with test data.

# API Endpoints

- `GET /api/movies`
  - **Purpose**: Fetches a listing of all movies in the database, typically sorted by creation date. Returns an array of movie objects.
- `GET /api/movies/:id`
  - **Purpose**: Retrieves the detailed information for a specific movie matched by its `_id`, along with an array of all reviews associated with that movie.
- `POST /api/movies/:id/reviews`
  - **Purpose**: Accepts a JSON payload containing `rating`, `text`, and an optional `reviewerName`. It creates a new review record linked to the specific `movieId` and returns the newly saved review object.

# Database Schema

**Movie Collection (`Movie.js`)**
- `title` (String, required) - The name of the film.
- `year` (Number) - Release year.
- `director` (String) - Filmmaker's name.
- `posterUrl` (String) - URL pathway to the movie's poster image.
- `description` (String) - Synopsis of the movie.
- `createdAt` (Date) - Auto-generated timestamp.

**Review Collection (`Review.js`)**
- `movieId` (ObjectId, required) - Reference ID mapping the review back to a specific Movie.
- `reviewerName` (String) - The name/alias of the author (defaults to 'Current User' if anonymous).
- `rating` (Number, required) - The assigned star rating (1 to 5).
- `text` (String, required) - The textual content of the review.
- `createdAt` (Date) - Auto-generated timestamp to order the review feed.

# Key Frontend Components

- **App (`App.jsx`)**: The foundational component storing the `BrowserRouter` to orchestrate navigation and rendering the universal `Header`.
- **Header (`Header.jsx`)**: The global navigation bar allowing users to quickly return to the main films feed. 
- **Home (`Home.jsx`)**: Makes a `GET` request on mount to display the grid of movies utilizing the `Link` component to direct users to specific detail pages.
- **MovieDetail (`MovieDetail.jsx`)**: The detail component of the application. It dynamically fetches both the requested movie and associative reviews based on URL parameters. It hosts internal state for the basic review/rating form and handles `POST` execution to update the review list upon successful submission.

# Application Workflow

1. **Initialization:** The backend Express server runs on port 5000 connected to MongoDB, while the Vite development server serves the React app to the user.
2. **Browsing:** The user hits the base URL `/`. The `Home` component makes an HTTP asynchronous `fetch` call to `/api/movies`. The Express backend hits MongoDB and returns all movie objects. The UI renders these as visual poster cards.
3. **Selection:** The user clicks a movie placard, navigating client-side to `/movie/:id`.
4. **Fetching Details:** The `MovieDetail` component detects its mount and leverages the `id` param to hit the `/api/movies/:id` endpoint. It receives the core movie details and all related historic reviews.
5. **Engagement:** The user interacts with the standard HTML form, selecting a numerical rating from the dropdown menu and typing a review. 
6. **Submission:** User clicks "Submit Review", dispatching a `POST` request to the backend. The server inserts the new review document utilizing Mongoose. Upon resolving, the frontend immediately populates the review to the top of the local review feed array.

# Special Features

1. **Standard Form Implementation:** Highly accessible logic avoiding over-engineered custom plugins. Exclusively leverages native browser `<select>` and `<textarea>` elements mapped intrinsically to React's component state.
2. **Instant UI Feedback:** When a review is posted, it doesn't force a full page reload; instead, the state instantly prepends the latest review payload directly, making the basic Single Page Application functional and responsive.

# Limitations

- **Lack of Authentication:** The application intentionally bypasses a formalized login and Registration cycle. All reviews are anonymously hardcoded to "Current User".
- **Immutable Reviews:** Currently, there is no implementation permitting end users to update, edit, or delete a review after it has been accidentally submitted.
- **Static Catalog:** Films can currently only be ingested via the `seed.js` script. There is no administrative panel interface to add or remove movies via the front-end dynamically.

# Future Enhancements

- Implementing standard JSON Web Token (JWT) authentication paired with hashing via bcrypt for real user accounts.
- Giving users their own dedicated profile pages to view historical reviews.
- Formulating an administrative dashboard providing CRUD (Create, Read, Update, Delete) capability specifically mapped to the Movie catalog data.
- Introducing a search bar mechanism allowing users to easily parse through a much larger database of films.

# Conclusion Summary

CineLog successfully serves as a cohesive, end-to-end MERN stack implementation mapping to modern web-development methodologies. It leverages an Express REST API directly feeding a reactive state-driven frontend. Complete with robust data relationships (Movies 1:N Reviews) and immersive UI/UX styling, the project efficiently solves the core requirements of creating an elegant and functional movie tracking and review application.
