from docx import Document
from docx.shared import Pt, Inches, Cm, RGBColor
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.section import WD_ORIENT
from docx.oxml.ns import qn
import os
doc = Document()
# ============================================================
# DEFAULT STYLE SETUP
# ============================================================
style = doc.styles['Normal']
font = style.font
font.name = 'Times New Roman'
font.size = Pt(12)
# Set page margins
for section in doc.sections:
    section.top_margin = Cm(2.54)
    section.bottom_margin = Cm(2.54)
    section.left_margin = Cm(2.54)
    section.right_margin = Cm(2.54)
def add_heading_bold(text, size=14, alignment=WD_PARAGRAPH_ALIGNMENT.CENTER, space_after=6):
    p = doc.add_paragraph()
    p.alignment = alignment
    p.space_after = Pt(space_after)
    run = p.add_run(text)
    run.bold = True
    run.font.name = 'Times New Roman'
    run.font.size = Pt(size)
    return p
def add_normal(text, size=12, alignment=WD_PARAGRAPH_ALIGNMENT.JUSTIFY, bold=False, space_after=6):
    p = doc.add_paragraph()
    p.alignment = alignment
    p.space_after = Pt(space_after)
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(size)
    run.bold = bold
    return p
def add_bullet(text, size=12):
    p = doc.add_paragraph(style='List Bullet')
    p.space_after = Pt(2)
    for run in p.runs:
        run.font.name = 'Times New Roman'
        run.font.size = Pt(size)
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(size)
    return p
def add_code_block(lines):
    for line in lines:
        p = doc.add_paragraph()
        p.space_after = Pt(0)
        p.space_before = Pt(0)
        run = p.add_run(line)
        run.font.name = 'Courier New'
        run.font.size = Pt(9)
def make_table(headers, rows):
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = 'Table Grid'
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    # Header row
    for i, header in enumerate(headers):
        cell = table.rows[0].cells[i]
        cell.text = ''
        p = cell.paragraphs[0]
        run = p.add_run(header)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(11)
    # Data rows
    for ri, row in enumerate(rows):
        for ci, val in enumerate(row):
            cell = table.rows[ri + 1].cells[ci]
            cell.text = ''
            p = cell.paragraphs[0]
            run = p.add_run(str(val))
            run.font.name = 'Times New Roman'
            run.font.size = Pt(11)
    doc.add_paragraph()  # spacer
    return table
