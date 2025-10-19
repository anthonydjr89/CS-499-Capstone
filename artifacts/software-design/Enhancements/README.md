# **Software Design and Engineering – Travlr Application** 

## **Overview** 
This folder contains the enhanced version of the Travlr web application. It builds on the original implementation by improving design quality, reliability, and security across the backend and frontend. Each file in this version demonstrates specific software design and engineering principles through focused enhancements such as structured logging, validation, error handling, and role-based authorization.


## **Purpose of the Code** 
The Travlr system is a full-stack web application that manages travel trip data. 
- The **backend** (Node.js/Express) handles API routes, authentication, database models, and error handling.
- The **frontend** (Angular) provides the admin interface for listing, adding, and managing trips. Together, these files showcase clean software design, modular organization, and secure interaction between client and server.

Core logic for each enhancement was first outlined using pseudocode to evaluate structure and trade-offs before implementation.

## **Summary of Enhancements** 

[**travlr/app.js**](./app.js)
- **Before:** No request tracking or standardized error handling.
- **After:** Added unique request IDs and structured JSON errors (`{ code, message, requestId }`) for API consistency and easier debugging.

[**travlr/app_api/routes/index.js**](./index.js)
- **Before:** Token validation was incomplete and inconsistent.
- **After:** Finished `authenticateJWT` and added role-based access control (`requireRole('admin')`), clearly separating public and protected routes.

[**travlr/app_api/controllers/trips.js**](./trips.js) 
- **Before:** Returned all trips with no pagination or validation.
- **After:** Added pagination (`page`/`limit`), field validation using Joi, and consistent 404 messages for missing trips.

[**travlr/app_api/controllers/authentication.js**](./authentication.js)
- **Before:** Exposed raw database errors and unclear variable names.
- **After:** Sanitized responses, renamed variables for clarity, returned `{ token }` only, and added login rate limiting for security.

[**travlr/app_api/config/passport.js**](./passport.js)
- **Before:** Used generic variable names and allowed unlimited login attempts.
- **After:** Renamed variables for readability and added a simple in-memory back-off system to slow brute-force attacks.

[**travlr/app_api/models/db.js**](./db.js)
- **Before:** No retry or shutdown handling on database disconnects.
- **After:** Added retry/back-off for initial connections and graceful shutdown hooks on exit signals for stability.

[**travlr/app_api/models/travlr.js**](./travlr.js)
- **Before:** Basic schema with minimal validation.
- **After:** Added regex validation for trip codes, numeric range limits for price, and field indexing for performance and sorting.

[**travlr/app_admin/src/app/utils/jwt-interceptor.ts**](./jwt-interceptor.ts)
- **Before:** Token added to all requests, no global 401 handling.
- **After:** Skips token on login/register and automatically logs out and redirects on 401 responses.

[**travlr/app_admin/src/app/trip-listing/trip-listing.component.ts**](./trip-listing.component.ts)
- **Before:** No inline comments or clear error handling.
- **After:** Added loading/error comments and integrated login checks for protected actions.

[**travlr/app_admin/src/app/trip-listing/trip-listing.component.html**](./trip-listing.component.html)
- **Before:** Used unclear variable naming in loops.
- **After:** Improved readability by renaming variables.

[**travlr/app_admin/src/app/add-trip/add-trip.component.ts**](./add-trip.component.ts)
- **Before:** Only basic form validation on the client.
- **After:** Strengthened validation to match server rules and added inline comments for the save flow and error mapping.

[**travlr/app_admin/src/app/services/trip-data.service.ts**](./trip-data.service.ts)
- **Before:** Static data loading with no pagination or typed responses.
- **After:** Added pagination support, typed responses, and clear comments about how authentication APIs are handled.

## **Result** 
These enhancements demonstrate: 
- Secure and maintainable software design practices.
- Clear separation of backend and frontend responsibilities.
- Improved usability, validation, and consistency across the system.

The final version shows a complete, well-structured application ready for testing, future scaling, and professional presentation as part of the **Software Design and Engineering** outcome.
