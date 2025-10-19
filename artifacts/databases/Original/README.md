# Category Three: Databases — Original (CS-499) 

## Overview 
This folder contains the original database-related code for the Travlr web application. It shows how data was stored, retrieved, and managed before any database improvements were made. The original version included basic connection handling, simple schema definitions, and straightforward CRUD operations.

## Purpose of the Code 
These files handled how data was accessed and stored using MongoDB and Mongoose. The original code provided working database features but lacked advanced error handling, retry logic, and structure for reliability and performance.

## File Descriptions & Code files

[**travlr/app.js**](./app.js)
-Connected routes and middleware, loading database models before routes. Error handling existed but lacked standardized formatting for database errors. 

[**travlr/app_api/models/db.js**](./db.js)
-Connected to MongoDB directly using `mongoose.connect()` without retry or graceful shutdown handling. There was no mechanism for reconnecting if the database failed to connect initially. 

[**travlr/app_api/models/travlr.js**](./travlr.js)
-Defined the trip schema for MongoDB. Included basic fields and a unique trip code, but no validation or indexing beyond the default unique constraint. 

[**travlr/app_api/controllers/trips.js**](./trips.js) 
-Handled CRUD operations for trips. Each request interacted directly with the database without pagination, validation, or consistency checks. 

[**travlr/app_api/controllers/authentication.js**](./authentication.js) 
-Registered users and verified login credentials. Saved new users directly into the database but exposed raw errors from Mongoose instead of using standardized responses. 

[**travlr/app_api/config/passport.js**](./passport.js) 
-Used Passport’s local strategy to validate users by checking their email and password. Queried the users collection but did not include any attempt tracking or connection resilience.

## Result 
The original database implementation worked well for small applications but had limited fault tolerance and optimization. It formed a functional starting point for improving connection reliability, validation, and error consistency in the enhanced version.