# ============================================================
# PAGE 1: TITLE PAGE
# ============================================================
doc.add_paragraph()  # spacer
add_heading_bold('A PRELIMINARY MINI PROJECT REPORT ON', 12)
add_heading_bold('"BookBridge — A Second-Hand Textbook Marketplace"', 14)
doc.add_paragraph()  # spacer
add_heading_bold('SUBMITTED TOWARDS THE PARTIAL FULFILLMENT OF THE REQUIREMENTS OF BACHELOR OF TECHNOLOGY (Third Year B. Tech.)', 12)
add_heading_bold('Academic Year: 2025-26', 12)
doc.add_paragraph()
add_heading_bold('By:', 12)
add_heading_bold('Harshal Pharande - 123B1B055', 12)
doc.add_paragraph()
add_heading_bold('Under The Guidance of', 12)
add_heading_bold('Prof. Shailesh B. Galande', 12)
doc.add_paragraph()
doc.add_paragraph()
add_heading_bold('DEPARTMENT OF COMPUTER ENGINEERING,', 12)
add_heading_bold('PIMPRI CHINCHWAD COLLEGE OF ENGINEERING', 12)
add_heading_bold('SECTOR 26, NIGDI, PRADHIKARAN', 12)
doc.add_page_break()
# ============================================================
# PAGE 2: CERTIFICATE
# ============================================================
add_heading_bold('PIMPRI CHINCHWAD COLLEGE OF ENGINEERING', 12)
add_normal('DEPARTMENT OF COMPUTER ENGINEERING,', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER)
doc.add_paragraph()
add_heading_bold('CERTIFICATE', 14)
doc.add_paragraph()
add_normal('This is to certify that, the mini project entitled', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER)
add_heading_bold('"BookBridge — A Second-Hand Textbook Marketplace"', 14)
add_normal('is successfully carried out as a mini project for Full Stack Development Laboratory and successfully submitted by following students of "PCET\'s Pimpri Chinchwad College of Engineering, Nigdi, Pune-44".', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER, bold=True)
doc.add_paragraph()
add_heading_bold('Under the guidance of', 14)
add_heading_bold('Prof. Shailesh B. Galande', 14)
doc.add_paragraph()
add_normal('In the partial fulfillment of the requirements for the Third Year B. Tech. (Computer Engineering)', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER)
doc.add_paragraph()
add_heading_bold('Harshal Pharande - 123B1B055', 14)
doc.add_paragraph()
doc.add_paragraph()
add_heading_bold('Prof. Shailesh B. Galande', 14)
add_heading_bold('Project Guide', 14)
doc.add_page_break()
# ============================================================
# ABSTRACT
# ============================================================
add_heading_bold('Abstract', 14)
doc.add_paragraph()
add_normal('BookBridge is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) designed to create a second-hand textbook marketplace for college students. The platform addresses a common challenge faced by students — the difficulty in finding affordable textbooks and the lack of a centralized system to buy and sell used books within a college campus.')
add_normal('Students can register on the platform, list their used textbooks for sale with details such as title, author, price, condition, subject, and book cover image, and browse listings posted by other students. The system features a powerful search and filter mechanism that allows users to find books by title, author, subject, and condition, with server-side pagination for efficient data retrieval.')
add_normal('The backend is developed using Express.js with RESTful APIs, while MongoDB with Mongoose is used for efficient data storage and retrieval. Authentication is handled securely using JSON Web Tokens (JWT) with bcryptjs for password hashing, ensuring protected access to user data. The frontend is built using React.js with modern UI practices including a dark-themed design system with glassmorphism effects, responsive layouts, and micro-animations.')
add_normal('Key features include user authentication (register/login), book listing CRUD operations, image upload using Multer with file type and size validation, ownership-based access control, mark-as-sold functionality, and contact information privacy (visible only to authenticated users). The application also includes a frontend-only wishlist feature for users to bookmark books of interest.')
add_normal('The application delivers a complete workflow: Register → Login → Browse Books → View Details → Contact Seller → Sell Books → Manage Listings, making it a comprehensive and practical solution for campus textbook trading.')
add_normal('Keywords: Textbook Marketplace, MERN Stack, MongoDB, Express.js, React.js, Node.js, JWT Authentication, Multer, RESTful API, CRUD Operations, Second-Hand Books')
doc.add_page_break()
# ============================================================
# INDEX (Table of Contents)
# ============================================================
add_heading_bold('Index', 14)
doc.add_paragraph()
make_table(
    ['Chapter', 'Contents', 'Page No.'],
    [
        ['1', 'Introduction', '6'],
        ['', 'a. Problem Statement', '6'],
        ['', 'b. Project Idea', '6'],
        ['', 'c. Motivation', '7'],
        ['', 'd. Scope', '7'],
        ['', 'e. Literature Survey / Requirement Analysis', '8'],
        ['2', 'Project Design', '10'],
        ['', 'a. H/W, S/W, Resources, Requirements', '10'],
        ['', 'b. Dataset Design', '12'],
        ['', 'c. Hours Estimation', '13'],
        ['3', 'Module Description', '14'],
        ['', 'a. Block Diagram with Explanation', '14'],
        ['', 'b. Comparative Study', '18'],
        ['4', 'Results & Discussion', '19'],
        ['', 'a. Source Code (Key Snippets)', '19'],
        ['', 'b. Screenshots including GUI', '24'],
        ['', 'c. Test Cases', '27'],
        ['5', 'Conclusion', '29'],
        ['', 'References', '30'],
        ['6', 'Annexure', '31'],
        ['', 'SDG Mapping', '31'],
    ]
)
doc.add_page_break()
# ============================================================
# LIST OF FIGURES
# ============================================================
add_heading_bold('List of Figures', 14)
doc.add_paragraph()
make_table(
    ['Figure No.', 'Figure Name', 'Page No.'],
    [
        ['Figure 1', 'System Architecture of BookBridge', '14'],
        ['Figure 2', 'User Registration & Login Flow', '15'],
        ['Figure 3', 'Book Listing & Browse Flow', '16'],
        ['Figure 4', 'Book Detail & Contact Flow', '17'],
    ]
)
# ============================================================
# LIST OF TABLES
# ============================================================
add_heading_bold('List of Tables', 14)
doc.add_paragraph()
make_table(
    ['Table No.', 'Table Name', 'Page No.'],
    [
        ['Table 1', 'Literature Survey', '8'],
        ['Table 2', 'Hardware Requirements', '10'],
        ['Table 3', 'Software Requirements', '11'],
        ['Table 4', 'User Collection Schema', '12'],
        ['Table 5', 'Book Collection Schema', '12'],
        ['Table 6', 'Hours Estimation', '13'],
        ['Table 7', 'Comparative Study', '18'],
        ['Table 8', 'Test Cases', '27'],
    ]
)
doc.add_page_break()
# ============================================================
# CHAPTER 1: INTRODUCTION
# ============================================================
add_heading_bold('Chapter 1: Introduction', 14, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('This project is a full-stack web application developed as part of the Full Stack Development Laboratory (FSDL), designed to facilitate the buying and selling of second-hand textbooks among college students. Built with a Node.js and Express backend using MongoDB for data storage, and a React frontend for an intuitive user interface, the platform allows students to list textbooks they no longer need and discover affordable books from fellow students.')
doc.add_paragraph()
# a) Problem Statement
add_heading_bold('a) Problem Statement', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('College students spend a significant amount of money on textbooks every semester. Once the semester ends, these books often gather dust on shelves or are discarded, despite being in good condition. On the other hand, incoming students face the same expense purchasing new textbooks when used copies could serve them equally well at a fraction of the cost.')
add_normal('Currently, there is no centralized platform within college campuses that connects sellers (outgoing students) with buyers (incoming students) for textbook exchange. Students rely on informal channels such as WhatsApp groups, word of mouth, or notice boards, which are inefficient, unorganized, and difficult to search through. This leads to books going unsold, money being wasted, and a lack of sustainability in textbook usage.')
add_normal('There is a need for a dedicated, searchable, and user-friendly platform that streamlines the process of listing, discovering, and purchasing second-hand textbooks within a college community.')
doc.add_paragraph()
# b) Project Idea
add_heading_bold('b) Project Idea', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('BookBridge is a web-based marketplace where:')
add_bullet('Students can register and create accounts to access the platform.')
add_bullet('Sellers can list their used textbooks with details like title, author, price, condition, subject, and book cover image.')
add_bullet('Buyers can browse, search by title/author, and filter books by subject and condition.')
add_bullet('Book detail pages show full information including seller contact (visible only to logged-in users).')
add_bullet('Sellers can manage their listings — edit details, mark books as sold, or delete listings.')
add_bullet('The platform filters out sold books from the browse page to keep listings relevant.')
doc.add_paragraph()
# c) Motivation
add_heading_bold('c) Motivation', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('The motivation behind BookBridge comes from observing the financial burden students face when purchasing new textbooks every semester, and the environmental waste generated when used books are discarded. Many students sell their textbooks through informal and unorganized channels, missing potential buyers. Similarly, students looking for affordable books struggle to find them.')
add_normal('By building a centralized platform specifically designed for college communities, BookBridge aims to reduce textbook costs, promote reuse and sustainability, and provide a practical learning project that covers full-stack web development using the MERN stack.')
doc.add_paragraph()
# d) Scope
add_heading_bold('d) Scope', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('The scope of this project includes:')
add_bullet('User authentication and authorization using JWT and bcryptjs.')
add_bullet('Book listing management with full CRUD operations (Create, Read, Update, Delete).')
add_bullet('Image upload for book covers using Multer with file type (JPG/PNG) and size (2MB max) validation.')
add_bullet('Search functionality by title and author with regex-based matching.')
add_bullet('Filter mechanism by subject (Engineering, Science, Commerce, Arts) and condition (Like New, Good, Fair).')
add_bullet('Server-side pagination with 12 books per page.')
add_bullet('Ownership-based access control — only the seller can edit, delete, or mark their listing as sold.')
add_bullet('Seller contact information privacy — contact details visible only to authenticated users.')
add_bullet('Responsive dark-themed frontend with modern UI design patterns.')
add_normal('Out of scope for this version: payment integration, real-time chat between buyer and seller, mobile app deployment, and admin panel.')
doc.add_page_break()
# e) Literature Survey
add_heading_bold('e) Literature Survey / Requirement Analysis', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('A review of existing platforms and research helped define the requirements:')
doc.add_paragraph()
add_normal('Table 1: Literature Survey', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER)
make_table(
    ['Platform / Paper', 'Relevance', 'Gap Identified'],
    [
        ['OLX / Quikr', 'General second-hand marketplace for all categories', 'Not specific to college textbooks; no subject/condition filtering; no campus-level trust'],
        ['College WhatsApp Groups', 'Informal channel for book selling among students', 'No search, no organization, messages get buried; no image support'],
        ['Amazon Used Books', 'Large marketplace with used textbook listings', 'Not campus-specific; shipping costs; no direct seller contact'],
        ['BookScouter / Chegg', 'Platforms for textbook buyback and rental', 'Focused on US market; paid services; not peer-to-peer within campus'],
        ['Research: "E-Commerce Platforms for Education" (IEEE)', 'Discusses web-based systems for educational resource sharing', 'Focuses on digital resources; no physical textbook marketplace implementation'],
    ]
)
doc.add_paragraph()
add_heading_bold('Functional Requirements:', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_bullet('Users shall be able to register, login, and maintain authenticated sessions using JWT.')
add_bullet('Sellers shall be able to create book listings with title, author, price, condition, subject, year, contact, description, and cover image.')
add_bullet('The system shall display all available books in a searchable, filterable, paginated grid.')
add_bullet('Users shall be able to view detailed information about any book, including seller contact (if authenticated).')
add_bullet('Sellers shall be able to edit, delete, and mark their own listings as sold.')
add_bullet('The system shall validate file uploads (type and size) and form inputs on both client and server.')
add_bullet('Sold books shall be automatically filtered out from the browse page.')
add_bullet('Users shall be able to add books to a wishlist (frontend-only state).')
doc.add_paragraph()
add_heading_bold('Non-Functional Requirements:', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_bullet('The system shall use JWT tokens for authentication with secure session handling.')
add_bullet('Passwords shall be encrypted using bcryptjs with appropriate salt rounds (10).')
add_bullet('The application shall be responsive and accessible on both desktop and mobile devices.')
add_bullet('The system shall ensure data privacy — contact info hidden from unauthenticated users.')
add_bullet('API responses shall follow RESTful conventions with proper HTTP status codes.')
add_bullet('The frontend shall handle loading states, error states, and empty states gracefully.')
add_bullet('The system shall handle concurrent users without performance degradation.')
doc.add_page_break()
# ============================================================
# CHAPTER 2: PROJECT DESIGN
# ============================================================
add_heading_bold('Chapter 2: Project Design', 14, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
# a) Hardware, Software and Resources
add_heading_bold('a) Hardware, Software and Resources', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('Table 2: Hardware Requirements', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER)
make_table(
    ['Component', 'Minimum Requirement', 'Recommended'],
    [
        ['Processor', 'Intel Core i3 or equivalent', 'Intel Core i5 / Ryzen 5 or better'],
        ['RAM', '4 GB', '8 GB or more'],
        ['Storage', '20 GB free space', '50 GB SSD'],
        ['Network', 'Basic internet connection', 'Broadband (10 Mbps+)'],
        ['Display', '1280×720 resolution', '1920×1080 (Full HD)'],
        ['Operating System', 'Windows 10 / Ubuntu 20.04 / macOS 12', 'Windows 11 / Ubuntu 22.04 / macOS 14'],
    ]
)
add_normal('Table 3: Software Requirements', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER)
make_table(
    ['Software / Tool', 'Version Used', 'Purpose'],
    [
        ['Node.js', 'v18.x LTS', 'Backend JavaScript runtime'],
        ['Express.js', 'v4.18.x', 'Web framework for REST API'],
        ['MongoDB', 'v6.x / Atlas', 'NoSQL database for data persistence'],
        ['Mongoose', 'v8.0.x', 'Object Data Modelling (ODM) for MongoDB'],
        ['React.js', 'v19.1.x', 'Frontend UI library'],
        ['React Router DOM', 'v7.x', 'Client-side routing'],
        ['Vite', 'v6.4.x', 'Frontend build tool and dev server'],
        ['Axios', 'v1.15.x', 'HTTP client for API calls from React'],
        ['Multer', 'v1.4.x', 'File upload middleware for Express'],
        ['bcryptjs', 'v2.4.x', 'Password hashing'],
        ['jsonwebtoken', 'v9.0.x', 'JWT creation and verification'],
        ['Visual Studio Code', 'Latest', 'Code editor / IDE'],
        ['Postman', 'Latest', 'API testing'],
        ['Git & GitHub', 'Latest', 'Version control'],
        ['npm', 'v9.x+', 'Package manager'],
    ]
)
add_heading_bold('Detailed Explanation of Key Technologies:', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('MongoDB: A document-oriented NoSQL database. All data in BookBridge (users, book listings) is stored as JSON-like BSON documents. MongoDB\'s flexible schema is ideal for storing dynamic book attributes with optional fields like description, year, and image path.', bold=True)
add_normal('Express.js: A minimal Node.js web framework used to define REST API routes, apply middleware (CORS, body parsing, JWT authentication, Multer for file uploads), and handle request-response cycles.', bold=True)
add_normal('React.js: The frontend is built entirely with React functional components using hooks (useState, useEffect, useContext). Context API is used for global authentication state management. React Router DOM handles client-side navigation.', bold=True)
add_normal('Node.js: Serves as the backend runtime, enabling JavaScript execution on the server. It hosts the Express server and handles all API requests.', bold=True)
add_normal('Multer: A middleware for handling multipart/form-data, primarily used for uploading book cover images. Configured with disk storage, 2MB file size limit, and JPG/PNG file type validation.', bold=True)
add_normal('JWT (JSON Web Tokens): Tokens are issued on login/register and stored in localStorage. Each API request includes the token in the Authorization header (Bearer scheme). Protected routes verify the token using custom middleware.', bold=True)
add_normal('bcryptjs: Before storing a password, it is hashed with bcrypt using 10 salt rounds. On login, the entered password is compared with the hash using bcrypt.compare().', bold=True)
doc.add_page_break()
# b) Dataset Design
add_heading_bold('b) Dataset Design', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('Table 4: User Collection Schema', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER)
make_table(
    ['Field', 'Type', 'Description'],
    [
        ['_id', 'ObjectId', 'Auto-generated unique identifier'],
        ['name', 'String (required)', 'Full name of the user'],
        ['email', 'String (unique, required)', 'Login email address'],
        ['password', 'String (hashed)', 'bcrypt-hashed password'],
        ['createdAt / updatedAt', 'Date (auto)', 'Mongoose timestamps'],
    ]
)
add_normal('Table 5: Book Collection Schema', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER)
make_table(
    ['Field', 'Type', 'Description'],
    [
        ['_id', 'ObjectId', 'Auto-generated unique identifier'],
        ['title', 'String (required)', 'Title of the textbook'],
        ['author', 'String (required)', 'Author of the textbook'],
        ['price', 'Number (required)', 'Selling price in INR (₹)'],
        ['condition', 'String (enum: Like new, Good, Fair)', 'Physical condition of the book'],
        ['subject', 'String (required)', 'Subject category (Engineering, Science, Commerce, Arts)'],
        ['year', 'String', 'Year or semester (optional)'],
        ['contact', 'String (required)', 'Seller contact (WhatsApp/email)'],
        ['description', 'String', 'Additional details about the book'],
        ['image', 'String (default: "")', 'Path to uploaded cover image'],
        ['status', 'String (enum: available, sold)', 'Listing availability status'],
        ['seller', 'ObjectId (ref: User)', 'Reference to the seller User document'],
        ['createdAt / updatedAt', 'Date (auto)', 'Mongoose timestamps'],
    ]
)
doc.add_page_break()
# c) Hours Estimation
add_heading_bold('c) Hours Estimation', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('Table 6: Hours Estimation', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER)
make_table(
    ['Task / Module', 'Estimated Hours', 'Team Member'],
    [
        ['Project Planning & Requirement Analysis', '1 hour', 'Harshal'],
        ['Database Design (Schemas)', '1 hour', 'Harshal'],
        ['Backend: Auth (Register/Login/JWT)', '2 hours', 'Harshal'],
        ['Backend: Book CRUD API', '3 hours', 'Harshal'],
        ['Backend: Image Upload (Multer)', '1 hour', 'Harshal'],
        ['Backend: Search, Filter & Pagination', '2 hours', 'Harshal'],
        ['Frontend: Auth Pages (Login/Register)', '2 hours', 'Harshal'],
        ['Frontend: Home Page & Book Grid', '2 hours', 'Harshal'],
        ['Frontend: Book Detail Page', '2 hours', 'Harshal'],
        ['Frontend: Sell Book Form', '2 hours', 'Harshal'],
        ['Frontend: My Listings Management', '2 hours', 'Harshal'],
        ['Frontend: Navbar & Routing', '1 hour', 'Harshal'],
        ['CSS Design System & Responsiveness', '3 hours', 'Harshal'],
        ['API Integration & Testing', '2 hours', 'Harshal'],
        ['Bug Fixing & Review', '2 hours', 'Harshal'],
        ['Report Writing & Documentation', '2 hours', 'Harshal'],
        ['Total', '30 hours', ''],
    ]
)
doc.add_page_break()
# ============================================================
# CHAPTER 3: MODULE DESCRIPTION
# ============================================================
add_heading_bold('Chapter 3: Module Description', 14, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_heading_bold('a) Block Diagram with Explanation', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('The BookBridge system is divided into the following architectural layers and modules:')
add_heading_bold('Figure 1 - System Architecture (Description):', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('The system follows a client-server architecture. The React.js frontend communicates with the Node.js + Express.js backend over HTTP REST APIs using Axios. The frontend provides interfaces for user authentication, book browsing with search and filters, book detail viewing, listing creation with image upload, and listing management. The backend processes requests, applies JWT authentication middleware on protected routes, validates inputs, handles file uploads via Multer, and performs CRUD operations on MongoDB using Mongoose ODM.')
add_normal('[System Architecture Diagram — Figure 1]', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER, bold=True)
doc.add_paragraph()
add_normal('[User Registration & Login Flow — Figure 2]', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER, bold=True)
add_normal('This diagram shows the authentication process of the BookBridge system. During registration, user details (name, email, password) are sent from the React frontend to the backend, where the password is hashed using bcrypt with 10 salt rounds and stored in MongoDB. During login, credentials are verified — the email is looked up and the password is compared using bcrypt.compare(). If valid, a JWT token is generated with a 7-day expiry and returned to the client, where it is stored in localStorage for subsequent authenticated API calls.')
doc.add_paragraph()
# Module Descriptions
add_heading_bold('Module 1: Authentication Module', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('This module handles user registration, login, and session management. During registration, user details are sent to the backend where the password is hashed using bcryptjs (10 salt rounds) before being stored in MongoDB. During login, the server verifies credentials by finding the user by email and comparing the entered password with the stored hash. Upon successful authentication, a JWT token is generated with a 7-day expiry period and returned to the client. The token is stored in localStorage and attached to all subsequent API requests via an Axios interceptor. The AuthContext provider manages the global authentication state across the React application.')
doc.add_paragraph()
add_heading_bold('Module 2: Book Listing Module (CRUD)', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('This module provides full CRUD (Create, Read, Update, Delete) operations for book listings. Sellers create listings by submitting a form with title, author, price, condition, subject, year, contact, description, and an optional book cover image. The image is uploaded using Multer middleware with disk storage, 2MB file size limit, and JPG/PNG validation. The listing is stored in MongoDB with a reference to the seller\'s User ID. Sellers can edit their listings (inline edit form), mark them as sold (PATCH request), or delete them (with a confirmation dialog). Ownership is verified server-side — only the original seller can modify their own listings.')
add_normal('[Book Listing & Browse Flow — Figure 3]', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER, bold=True)
doc.add_paragraph()
add_heading_bold('Module 3: Search, Filter & Pagination Module', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('This module enables users to discover books efficiently. The search functionality uses MongoDB regex queries to match book titles and authors (case-insensitive). Users can filter by subject (Engineering, Science, Commerce, Arts) and condition (Like New, Good, Fair). The system implements server-side pagination with 12 books per page, returning total count and page information. Only books with status "available" are shown — sold books are automatically excluded from browse results.')
doc.add_paragraph()
add_heading_bold('Module 4: Book Detail & Contact Module', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('This module displays comprehensive information about a single book listing, including cover image, title, author, price, condition, subject, year, and description. The seller\'s contact information is protected — it is only revealed to authenticated users. Non-authenticated visitors see a "Login to see contact info" button that redirects to the login page. The module also includes a wishlist toggle (frontend-only state) that allows users to bookmark books of interest.')
add_normal('[Book Detail & Contact Flow — Figure 4]', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER, bold=True)
doc.add_paragraph()
add_heading_bold('Module 5: Frontend UI Module', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('The frontend is built with React.js using functional components and hooks. The UI features a premium dark theme with a custom CSS design system including CSS custom properties, glassmorphism effects (backdrop blur on navbar), gradient accents, smooth transitions, and responsive grid layouts. The Navbar dynamically shows different links based on authentication state. BookCard components display book information in a visually appealing card format with hover animations. All pages handle loading, error, and empty states with appropriate UI feedback.')
doc.add_paragraph()
add_heading_bold('Module 6: My Listings Management Module', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('This protected module allows authenticated sellers to manage all their book listings in one place. Each listing is displayed in a card row showing thumbnail, title, price, condition, and status badge (Available/Sold). Actions include: Edit (opens an inline form with all fields pre-populated), Mark as Sold (sends a PATCH request to update the status), and Delete (shows a confirmation dialog before sending a DELETE request). The page displays an empty state message with a link to create a new listing if no books have been posted.')
doc.add_page_break()
# b) Comparative Study
add_heading_bold('b) Comparative Study', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('Table 7: Comparative Study', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER)
make_table(
    ['Feature', 'BookBridge', 'OLX / Quikr', 'WhatsApp Groups', 'Amazon Used Books'],
    [
        ['Target Audience', 'College students (campus-level)', 'General public', 'College group members', 'General public'],
        ['Product Focus', 'Textbooks only', 'All categories', 'Mixed (books + others)', 'All categories'],
        ['Search & Filter', 'By title, author, subject, condition', 'General search', 'No search capability', 'General search'],
        ['Seller Contact Privacy', 'Login required to view contact', 'Mixed', 'Public in group', 'Hidden behind platform'],
        ['Image Upload', 'Yes (2MB, JPG/PNG validated)', 'Yes', 'Manual sharing', 'Yes'],
        ['Listing Management', 'Full CRUD + Mark as Sold', 'Full CRUD', 'No management', 'Managed by Amazon'],
        ['Authentication', 'JWT + bcrypt', 'Phone OTP', 'WhatsApp account', 'Amazon account'],
        ['Technology Stack', 'MERN (open-source)', 'Proprietary', 'WhatsApp ecosystem', 'Proprietary'],
        ['Cost', 'Free (self-hosted)', 'Free + Ads', 'Free', 'Commission-based'],
    ]
)
doc.add_page_break()
# ============================================================
# CHAPTER 4: RESULTS & DISCUSSION
# ============================================================
add_heading_bold('Chapter 4: Results & Discussion', 14, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_heading_bold('a) Source Code (Key Snippets)', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
# Snippet 1
add_heading_bold('1. User Model — Password Hashing (backend/models/User.js)', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('The user schema defines name, email (unique), and password fields with Mongoose timestamps.')
add_code_block([
    "const mongoose = require('mongoose');",
    "",
    "const userSchema = new mongoose.Schema({",
    "  name:     { type: String, required: true },",
    "  email:    { type: String, required: true, unique: true },",
    "  password: { type: String, required: true },",
    "}, { timestamps: true });",
    "",
    "module.exports = mongoose.model('User', userSchema);",
])
doc.add_paragraph()
# Snippet 2
add_heading_bold('2. JWT Authentication Middleware (backend/middleware/authMiddleware.js)', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('JWT tokens are extracted from the Authorization header and verified on every protected route.')
add_code_block([
    "const jwt = require('jsonwebtoken');",
    "",
    "module.exports = (req, res, next) => {",
    "  const token = req.headers.authorization?.split(' ')[1];",
    "  if (!token) return res.status(401).json({ message: 'No token' });",
    "",
    "  try {",
    "    const decoded = jwt.verify(token, process.env.JWT_SECRET);",
    "    req.user = decoded;",
    "    next();",
    "  } catch {",
    "    res.status(401).json({ message: 'Invalid token' });",
    "  }",
    "};",
])
doc.add_paragraph()
# Snippet 3
add_heading_bold('3. Login with JWT Generation (backend/routes/auth.js)', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('Credentials are verified using bcrypt.compare() and a JWT token is issued with 7-day expiry.')
add_code_block([
    "router.post('/login', async (req, res) => {",
    "  const { email, password } = req.body;",
    "  const user = await User.findOne({ email });",
    "  if (!user) return res.status(400).json({ message: 'Invalid' });",
    "",
    "  const match = await bcrypt.compare(password, user.password);",
    "  if (!match) return res.status(400).json({ message: 'Invalid' });",
    "",
    "  const token = jwt.sign(",
    "    { id: user._id, name: user.name },",
    "    process.env.JWT_SECRET,",
    "    { expiresIn: '7d' }",
    "  );",
    "  res.json({ token, user: { id: user._id, name: user.name } });",
    "});",
])
doc.add_paragraph()
# Snippet 4
add_heading_bold('4. Book Listing with Multer Image Upload (backend/routes/books.js)', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('Book listings are created with multipart form data. Multer handles image upload with validation.')
add_code_block([
    "const storage = multer.diskStorage({",
    "  destination: (req, file, cb) => cb(null, 'uploads/'),",
    "  filename: (req, file, cb) =>",
    "    cb(null, Date.now() + path.extname(file.originalname)),",
    "});",
    "const upload = multer({",
    "  storage,",
    "  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max",
    "  fileFilter: (req, file, cb) => {",
    "    const allowed = /jpeg|jpg|png/;",
    "    const ok = allowed.test(path.extname(file.originalname));",
    "    ok ? cb(null, true) : cb(new Error('Only jpg/png'));",
    "  },",
    "});",
    "",
    "router.post('/', auth, upload.single('image'), async (req, res) => {",
    "  const { title, author, price, condition, subject, contact } = req.body;",
    "  const book = await Book.create({",
    "    title, author, price, condition, subject, contact,",
    "    image: req.file ? `/uploads/${req.file.filename}` : '',",
    "    seller: req.user.id,",
    "  });",
    "  res.status(201).json(book);",
    "});",
])
doc.add_paragraph()
# Snippet 5
add_heading_bold('5. Search, Filter & Pagination API (backend/routes/books.js)', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('The GET endpoint supports search by title/author, filter by subject/condition, and server-side pagination.')
add_code_block([
    "router.get('/', async (req, res) => {",
    "  const { search, subject, condition, page = 1, limit = 12 } = req.query;",
    "  const query = { status: 'available' };",
    "",
    "  if (search) query.$or = [",
    "    { title:  { $regex: search, $options: 'i' } },",
    "    { author: { $regex: search, $options: 'i' } },",
    "  ];",
    "  if (subject)   query.subject = subject;",
    "  if (condition) query.condition = condition;",
    "",
    "  const books = await Book.find(query)",
    "    .populate('seller', 'name')",
    "    .sort({ createdAt: -1 })",
    "    .skip((page - 1) * limit)",
    "    .limit(Number(limit));",
    "",
    "  const total = await Book.countDocuments(query);",
    "  res.json({ books, total, pages: Math.ceil(total / limit) });",
    "});",
])
doc.add_paragraph()
# Snippet 6
add_heading_bold('6. Axios API Service with JWT Interceptor (frontend/src/api.js)', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('Automatically attaches JWT token to API requests for secure communication.')
add_code_block([
    "import axios from 'axios';",
    "",
    "const api = axios.create({",
    "  baseURL: 'http://localhost:5000/api'",
    "});",
    "",
    "api.interceptors.request.use(config => {",
    "  const token = localStorage.getItem('token');",
    "  if (token) config.headers.Authorization = `Bearer ${token}`;",
    "  return config;",
    "});",
    "",
    "export default api;",
])
doc.add_paragraph()
# Snippet 7
add_heading_bold('7. Auth Context with React Context API (frontend/src/context/AuthContext.jsx)', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('Global authentication state management using React Context and localStorage persistence.')
add_code_block([
    "import { createContext, useContext, useState } from 'react';",
    "",
    "const AuthContext = createContext();",
    "",
    "export function AuthProvider({ children }) {",
    "  const [user, setUser] = useState(",
    "    JSON.parse(localStorage.getItem('user')) || null",
    "  );",
    "  const [token, setToken] = useState(",
    "    localStorage.getItem('token') || null",
    "  );",
    "",
    "  const login = (userData, tokenData) => {",
    "    setUser(userData); setToken(tokenData);",
    "    localStorage.setItem('user', JSON.stringify(userData));",
    "    localStorage.setItem('token', tokenData);",
    "  };",
    "",
    "  const logout = () => {",
    "    setUser(null); setToken(null);",
    "    localStorage.removeItem('user');",
    "    localStorage.removeItem('token');",
    "  };",
    "",
    "  return (",
    "    <AuthContext.Provider value={{ user, token, login, logout }}>",
    "      {children}",
    "    </AuthContext.Provider>",
    "  );",
    "}",
    "",
    "export const useAuth = () => useContext(AuthContext);",
])
doc.add_page_break()
# b) Screenshots
add_heading_bold('b) Screenshots (GUI Description)', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_heading_bold('Screen 1 - Home Page (Browse Books):', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('A dark-themed landing page featuring a hero section with the tagline "Find Affordable Textbooks From Fellow Students". Below the hero is a search bar with a gradient accent button, followed by dropdown filters for Subject and Condition. Books are displayed in a responsive grid of cards, each showing the book cover image (or placeholder), title, author, subject badge, price in INR, and condition badge. Pagination controls are shown at the bottom.')
add_normal('[Screenshot: Home Page]', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER, bold=True)
doc.add_paragraph()
add_heading_bold('Screen 2 - Login Page:', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('A centered dark card with the heading "Welcome Back" and subtitle "Sign in to your BookBridge account". Contains email and password input fields with a gradient "Sign In" button. A link at the bottom redirects new users to the registration page. Error messages appear as red alert banners above the form when credentials are invalid.')
add_normal('[Screenshot: Login Page]', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER, bold=True)
doc.add_paragraph()
add_heading_bold('Screen 3 - Register Page:', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('Similar to the login page but with an additional "Full Name" field. Includes client-side validation for minimum password length (6 characters). On successful registration, the user is automatically logged in and redirected to the home page.')
add_normal('[Screenshot: Register Page]', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER, bold=True)
doc.add_paragraph()
add_heading_bold('Screen 4 - Book Detail Page:', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('A two-column layout: the left side shows the book cover image in a large container, and the right side displays all book information — title, author, price (in green), condition badge, subject badge, edition/year, and description. A seller information card shows contact details (only to logged-in users). A wishlist toggle button allows bookmarking. A back button navigates to the previous page.')
add_normal('[Screenshot: Book Detail Page]', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER, bold=True)
doc.add_paragraph()
add_heading_bold('Screen 5 - Sell a Book Page:', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('A wide form card with fields arranged in a two-column grid: Title, Author, Price, Condition (dropdown), Subject (dropdown), Year/Semester, Contact, and Description (textarea). A file upload input allows selecting a JPG/PNG book cover image. The gradient "Post Listing" button submits the form. Required fields are marked with a red asterisk.')
add_normal('[Screenshot: Sell a Book Page]', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER, bold=True)
doc.add_paragraph()
add_heading_bold('Screen 6 - My Listings Page:', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('Displays all books listed by the authenticated user in a vertical list of cards. Each card shows a thumbnail, title, price, condition badge, and status badge (Available in green / Sold in red). Action buttons include Edit (opens inline form), Mark as Sold (green button), and Delete (red button with confirmation dialog). An empty state message with a "Sell a Book" link is shown if no listings exist.')
add_normal('[Screenshot: My Listings Page]', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER, bold=True)
doc.add_page_break()
# c) Test Cases
add_heading_bold('c) Test Cases', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('The system was tested using multiple test cases to ensure the correct functioning of all major features of the BookBridge platform.')
doc.add_paragraph()
add_normal('Table 8: Test Cases', alignment=WD_PARAGRAPH_ALIGNMENT.CENTER)
make_table(
    ['Test ID', 'Test Case', 'Input / Action', 'Expected Output', 'Status'],
    [
        ['TC01', 'User Registration', 'Valid name, email, password', 'Account created; JWT returned; redirect to Home', 'Pass'],
        ['TC02', 'Duplicate Email', 'Existing email in register form', 'Error: "Email already registered"', 'Pass'],
        ['TC03', 'User Login', 'Valid credentials', 'JWT token issued; Home page loaded', 'Pass'],
        ['TC04', 'Invalid Login', 'Wrong password', 'Error: "Invalid credentials"', 'Pass'],
        ['TC05', 'Create Book Listing', 'All required fields + image', 'Book created; redirect to My Listings', 'Pass'],
        ['TC06', 'Missing Required Fields', 'Submit form with empty title', 'Error: "Please fill in all required fields"', 'Pass'],
        ['TC07', 'Search Books', 'Type "Engineering" in search', 'Books with matching title/author displayed', 'Pass'],
        ['TC08', 'Filter by Subject', 'Select "Science" from dropdown', 'Only Science books displayed', 'Pass'],
        ['TC09', 'Filter by Condition', 'Select "Like New" from dropdown', 'Only "Like New" condition books shown', 'Pass'],
        ['TC10', 'View Book Detail', 'Click on a book card', 'Full book details page with seller info', 'Pass'],
        ['TC11', 'Contact Privacy (Guest)', 'View book detail without login', '"Login to see contact info" button shown', 'Pass'],
        ['TC12', 'Contact Privacy (Auth)', 'View book detail after login', 'Seller name and contact displayed', 'Pass'],
        ['TC13', 'Edit Listing', 'Click Edit, change price, save', 'Price updated; listing refreshed', 'Pass'],
        ['TC14', 'Mark as Sold', 'Click "Sold" on own listing', 'Status changes to "Sold"; hidden from browse', 'Pass'],
        ['TC15', 'Delete Listing', 'Click Delete, confirm dialog', 'Listing removed from database', 'Pass'],
        ['TC16', 'Protected Route', 'Access /sell without login', 'Redirect to /login page', 'Pass'],
        ['TC17', 'Image Upload Validation', 'Upload 5MB file', 'Error: file size exceeds limit', 'Pass'],
        ['TC18', 'Pagination', 'Add 15 books, browse home', 'Page 1: 12 books, Page 2: 3 books', 'Pass'],
    ]
)
doc.add_page_break()
# ============================================================
# CHAPTER 5: CONCLUSION
# ============================================================
add_heading_bold('Chapter 5: Conclusion', 14, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('The BookBridge system successfully demonstrates the development of a complete, full-stack web application using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The project addresses a real-world problem faced by college students — the lack of an organized platform for buying and selling second-hand textbooks within a campus community.')
add_normal('The system provides a centralized marketplace that allows students to list their used textbooks with detailed information and images, while other students can browse, search by title or author, filter by subject and condition, and contact sellers to make purchases. The platform ensures privacy by restricting contact information visibility to authenticated users only.')
add_normal('From a technical perspective, the project provided hands-on experience in:')
add_bullet('Designing and implementing RESTful APIs using Express.js')
add_bullet('Managing data using MongoDB and Mongoose schemas with document references')
add_bullet('Implementing secure authentication using JWT and bcrypt')
add_bullet('Handling file uploads using Multer with validation')
add_bullet('Building server-side search, filter, and pagination logic')
add_bullet('Creating responsive user interfaces using React.js with Context API')
add_bullet('Implementing ownership-based access control and protected routes')
add_bullet('Handling API communication using Axios with JWT interceptors')
add_normal('Overall, the system serves as a practical and scalable solution that reduces textbook costs for students, promotes reuse and sustainability, and provides a comprehensive learning experience in full-stack web development.')
doc.add_paragraph()
add_heading_bold('Future Scope', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_normal('Mobile Application: Develop a cross-platform mobile app using React Native for Android and iOS to improve accessibility and real-time usage.', bold=True)
add_normal('Real-Time Chat: Integrate Socket.io for real-time messaging between buyers and sellers, eliminating the need to share personal contact information.', bold=True)
add_normal('Payment Integration: Add a payment gateway (Razorpay/Stripe) to enable secure in-app transactions for book purchases.', bold=True)
add_normal('Rating & Review System: Allow buyers to rate sellers and leave reviews, building trust within the marketplace.', bold=True)
add_normal('Recommendation Engine: Use collaborative filtering to suggest relevant books based on a student\'s browsing history and department.', bold=True)
add_normal('Admin Dashboard: Create an admin panel for monitoring listings, managing users, and handling reported content.', bold=True)
add_normal('Multi-Campus Support: Extend the platform to support multiple colleges, enabling cross-campus textbook trading.', bold=True)
add_normal('Push Notifications: Implement push notifications for new listings matching user preferences using Firebase Cloud Messaging.', bold=True)
doc.add_page_break()
# ============================================================
# REFERENCES
# ============================================================
add_heading_bold('References', 14, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
refs = [
    'MongoDB Documentation, "Mongoose — Schemas, Models, and Queries," 2024. Available: https://mongoosejs.com',
    'React Official Documentation, "React Hooks API Reference," 2024. Available: https://react.dev',
    'Node.js Documentation, "Node.js Runtime Environment," 2024. Available: https://nodejs.org',
    'Express.js Documentation, "Express Web Framework," 2024. Available: https://expressjs.com',
    'JSON Web Tokens (JWT), "Introduction to JWT," Available: https://jwt.io/introduction',
    'bcryptjs npm Package Documentation, Available: https://www.npmjs.com/package/bcryptjs',
    'Axios Documentation, "HTTP Client for API Requests," Available: https://axios-http.com/docs/intro',
    'Multer npm Package Documentation, "File Upload Middleware," Available: https://www.npmjs.com/package/multer',
    'Vite Documentation, "Next Generation Frontend Tooling," Available: https://vite.dev',
    'React Router Documentation, "Declarative Routing for React," Available: https://reactrouter.com',
    'A. Taivalsaari and T. Mikkonen, "The Web as an Application Platform: The Saga Continues," IEEE Software, 2021.',
    'R. Fielding, "Architectural Styles and the Design of Network-based Software Architectures," Doctoral Dissertation, University of California, Irvine, 2000.',
]
for i, ref in enumerate(refs, 1):
    add_normal(f'[{i}] {ref}')
doc.add_page_break()
# ============================================================
# CHAPTER 6: ANNEXURE
# ============================================================
add_heading_bold('Chapter 6: Annexure', 14, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
doc.add_paragraph()
# SDG Mapping
add_heading_bold('Sustainability Development Goals Mapping', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
doc.add_paragraph()
make_table(
    ['Sr. No.', 'SDG No.', 'SDG Name', 'How BookBridge Contributes'],
    [
        ['1', 'SDG 4', 'Quality Education', 'Increases access to affordable textbooks, enabling more students to access learning materials regardless of financial constraints.'],
        ['2', 'SDG 8', 'Decent Work & Economic Growth', 'Provides a platform for students to earn by selling used books and reduces educational expenses, contributing to economic efficiency.'],
        ['3', 'SDG 9', 'Industry, Innovation & Infrastructure', 'Introduces a digital platform that automates textbook trading using modern web technologies (MERN stack).'],
        ['4', 'SDG 12', 'Responsible Consumption & Production', 'Promotes reuse of textbooks, reducing paper waste and encouraging sustainable consumption patterns among students.'],
        ['5', 'SDG 10', 'Reduced Inequalities', 'Provides equal access to affordable textbooks for all students, reducing the financial gap in education.'],
    ]
)
doc.add_page_break()
# Annexure — Project Details
add_heading_bold('Department: Computer Engineering                                          A.Y.: 2025-26 Sem: 2', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_heading_bold('Subject: Full Stack Development Laboratory', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_heading_bold('Mini Project Title: BookBridge — A Second-Hand Textbook Marketplace', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
doc.add_paragraph()
make_table(
    ['PRN No.', 'Name', 'Class & Div'],
    [
        ['123B1B055', 'Harshal Pharande', 'TY A'],
    ]
)
doc.add_paragraph()
doc.add_paragraph()
add_heading_bold('Harshal Pharande - 123B1B055                                               Mr. Shailesh B. Galande', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
add_heading_bold('Student Name and Signature                                                         Project Guide Name & Signature', 12, alignment=WD_PARAGRAPH_ALIGNMENT.LEFT)
# ============================================================
# SAVE
# ============================================================
output_path = r"D:\shared ftp\Harshal\Sem 6\FS\miniproject\bookbridge\055_FSDL_BookBridge_Report.docx"
doc.save(output_path)
print(f"Report saved to: {output_path}")