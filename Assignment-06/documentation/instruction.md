# 1. Project Title
AutoExchange

# 2. Project Type
Online E-commerce and Appointment Booking System for Used Vehicles

# 3. Tech Stack Used
* **Frontend:** React.js, Custom CSS (CSS Variables & Utility Classes)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Additional Tools/Libraries:** 
  * `lucide-react` (Frontend Icons)
  * `cors` (Backend Cross-Origin Resource Sharing)
  * `mongoose` (MongoDB Object Modeling)
  * `dotenv` (Environment Variable Management)

# 4. Features Implemented
* Browse a curated list of premium used vehicles.
* Search functionality to filter cars by make, model, or year.
* Detailed vehicle listing (price, mileage, year, transmission type).
* Inquire/Book Appointment modal for interested buyers to leave their contact details and message.
* Internal dashboard to view all submitted appointments and inquiries.
* Dynamic routing between the main vehicle catalog and active appointments.
* Responsive, modern UI with an elegant aesthetic (using Playfair Display and Inter fonts).

# 5. Folder Structure Overview
* `backend/` - Contains the server logic and database integration.
  * `backend/models/` - Mongoose schemas defining the structure of the data collections.
  * `backend/server.js` - Main entry point configuring Express routes, middleware, and database connection.
  * `backend/seed.js` - Script used to populate the initial database with mock vehicle listings.
* `frontend/` - Contains the React application for the user interface.
  * `frontend/public/` - Publicly available static assets, including vehicle images.
  * `frontend/src/` - Main source folder for the React application.
  * `frontend/src/components/` - Reusable UI components (Navbar, CarCard, InquiryModal, Appointments).
  * `frontend/src/App.jsx` - Main application wrapper managing application state and view switching.
  * `frontend/src/index.css` - Global styling configurations and utility classes.

# 6. API Endpoints
* `GET /api/cars` - Fetches all available cars.
* `GET /api/cars/:id` - Fetches specific car details by ID.
* `POST /api/inquiries` - Submits a new inquiry/appointment booking for a car.
* `GET /api/inquiries` - Retrieves all submitted inquiries along with their associated car details.

# 7. Database Schema
* **Car Collection (`Car.js`)**
  * `make` (String, required)
  * `model` (String, required)
  * `year` (Number, required)
  * `price` (Number, required)
  * `mileage` (Number, required)
  * `description` (String, required)
  * `imageUrl` (String, required)
  * `status` (String, enum: ['Available', 'Sold'], default: 'Available')
* **Inquiry Collection (`Inquiry.js`)**
  * `carId` (ObjectId referencing 'Car', required)
  * `name` (String, required)
  * `email` (String, required)
  * `message` (String, required)
  * `createdAt` (Date, default: Date.now)

# 8. Key Components (Frontend)
* **`App.jsx`**: Manages top-level state (cars list, loading state, active view) and handles the conditional rendering of the main page vs. the appointments list.
* **`Navbar.jsx`**: Provides navigation allowing users to toggle between viewing the catalog ("Buy a Car") and managing submissions ("Appointments").
* **`CarCard.jsx`**: Displays a summary for an individual vehicle, formatting price and mileage nicely, and provides the "I'm Interested" button.
* **`InquiryModal.jsx`**: A popup modal form that captures the user's name, email, and message when they choose to inquire about a specific car.
* **`Appointments.jsx`**: Fetches and renders all inquiries submitted, formatting them into visually distinct ticket cards showing requested cars, dates, user details, and messages.

# 9. Application Workflow
1. The user visits the application and is presented with a showcase hero section and a catalog grid of available used cars (fetched from `GET /api/cars`).
2. The user can type into the search bar to dynamically filter the displayed catalog by make, model, or year.
3. Upon finding a car they like, the user clicks "I'm Interested" on the `CarCard`, prompting the `InquiryModal` to open.
4. The user completes the inquiry form and submits it. A request is sent to `POST /api/inquiries` resulting in a new appointment log and showing an immediate success notification.
5. A user (or administrator) clicks on the "Appointments" navigation link.
6. The application state updates to show the `Appointments` component, which fetches all tickets from `GET /api/inquiries` and displays them chronologically along with the car data.

# 10. Special/Unique Features
* Beautiful modern aesthetic utilizing clean UI design practices.
* Formatted currency and mileage outputs providing professional and clean data readability.
* Instant client-side search filtering that minimizes backend roundtrips.
* Relational aggregation on the backend (using Mongoose `.populate()`) to inject rich car data into simple inquiry models when viewing appointments.

# 11. Limitations
* Lack of formal user authentication (`admin` vs `customer`), meaning the appointments dashboard is publicly accessible.
* The frontend uses a simple state-based view router (`currentView`) rather than a dedicated library like `react-router-dom`, ruling out deep-linking or using the browser's back button.
* Vehicle listings cannot be created or edited from a frontend interface; they rely entirely on the backend `seed.js` script.

# 12. Future Enhancements
* Implement `react-router-dom` for robust client-side routing.
* Integrate a dedicated authentication system (JWT + Passport or NextAuth) to restrict access to the Appointments page.
* Add an Admin Dashboard with the ability to perform full CRUD operations on the 'Cars' collection (add new cars, mark sold, edit pricing).
* Connect a third-party email service (like SendGrid or Resend) to trigger real confirmation emails upon inquiry submissions.
