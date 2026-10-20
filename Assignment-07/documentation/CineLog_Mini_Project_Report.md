# 1. Project Title
**CineLog** - A Full-Stack Movie Tracking and Review Platform (Letterboxd Clone)

---

# 2. Abstract
The rapid growth of the entertainment industry has led to a massive influx of cinematic content, making it increasingly difficult for cinephiles to track, review, and catalogue their movie-watching experiences. **CineLog** is a full-stack web application designed to solve this problem by providing a centralized, streamlined platform for users to browse movies, maintain personalized logs, and share reviews. Built utilizing the highly efficient MERN stack (MongoDB, Express.js, React.js, Node.js), the system offers a seamless, responsive interface inspired by popular platforms like Letterboxd but engineered with a cleaner, minimalistic aesthetic. The application utilizes a robust REST API backend for handling asynchronous data operations, ensuring fast rendering and real-time review updates. CineLog entirely bypasses the friction of complex authentications, allowing users to instantly jump into rating and reviewing movies. By abstracting the complexities of large-scale content management into a straightforward, fast, and user-centric frontend UI, this project demonstrates the practical implementation of single-page application (SPA) architectures, non-relational database modeling, and decoupled client-server communications in modern web development.

---

# 3. Problem Statement
Movie enthusiasts currently face challenges in keeping track of the films they have watched, wish to watch, or want to review in a clutter-free environment. Existing platforms are often bloated with excessive advertisements, overwhelming recommendation algorithms, and complex user flows that detract from the core experience of simply logging and reviewing a movie. There is a marked need for a focused, lightweight, and high-performance application that strictly serves the purpose of movie journaling without the unnecessary overheads.

---

# 4. Project Idea
The core idea behind **CineLog** is to engineer a simplified "Letterboxd Clone" that prioritizes core functionality: listing cinematic content, viewing granular details of a specific movie, and submitting user ratings/reviews. It leverages React.js to provide a fast, dynamic, single-page frontend that interacts seamlessly with a Node.js/Express REST API backend. The system is designed to be deeply modular so that the data flow—from the MongoDB database through the Express controllers to the React components—is transparent and highly optimized. 

---

# 5. Motivation
The motivation for this project stems from the desire to build a practical, real-world full-stack application that encapsulates all major components of modern web engineering. It provides an opportunity to master asynchronous state management in React, design robust RESTful APIs in Express, and architect schema relationships in a NoSQL environment (MongoDB). Furthermore, the intent was to create an aesthetically pleasing layout that relies on professional typography and UI spacing rather than heavy, bloated CSS frameworks or generic templates.

---

# 6. Scope
**What the system CAN do:**
- Display a dynamic feed of available movies retrieved from the database.
- Provide a detailed view for single movies, including synopsis, director, year of release, and background images.
- Allow users to submit real-time text reviews and numerical ratings (1-5 scale) for specific movies.
- Display a chronological timeline of reviews submitted by various users on a movie's detail page.

**What the system CANNOT do (Out of Scope for current version):**
- Complex user authentication and session management (JWT/OAuth).
- Admin panel for managing/uploading new movies from the frontend (movies are seeded to the DB directly).
- Social networking features (following other users, direct messaging).

---

# 7. Literature Survey / Requirement Analysis

## Existing Platforms
1. **Letterboxd:** The industry standard for film logging. It is highly social and feature-rich but can be overwhelming for casual users who just want a quick personal log.
2. **IMDb:** Primarily a massive database rather than a personal logging tool. Heavily ad-supported and cluttered UI.

## Brief Comparison
Unlike IMDb's focus on trivia and cast details, or Letterboxd's heavy social integration, **CineLog** abstracts the product down to the purest minimal requirements: View Movie -> Read Description -> Leave a Rating/Review. 

## Functional Requirements
- The system must fetch and display all movies from the MongoDB collection upon loading the homepage.
- The system must provide a dynamic route (`/movie/:id`) that fetches detailed info and associated reviews.
- The system must provide a form to POST new reviews targeting a specific `movieId`.
- The system must update the UI immediately upon successful submission of a review.

## Non-Functional Requirements
- **Performance:** API requests must resolve in less than 500ms.
- **Usability:** The UI must be fully responsive across desktop, tablet, and mobile breakpoints.
- **Reliability:** The backend must handle errors gracefully without crashing the Node process.

---

# 8. System Requirements

## Hardware Requirements
- **Processor:** Intel Core i3 / AMD Ryzen 3 or higher.
- **RAM:** Minimum 4GB (8GB recommended for development).
- **Storage:** 500MB of free space.

