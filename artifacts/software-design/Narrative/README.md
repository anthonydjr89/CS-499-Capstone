Software Design & Engineering Narrative 

Name: Anthony DePoalo 
Course: CS-499 – Computer Science Capstone 
Instructor: Joseph Martinez 
Date: October 19, 2025

	The artifact for this enhancement is the Travlr Getaways project, a MEAN stack (MongoDB, Express, Angular, Node.js) travel app I first built in CS-465 Full Stack Development. It includes a RESTful API with JWT login, a server-rendered website, and an Angular dashboard used to manage trip data. I picked this project because it’s a full-stack system that shows my ability to build software with clear organization, smooth flow, and secure features. 
I chose this artifact because it highlights solid software design and engineering skills that connect directly to the CS-499 program goals. Improving this project gave me the chance to show what I’ve learned about writing modular code, handling errors the same way throughout the app, keeping user actions secure, and maintaining code that’s easy to update. It also shows how one application can connect the database, logic, and front-end in a way that stays organized and easy to grow. 

For the Software Design and Engineering milestone, I made several updates focused on keeping the code structured, maintainable, and secure. These included:

1. Global Error Handling and Logging 

a.	Added a request ID middleware to generate unique identifiers for every incoming request. 

b.	Standardized API error responses to use a uniform structure: { code, message, requestId }. 

c.	Implemented structured logging to capture request IDs, error codes, and detailed context.

d.	 Files Updated: app.js, app_api/controllers/trips.js 

2.	JWT Middleware and Role Management
   
a.	Completed JWT authentication middleware to validate Bearer tokens, check expiration, and attach the verified user to requests. 

b.	Implemented consistent 401 JSON responses and added placeholders for role-based access control. 

c.	Files Updated: app_api/routes/index.js 

3.	Controller and Model Improvements
   
a.	Added safe field whitelisting for updates and enabled Mongoose’s runValidators option to prevent unsafe database writes. 

b.	Added graceful database shutdown logic to prevent resource leaks. 

c.	Files Updated: app_api/controllers/trips.js, app_api/models/db.js 

4.	Angular Client Enhancements
   
a.	Implemented an Angular route guard (AuthGuard) to protect administrative routes. 

b.	Enhanced the JWT interceptor to automatically redirect users to /login when authentication fails. 

c.	Files Updated: app_admin/src/app/guards/auth.guard.ts, app_admin/src/app/utils/jwt-interceptor.ts

Skills Demonstrated

•	Modularity and Architecture: Organized the project into layers (routes, controllers, models, and middleware) for clarity and maintainability. 

•	Error Handling and Logging: Implemented consistent exception management and traceability with request IDs. 

•	Security and Access Control: Applied JWT authentication and protected client routes, ensuring secure session management. 

•	User Experience and Flow: Improved client-side routing and feedback messages for smoother interactions. 

•	Professional Practices: Enhanced readability and documentation with clear code comments, structured commits, and testing feedback logs.

This milestone helped me understand how to build software that works well and is easy to manage. I learned that keeping error messages consistent and using middleware correctly makes debugging easier and keeps users from getting confused. Adding global error handling made the communication between the client and server more predictable, which also made it easier for Angular to handle responses. 

One of the hardest parts was keeping older API endpoints working while improving the middleware. Adding request IDs to the logs meant updating several parts of the system so that the same ID followed each request from start to finish. Fixing this helped me learn more about how Node.js handles asynchronous tasks and request lifecycles. 

I also had to update both the backend and frontend so they could use the new shared API response format. Doing that showed me how important clear communication is between the backend and frontend in a full-stack project.

This enhancement aligns with the following CS program outcomes: 

•	CO1 – Software Design and Engineering: Demonstrated by reorganizing the project structure for better maintainability, applying design consistency, and implementing reusable components. 

•	CO4 – Innovative Tools and Techniques: Implemented structured logging, JWT authentication middleware, and automated error handling aligned with modern best practices. 

•	CO5 – Security Mindset: Added strong data checks and cleaned up error messages to stop information leaks and block unauthorized access.

Improving the Software Design and Engineering part of the Travlr Getaways project helped me use key design ideas, build a clean structure, and strengthen security in every part of the app. The result is a well-organized and professional project that shows I’m ready to design and manage secure enterprise systems. This milestone showed that I can bring together clear architecture, strong user protection, and professional coding standards in one complete project.
