# CS-499 Capstone ePortfolio — Anthony DePoalo 

This portfolio presents my comprehensive work for the CS-499 Capstone, including an informal code review and three enhanced artifacts that demonstrate professional competencies in Software Design and Engineering, Algorithms and Data Structures, and Databases. Each enhancement reflects my ability to apply core computer science principles, improve system performance and security, and deliver reliable, well-structured software solutions. Together, these artifacts showcase my technical growth, problem-solving skills, and readiness to contribute effectively in collaborative, professional environments.


## Professional Self-Assessment — Anthony DePoalo 

  My Bachelor of Science in Computer Science program at Southern New Hampshire University has been a continuous journey of applying theory to practice. Through the final capstone project, I have demonstrated the ability to design, implement, and secure complete software systems while developing strong professional and collaborative skills. My goal is to transition into the IT department at my current company, specifically into the team responsible for Distributed Control System (DCS) programming. The capstone’s enhanced artifact, Travlr Getaways, a full-stack web application built with Node.js, Express, MongoDB, and Angular, represents how the knowledge gained across all program areas integrates into real, maintainable, and secure solutions. 

  Throughout the Computer Science program, collaboration has been essential to success. I learned how to share and review code effectively, use version control systems such as Git and GitHub, and document changes clearly so that others can follow my work. In the CS-499 code-review milestone, I simulated a team code-review setting by walking through each file of the Travlr project, explaining structure, logic, and enhancement plans. This process mirrored professional peer review, emphasizing clarity, constructive feedback, and accountability. 

  Collaborative practices also extended beyond coding. In earlier courses such as CS-250 Software Development Lifecycle and CS-320 Software Testing, I worked in simulated multi-developer environments that stressed communication of requirements, sprint scheduling, and defect tracking. These skills transfer directly to an IT or DCS environment, where updates, audits, and troubleshooting depend on accurate documentation and shared understanding. My enhancement documentation, structured commit messages, and clear README files were designed as if teammates would immediately continue the project demonstrating readiness to contribute to a real engineering team.

  Professional communication was developed across both technical and non-technical contexts. Every artifact in the portfolio includes narrative write-ups that translate complex design or algorithmic choices into plain language understandable by decision-makers. My code-review video further demonstrates this by balancing technical accuracy with accessible explanation, similar to communicating with management or clients who need to understand outcomes rather than syntax. 
    
  Through this process I strengthened my ability to adapt tone and content to the audience, writing concise developer documentation for peers, and explanatory narratives and summaries for supervisors. These communication habits ensure alignment between technical staff and business stakeholders, a necessity for managing secure and reliable DCS systems. Communicating design intent and risk in understandable terms is just as valuable as writing the code itself.

  A large portion of my enhancement work centered on improving the performance and scalability of the Travlr Getaways application. In the Algorithms and Data Structures category, I applied efficient structures and algorithmic thinking to reduce processing time and memory overhead. The updated backend implements paginated trip retrieval using limit-and-cursor logic rather than returning all records at once, reducing load time and improving responsiveness. I also added client-side debouncing for searches, cutting unnecessary API calls by waiting for a short pause in typing before sending a request. 
  
  From an algorithmic standpoint, these enhancements changed runtime complexity from approximately O(n) per request to O(k), where k represents the small number of results displayed per page. I learned to analyze trade-offs between readability, complexity, and performance—core skills that apply to optimizing process-control applications. In industrial systems, efficient algorithms prevent lag in monitoring, alarms, and decision-making, which is directly related to the environment I plan to work in.

  The Software Design and Engineering improvements focused on building a more modular, maintainable, and secure architecture. The backend now includes structured request logging with correlation IDs, unified JSON error responses, and strict separation of routes, controllers, and models. The frontend enhancements improved usability with guarded routes, better error messaging, and clear loading states. These practices show how I can take an existing system and elevate its maintainability, readability, and testability—key expectations for any production-grade application. 
  
  Database enhancements in Travlr Getaways demonstrate strong understanding of schema design and data integrity. I refined Mongoose schemas with regex validation, numeric range constraints, and indexing on frequently queried fields. The MongoDB connection now supports retry and graceful shutdown logic, preventing corruption or unexpected disconnects. These updates directly reflect best practices for ensuring reliability in data-driven environments, especially in systems that must maintain accuracy under continuous operation such as DCS servers. 
  
  Together, the engineering and database updates illustrate mastery of the Software Development Lifecycle, from design to deployment. They also reinforce how solid schema design, error handling, and structured logging contribute to better debugging, auditing, and security.

  A consistent security focus guided every enhancement. I integrated Helmet middleware for HTTP header protection, applied strict CORS rules, validated all API inputs with Joi-based logic, and enforced role-based access control (RBAC) to restrict administrative routes. The Angular interceptor and backend middleware work together to block unauthorized access and redirect users to /login when tokens expire. 
  
  In the database layer, connection errors and unexpected shutdowns are safely handled without leaking stack traces. Sensitive information such as JWT secrets and database URIs are managed through environment variables instead of being exposed in code. These changes embody a security-first mindset—anticipating threats before they occur and ensuring systems fail safely. 
  
  For my future role in industrial IT, this mindset will be critial. A single misconfigured connection or unvalidated input could disrupt process-control networks or expose proprietary data. The habits built here—least privilege access, input validation, error sanitization, and consistent logging—translate directly to protecting DCS assets.

  The three enhanced categories: Software Design & Engineering, Algorithms & Data Structures, and Databases all come together to show the progression of my technical development. They are all drawn from the same Travlr Getaways system, showing how a single artifact can evolve across multiple dimensions of improvement. 
  
  - Software Design & Engineering demonstrates system architecture, modularity, and secure user experience.
  - Algorithms & Data Structures showcases efficient pagination, optimized search, and front-to-back data handling.
  - Databases highlights schema integrity, indexing, and stable connection management.

  Viewed together in the portfolio, these categories present a full-stack engineer capable of designing, optimizing, and securing modern web systems. The GitHub Pages ePortfolio connects these artifacts with their narratives, before-and-after code comparisons, and a code-review video that verifies functional correctness. Each enhancement is clearly mapped to one or more of the five course outcomes (CO1 through CO5), showing measurable evidence of readiness for professional practice.

  Completing this program has transformed how I approach software design and problem-solving. I now think systematically balancing performance, security, and maintainability in every decision. Collaboration, communication, and structured documentation have become natural parts of my workflow. 
    
  This ePortfolio serves as both proof of my capabilities and a bridge to my next career step joining the IT team that manages and secures the DCS systems at my company. The enhanced Travlr Getaways project reflects the professional skills I will bring to that environment—analytical problem-solving, reliable engineering, secure data management, and clear communication across diverse technical and business audiences.

## Portfolio Navigation 
- 🎥 [Code Review](code-review/README.md) 
- 🧩 [Software Design & Engineering Enhancement](artifacts/software-design/README.md) 
- ⚙️ [Algorithms & Data Structures Enhancement](artifacts/algorithms/README.md) 
- 🗄️ [Databases Enhancement](artifacts/databases/README.md) 

---
