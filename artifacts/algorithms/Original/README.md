# Category Two: Algorithms and Data Structure — Original (CS-499) 

## Overview 
This folder contains the original version of the Travlr web application code that relates to algorithms and data handling. It shows the system’s initial design for retrieving and displaying trip data before any performance or structural improvements were made.

## Purpose of the Code 
The original version of these files handled all trip retrieval and display logic using straightforward, unoptimized operations. - The backend returned **all trips** in one response without pagination or limits. - The frontend displayed the entire dataset and relied on Angular’s default rendering behavior. - The MongoDB schema had only basic structure and one unique index on the trip `code`. 

This setup was functional and simple, but it became inefficient as data grew. It served as a solid starting point for demonstrating how to apply algorithms and data structure enhancements to improve scalability and responsiveness.

## File Descriptions & Code files

[**travlr/app_api/controllers/trips.js**](./trips.js)
Provided endpoints for listing, creating, updating, and finding trips. Returned all trips in one call with no pagination, sorting, or validation improvements. 

[**travlr/app_api/models/travlr.js**](./travlr.js) —  
Defined the trip schema with basic field requirements and a unique `code`. No validation rules or optimized indexes were included. 

[**travlr/app_admin/src/app/services/trip-data.service.ts**](./trip-data.service.ts)
Handled data requests from the Angular frontend to the backend. Always requested the full list of trips from the API without specifying limits or pages. 

[**travlr/app_admin/src/app/trip-listing/trip-listing.component.ts**](./trip-listing.component.ts)
Displayed the list of trips on the admin side of the application. Loaded all trips at once, which was fine for small data but inefficient for larger datasets. 

## Result 
This version demonstrates clear, working logic but lacks performance control and algorithmic optimization. It establishes a simple baseline that the enhanced version later builds upon through structured pagination, indexing, and efficient data access patterns.