## Software Requirements
- **Frontend Environment:** React.js (via Vite).
- **Backend Environment:** Node.js, Express.js.
- **Database:** MongoDB (Local instance or Atlas cluster).
- **Development Tools:** Visual Studio Code, Git, Google Chrome / Firefox.
- **Package Manager:** NPM or Yarn.

---

# 9. Dataset Design

The database is built on MongoDB, a NoSQL structure, using Mongoose as the Object Data Modeling (ODM) library. The schema is divided into two primary collections with a one-to-many relationship.

**1. Movie Collection (`movies`)**
Stores the core attributes of the films.
- `_id`: ObjectId (Primary Identifier)
- `title`: String (Required)
- `year`: Number (Required)
- `director`: String (Required)
- `posterUrl`: String (Required)
- `description`: String (Required)
- `backdropUrl`: String (Optional)
- `createdAt` / `updatedAt`: Timestamps

**2. Review Collection (`reviews`)**
Stores user ratings and links them to specific movies.
- `_id`: ObjectId (Primary Identifier)
- `movieId`: ObjectId (Foreign Key natively referencing the Movie collection)
- `reviewerName`: String (Required)
- `rating`: Number (1 to 5, Required)
- `text`: String (Required)
- `createdAt` / `updatedAt`: Timestamps

**Relationship:** A basic one-to-many relationship exists where one `Movie` document can have multiple linked `Review` documents tied via the `movieId` property.

---

# 10. System Architecture

## a. Block Diagram Description 
*Note for drawing: Draw this as a 3-Tier Architecture spanning horizontally or vertically.*

1. **Client Tier (Frontend - React.js):** 
   - Box labeled "React UI Interfaces" (Home Page, Movie Pages, Review Forms).
   - Arrows pointing to the middle tier labeled "HTTP GET/POST Requests (Axios/Fetch)".
2. **Application Tier (Backend - Node.js/Express):** 
   - Box labeled "Express Server (Port 5000)".
   - Internal sub-boxes: "REST API Router", "Mongoose Models".
3. **Data Tier (Database - MongoDB):** 
   - Box resembling a database cylinder labeled "MongoDB Engine".
   - Internal sub-boxes: "Movies Collection", "Reviews Collection".

**Step-by-Step Data Flow:**
1. User interacts with the React interface (e.g., clicks a movie).
2. React dispatches an asynchronous GET request to `/api/movies/:id`.
3. The Express router intercepts the request and offloads it to Mongoose.
4. Mongoose queries the MongoDB instance for the Movie document and related Reviews.
5. MongoDB returns BSON data, parsed by Mongoose into JSON.
6. Express responds to React with an HTTP 200 JSON payload.
7. React updates its state hooks and triggers a DOM re-render to display the data.

## b. Architecture Explanation
The architecture relies on strict decoupling. The frontend is a standalone SPA compiled by Vite, completely unaware of the database engine. It communicates solely through predefined REST API endpoints. The backend serves purely as a strict JSON mediator—it does not render HTML (No EJS/Pug templates), it only accepts requests, validates variables, reads/writes to the MongoDB cluster via Mongoose schemas, and spits out JSON.

---

# 11. Module Description

**1. User Interface (UI) Module**
- **Purpose:** Handles the final rendering of data and provides the interactive graphical interface.
- **Inputs:** User clicks, form typing (Review text, Ratings).
- **Outputs:** Visual DOM elements, dynamically updated pages.
- **Functionality:** Provides the layout (Home, Movie Detail). Built using React components (`Home.jsx`, `MovieDetail.jsx`).

**2. API Routing Module**
- **Purpose:** Acts as the traffic controller for all incoming backend requests.
- **Inputs:** HTTP Requests containing methods (GET, POST), URLs, Headers, and Request Bodies.
- **Outputs:** JSON formatted HTTP Responses and Status Codes (200, 201, 404, 500).
- **Functionality:** Defined in `server.js`. Parses endpoints (e.g., `/api/movies`) and maps them to the correct database operation logic.

**3. Data Management Module (Mongoose)**
- **Purpose:** Connects the Node app to MongoDB and enforces data structures.
- **Inputs:** Raw data extracted from HTTP requests.
- **Outputs:** Validated data written to MongoDB / Database exception errors.
- **Functionality:** Ensures all incoming data follows the predefined schema (e.g., ensuring a rating never exceeds 5) before executing `.save()` or `.find()` methods.

---

# 12. Comparative Study

| Feature/Metric | CineLog (Our Project) | Letterboxd | IMDb |
| :--- | :--- | :--- | :--- |
| **Primary Focus** | Minimalist personal logging | Social movie tracking | Massive catalog referencing |
| **User Interface** | Highly simplistic, distraction-free | Feature-dense, somewhat cluttered | Cluttered, ad-heavy |
| **Authentication** | Bypassed for speed | Required (Complex) | Required (Complex) |
| **Data Scope** | Curated catalog | Extensive global catalog | Exhaustive industry database |
| **Architecture** | MERN SPA | Monolithic / Complex Microservices | Cloud-scaled Enterprise |

