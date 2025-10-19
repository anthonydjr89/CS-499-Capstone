# **Software Design and Engineering – Original Travlr Application** 

## **Overview** 
This folder contains the original version of the Travlr web application before any updates or improvements were made. It represents the initial implementation of both the backend and frontend structure used to manage trip information for the Travlr system. 

The code demonstrates basic web application design using Node.js, Express, MongoDB, and Angular.


## **Purpose of the Code** 
The Travlr application is designed to allow users and administrators to view and manage trip data such as trip names, start dates, lengths, resorts, and prices. 
- The **backend** handles routing, authentication, and database interaction.
- The **frontend** provides the interface to display and manage trip data.

This version focuses on core functionality and layout without advanced validation, logging, or role-based features.

## **File Summaries** 

### **1. `travlr/app.js`** 
Handles Express setup, middleware, routing, and error handling. It connects all the main routes, applies security headers, and defines how API and view errors are managed. 

### **2. `travlr/app_api/routes/index.js`** 
Defines the API endpoints for authentication and trip management. Includes routes for login, registration, and trip data requests. 

### **3. `travlr/app_api/controllers/trips.js`** 
Controls how trip data is handled in the backend. Contains functions to list, find, create, and update trips by communicating with the MongoDB model. 

### **4. `travlr/app_api/controllers/authentication.js`** 
Manages user registration and login. Uses Passport to authenticate users and generate tokens for secure access. 

### **5. `travlr/app_api/config/passport.js`** 
Sets up the Passport local authentication strategy. Checks usernames and passwords to confirm user identity when logging in. 

### **6. `travlr/app_api/models/db.js`** 
Connects the application to the MongoDB database. Defines how the database connection starts and handles connection events. 

### **7. `travlr/app_api/models/travlr.js`** 
Defines the schema for trip data. Specifies what fields each trip has (code, name, length, resort, start date, etc.) and how they are stored in MongoDB. 

### **8. `travlr/app_admin/src/app/utils/jwt-interceptor.ts`** 
Intercepts outgoing HTTP requests in Angular. Adds the authentication token to requests when a user is logged in to allow secure access to API routes. 

### **9. `travlr/app_admin/src/app/trip-listing/trip-listing.component.ts`** 
Displays the list of available trips. Retrieves trip data from the backend and shows it to the user in the admin interface. 

### **10. `travlr/app_admin/src/app/trip-listing/trip-listing.component.html`** 
The HTML layout for displaying trips. Defines how each trip card appears and provides the “Add Trip” button for logged-in users. 

### **11. `travlr/app_admin/src/app/add-trip/add-trip.component.ts`** 
Manages the “Add Trip” form in the admin interface. Handles user input for new trips and sends the data to the backend for storage. 

### **12. `travlr/app_admin/src/app/services/trip-data.service.ts`** 
Provides data communication between the Angular frontend and the backend API. Handles HTTP requests for trips, login, registration, and updates.

## **Result** 
These original files show the foundation of the Travlr system. They include a functioning backend and frontend connection, demonstrate core web design patterns, and form the base for later software design and engineering improvements.