**Differences and Limitations:** CineLog's limitation is its reliance on pre-seeded database material, preventing random users from adding entirely new films (they can only review existing ones). However, its strength lies in absolute speed, requiring zero load time once the initial SPA resolves.

---

# 13. Working / Workflow

1. **System Initialization:** The Node Server is started, establishing a persistent connection to MongoDB. The React development server spins up and mounts the component tree to the browser DOM.
2. **Catalog Fetch:** The `Home.jsx` component uses `useEffect` to trigger a GET request to `/api/movies`. The server returns an array of movie objects. React maps over this array, rendering standard "Movie Cards".
3. **Detail Navigation:** Clicking a Movie Card utilizes `react-router-dom` to dynamically alter the URL and load `MovieDetail.jsx`.
4. **Targeted Fetch:** Upon loading, the detail component fires `GET /api/movies/:id`, retrieving both the specific film data and its sorted array of associated reviews.
5. **Review Submission:** The user fills the HTML form inside the detail component. Submitting the form fires a `POST /api/movies/:id/reviews`. 
6. **Persistence:** The backend validates the POST body, creates a new Mongoose Review document, and saves it. Upon an HTTP 201 Created response, the frontend natively appends the newly returned review object to its UI state, making the rating instantly visible without needing a manual page reload.

---

# 14. Test Cases

| Test Case ID | Input Action | Expected Output | Actual Output (Status) |
| :--- | :--- | :--- | :--- |
| **TC-01** | User accesses root URL (`/`) | React router resolves Home page, triggering API call; UI renders a grid of fetched movies. | Verified / Passed |
| **TC-02** | Click on a specific movie | Router dynamically shifts to `/movie/:id`; the page renders the correct movie poster, plot, and existing reviews. | Verified / Passed |
| **TC-03** | Submit Review form with empty fields | Frontend HTML5/React validation stops submission; Backend returns Error 500 if bypassed. | Verified / Passed |
| **TC-04** | Submit Review form with valid inputs | API returns `HTTP 201`; React updates state, new review renders immediately at the top of the list. | Verified / Passed |
| **TC-05** | API request to a non-existent movie ID | Backend gracefully catches absence and returns an `HTTP 404 (Movie not found)` JSON error. | Verified / Passed |

---

# 15. Results
The finalized implementation of CineLog effectively meets all project requirements. 
- **System Output:** The application successfully serves movie data and seamlessly writes structured review data into MongoDB.
- **UI Behavior:** The interface operates blazingly fast due to the React Virtual DOM minimizing repaints. Hover effects, layout shifts, and route transitions feel premium and responsive.
- **Responsiveness:** Through careful implementation of CSS Flexbox and Grid, the application scales fluidly. Grid columns naturally condense on mobile devices, ensuring accessibility across viewports.
- **Stability:** Backend controllers effectively handle incorrect payload submissions, ensuring the backend server continues running without crashing.

---

# 16. Conclusion
The development of CineLog successfully demonstrates the end-to-end engineering of a modern Web Application utilizing the MERN stack. It bridges the gap between database schema design, RESTful backend infrastructure, and dynamic, react-driven client interfaces. By paring down standard movie-rating systems to their absolute essentials, the project proves that highly functional, visually striking, and technically robust applications can be built without relying on bloated libraries, paving the way for scalable software engineering architectures.

---

# 17. Future Scope
Enhancements that can be engineered in later versions:
1. **User Authentication:** Implementing JWT (JSON Web Tokens) to securely allow users to register and maintain private, authenticated dashboards.
2. **Watchlists:** Enabling users to bookmark unreleased or unseen metrics into a personalized array.
3. **Admin Dashboard:** Creating a protected portal for platform owners to execute CRUD operations (Create, Update, Delete) on movies directly through a GUI instead of raw database seeding.
4. **External API Integration:** Connecting the backend to the TMDB (The Movie Database) API to dynamically fetch real-time global movie catalogs instead of relying solely on local MongoDB clusters.

---

# 18. References
1. **React.js Official Documentation:** Legacy and current paradigms regarding Hooks and State Management. [react.dev]
2. **Express.js Documentation:** API Routing and Middleware practices. [expressjs.com]
3. **Mongoose Documentation:** Schemas, Models, and queries for MongoDB. [mongoosejs.com]
4. **MDN Web Docs:** For standard HTML5 implementation and semantic practices. [developer.mozilla.org]
5. **Letterboxd:** UI concept layout and aesthetic inspiration.
