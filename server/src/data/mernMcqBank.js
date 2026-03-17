const mernMcqBank = [
  {
    "id": "be-01",
    "text": "What is Node.js?",
    "options": ["A JavaScript framework", "A JavaScript runtime built on Chrome's V8 engine", "A database management system", "A frontend library"],
    "answer": "A JavaScript runtime built on Chrome's V8 engine",
    "topic": "Node Basics",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["runtime", "intro"]
  },
  {
    "id": "be-02",
    "text": "Which module is used to create an HTTP server in Node.js?",
    "options": ["url", "path", "http", "fs"],
    "answer": "http",
    "topic": "Node Basics",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["modules", "server"]
  },
  {
    "id": "be-03",
    "text": "What is the command to initialize a new Node.js project?",
    "options": ["npm start", "npm install", "npm init", "node init"],
    "answer": "npm init",
    "topic": "Node Basics",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["npm", "setup"]
  },
  {
    "id": "be-04",
    "text": "In Express.js, what is 'Middleware'?",
    "options": ["A database", "Functions that have access to the request and response objects", "A CSS preprocessor", "A specialized hardware"],
    "answer": "Functions that have access to the request and response objects",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["middleware", "fundamentals"]
  },
  {
    "id": "be-05",
    "text": "Which HTTP method is typically used to create a new resource in a REST API?",
    "options": ["GET", "POST", "PUT", "DELETE"],
    "answer": "POST",
    "topic": "Express",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["rest", "crud"]
  },
  {
    "id": "be-06",
    "text": "How do you access URL parameters in Express? (e.g., /user/:id)",
    "options": ["req.body", "req.params", "req.query", "req.url"],
    "answer": "req.params",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["routing", "params"]
  },
  {
    "id": "be-07",
    "text": "What kind of database is MongoDB?",
    "options": ["Relational (SQL)", "NoSQL (Document-oriented)", "Graph database", "Flat file"],
    "answer": "NoSQL (Document-oriented)",
    "topic": "MongoDB",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["database", "intro"]
  },
  {
    "id": "be-08",
    "text": "What is the default port for a MongoDB server?",
    "options": ["3000", "8080", "27017", "5432"],
    "answer": "27017",
    "topic": "MongoDB",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["configuration"]
  },
  {
    "id": "be-09",
    "text": "Which Mongoose method is used to define the structure of a document?",
    "options": ["Model", "Schema", "Collection", "Interface"],
    "answer": "Schema",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["mongoose", "modeling"]
  },
  {
    "id": "be-10",
    "text": "What is the purpose of 'module.exports' in Node.js?",
    "options": ["To import a package", "To expose functions or objects for use in other files", "To install dependencies", "To run a script"],
    "answer": "To expose functions or objects for use in other files",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["modules"]
  },
  {
    "id": "be-11",
    "text": "Which Express method is used to serve static files?",
    "options": ["app.serve()", "app.static()", "express.static()", "express.files()"],
    "answer": "express.static()",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["static-files"]
  },
  {
    "id": "be-12",
    "text": "What does the 'next()' function do in Express middleware?",
    "options": ["Ends the request", "Passes control to the next middleware function", "Restarts the server", "Sends a response to the client"],
    "answer": "Passes control to the next middleware function",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["middleware"]
  },
  {
    "id": "be-13",
    "text": "How do you install the 'express' package using npm?",
    "options": ["npm add express", "npm get express", "npm install express", "install express"],
    "answer": "npm install express",
    "topic": "Node Basics",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["npm"]
  },
  {
    "id": "be-14",
    "text": "Which MongoDB operator is used to update a specific field?",
    "options": ["$push", "$set", "$add", "$update"],
    "answer": "$set",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["crud", "operators"]
  },
  {
    "id": "be-15",
    "text": "What is 'callback hell' in Node.js?",
    "options": ["A server crash", "Deeply nested callbacks making code hard to read", "A memory leak", "An infinite loop"],
    "answer": "Deeply nested callbacks making code hard to read",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["async", "callbacks"]
  },
  {
    "id": "be-16",
    "text": "Which module provides utilities for working with file and directory paths?",
    "options": ["fs", "url", "path", "os"],
    "answer": "path",
    "topic": "Node Basics",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["modules"]
  },
  {
    "id": "be-17",
    "text": "In MongoDB, what is the equivalent of a 'Table' in SQL?",
    "options": ["Document", "Field", "Collection", "Database"],
    "answer": "Collection",
    "topic": "MongoDB",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["database", "nosql"]
  },
  {
    "id": "be-18",
    "text": "What does 'REPL' stand for in Node.js?",
    "options": ["Read Eval Print Loop", "Remote Event Processing Layer", "Run Execute Process Link", "Realtime Entry Point List"],
    "answer": "Read Eval Print Loop",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["cli"]
  },
  {
    "id": "be-19",
    "text": "How do you start an Express app to listen on port 5000?",
    "options": ["app.start(5000)", "app.listen(5000)", "app.port(5000)", "express.listen(5000)"],
    "answer": "app.listen(5000)",
    "topic": "Express",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["server", "setup"]
  },
  {
    "id": "be-20",
    "text": "What is the primary function of Mongoose?",
    "options": ["A web server", "An Object Data Modeling (ODM) library for MongoDB", "A CSS framework", "A unit testing tool"],
    "answer": "An Object Data Modeling (ODM) library for MongoDB",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["mongoose", "odm"]
  },
  {
    "id": "be-21",
    "text": "Which environment variable is commonly used to determine if the app is in production?",
    "options": ["APP_ENV", "MODE", "NODE_ENV", "STAGE"],
    "answer": "NODE_ENV",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["env"]
  },
  {
    "id": "be-22",
    "text": "What is the purpose of the 'body-parser' middleware?",
    "options": ["To parse CSS", "To parse incoming request bodies (JSON, URL-encoded)", "To clean the database", "To compress files"],
    "answer": "To parse incoming request bodies (JSON, URL-encoded)",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["middleware", "parsing"]
  },
  {
    "id": "be-23",
    "text": "In MongoDB, what does 'BSON' stand for?",
    "options": ["Binary JSON", "Basic Standard Object Notation", "Boolean Serialized Object Network", "Backend System Object Node"],
    "answer": "Binary JSON",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["data-format"]
  },
  {
    "id": "be-24",
    "text": "Which Node.js core module is used for file system operations?",
    "options": ["file", "fs", "system", "io"],
    "answer": "fs",
    "topic": "Node Basics",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["modules", "filesystem"]
  },
  {
    "id": "be-25",
    "text": "Which status code represents 'Not Found' in an Express response?",
    "options": ["200", "400", "404", "500"],
    "answer": "404",
    "topic": "Express",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["http-codes"]
  },
  {
    "id": "be-26",
    "text": "What is the purpose of 'npm install --save-dev'?",
    "options": ["To save a package as a production dependency", "To save a package only for development and testing", "To install npm itself", "To update a package"],
    "answer": "To save a package only for development and testing",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["npm"]
  },
  {
    "id": "be-27",
    "text": "How do you connect to a MongoDB database using Mongoose?",
    "options": ["mongoose.connect(uri)", "mongoose.open(uri)", "mongoose.start(uri)", "mongoose.db(uri)"],
    "answer": "mongoose.connect(uri)",
    "topic": "MongoDB",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["mongoose", "connection"]
  },
  {
    "id": "be-28",
    "text": "What is 'Non-blocking I/O'?",
    "options": ["The server stops for every request", "The server continues executing other tasks while waiting for I/O operations", "A way to block users", "A security feature"],
    "answer": "The server continues executing other tasks while waiting for I/O operations",
    "topic": "Node Basics",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["architecture", "performance"]
  },
  {
    "id": "be-29",
    "text": "Which Express method allows you to handle all HTTP verbs at a specific route?",
    "options": ["app.all()", "app.use()", "app.any()", "app.route()"],
    "answer": "app.all()",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["routing"]
  },
  {
    "id": "be-30",
    "text": "What is an 'Index' in MongoDB used for?",
    "options": ["To list all documents", "To improve query performance", "To store metadata", "To delete duplicates"],
    "answer": "To improve query performance",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["optimization", "query"]
  },
  {
    "id": "be-31",
    "text": "How do you handle errors in Express using middleware?",
    "options": ["By using a function with 2 arguments", "By using a function with 4 arguments (err, req, res, next)", "By using try/catch in every route", "By restarting the server"],
    "answer": "By using a function with 4 arguments (err, req, res, next)",
    "topic": "Express",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["error-handling"]
  },
  {
    "id": "be-32",
    "text": "What is 'Morgan' in an Express application?",
    "options": ["A database", "An HTTP request logger middleware", "An authentication tool", "A templating engine"],
    "answer": "An HTTP request logger middleware",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["middleware", "logging"]
  },
  {
    "id": "be-33",
    "text": "Which Mongoose method is used to find a single document by its ID?",
    "options": ["find()", "getById()", "findById()", "findOne()"],
    "answer": "findById()",
    "topic": "MongoDB",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["mongoose", "crud"]
  },
  {
    "id": "be-34",
    "text": "What does 'npm audit' do?",
    "options": ["Counts the lines of code", "Checks dependencies for security vulnerabilities", "Tests the application", "Publishes a package"],
    "answer": "Checks dependencies for security vulnerabilities",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["npm", "security"]
  },
  {
    "id": "be-35",
    "text": "What is the purpose of 'res.json()'?",
    "options": ["To parse JSON data", "To send a JSON response", "To convert HTML to JSON", "To store JSON in a file"],
    "answer": "To send a JSON response",
    "topic": "Express",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["response"]
  },
  {
    "id": "be-36",
    "text": "In MongoDB, what is an 'ObjectId'?",
    "options": ["A unique 12-byte identifier for documents", "A string name for the document", "The user's ID", "A random number"],
    "answer": "A unique 12-byte identifier for documents",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["data-types"]
  },
  {
    "id": "be-37",
    "text": "Which event is emitted when a Node.js process is about to exit?",
    "options": ["end", "stop", "exit", "close"],
    "answer": "exit",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["events", "process"]
  },
  {
    "id": "be-38",
    "text": "What is 'CORS'?",
    "options": ["Common Object Request System", "Cross-Origin Resource Sharing", "Centralized Object Routing Service", "Client Optimized Resource Server"],
    "answer": "Cross-Origin Resource Sharing",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["security", "web"]
  },
  {
    "id": "be-39",
    "text": "Which command is used to run a script defined in package.json?",
    "options": ["npm execute <name>", "npm run <name>", "node <name>", "npm start only"],
    "answer": "npm run <name>",
    "topic": "Node Basics",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["npm", "scripts"]
  },
  {
    "id": "be-40",
    "text": "What is the use of 'Mongoose.model()'?",
    "options": ["To define a schema", "To compile a model from a schema", "To connect to the database", "To validate a form"],
    "answer": "To compile a model from a schema",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["mongoose"]
  },
  {
    "id": "be-41",
    "text": "What is the 'Event Loop' in Node.js?",
    "options": ["A loop for graphic rendering", "A single-threaded loop that handles all asynchronous callbacks", "A loop for CSS animations", "A way to repeat API calls"],
    "answer": "A single-threaded loop that handles all asynchronous callbacks",
    "topic": "Node Basics",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["architecture"]
  },
  {
    "id": "be-42",
    "text": "Which status code represents 'Internal Server Error'?",
    "options": ["200", "400", "404", "500"],
    "answer": "500",
    "topic": "Express",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["http-codes"]
  },
  {
    "id": "be-43",
    "text": "What is 'GridFS' in MongoDB used for?",
    "options": ["Storing large files (> 16MB)", "Creating a grid layout", "Clustering servers", "Full-text search"],
    "answer": "Storing large files (> 16MB)",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["advanced", "storage"]
  },
  {
    "id": "be-44",
    "text": "How do you read a file synchronously in Node.js?",
    "options": ["fs.readFile()", "fs.readFileSync()", "fs.read()", "fs.openSync()"],
    "answer": "fs.readFileSync()",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["filesystem"]
  },
  {
    "id": "be-45",
    "text": "What is the purpose of 'helmet' middleware in Express?",
    "options": ["To protect the server from physical damage", "To set various HTTP headers for security", "To compress the response", "To manage user sessions"],
    "answer": "To set various HTTP headers for security",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["security", "middleware"]
  },
  {
    "id": "be-46",
    "text": "In MongoDB, what is the 'Aggregation Framework' used for?",
    "options": ["Schema validation", "Data processing and transformation (grouping, filtering, etc.)", "User authentication", "Database backup"],
    "answer": "Data processing and transformation (grouping, filtering, etc.)",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["aggregation", "advanced"]
  },
  {
    "id": "be-47",
    "text": "Which method is used to remove a package from the project?",
    "options": ["npm delete", "npm uninstall", "npm remove", "Both B and C"],
    "answer": "Both B and C",
    "topic": "Node Basics",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["npm"]
  },
  {
    "id": "be-48",
    "text": "What is 'dotenv' used for?",
    "options": ["To style the console", "To load environment variables from a .env file", "To encrypt the database", "To manage file downloads"],
    "answer": "To load environment variables from a .env file",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["env"]
  },
  {
    "id": "be-49",
    "text": "Which HTTP method is typically used to update an entire resource?",
    "options": ["GET", "POST", "PUT", "PATCH"],
    "answer": "PUT",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["rest", "crud"]
  },
  {
    "id": "be-50",
    "text": "What is the purpose of 'mongoose.Schema.Types.ObjectId'?",
    "options": ["To store a string", "To create a reference (relationship) to another document", "To store a number", "To encrypt a field"],
    "answer": "To create a reference (relationship) to another document",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["mongoose", "relationships"]
  },
  {
    "id": "be-51",
    "text": "What is a 'Stream' in Node.js?",
    "options": ["A way to handle large data by reading/writing it in chunks", "A type of database", "A CSS animation", "A flow control statement"],
    "answer": "A way to handle large data by reading/writing it in chunks",
    "topic": "Node Basics",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["streams", "advanced"]
  },
  {
    "id": "be-52",
    "text": "Which Express method is used to send a specific HTTP status code?",
    "options": ["res.code()", "res.status()", "res.sendCode()", "res.set()"],
    "answer": "res.status()",
    "topic": "Express",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["response"]
  },
  {
    "id": "be-53",
    "text": "What does 'Upsert' mean in MongoDB?",
    "options": ["Deleting an update", "Updating a document or inserting it if it doesn't exist", "Sorting data upwards", "A data error"],
    "answer": "Updating a document or inserting it if it doesn't exist",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["crud", "operators"]
  },
  {
    "id": "be-54",
    "text": "Which module allows you to make HTTP requests from Node.js (common third-party)?",
    "options": ["axios", "fetch (node-fetch)", "request", "All of the above"],
    "answer": "All of the above",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["http", "client"]
  },
  {
    "id": "be-55",
    "text": "What is the purpose of 'app.use()' in Express?",
    "options": ["To define a route", "To mount middleware functions", "To start the server", "To connect to a database"],
    "answer": "To mount middleware functions",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["middleware"]
  },
  {
    "id": "be-56",
    "text": "Which command displays the version of Node installed?",
    "options": ["node version", "node -v", "npm -v", "node --v"],
    "answer": "node -v",
    "topic": "Node Basics",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["cli"]
  },
  {
    "id": "be-57",
    "text": "In Mongoose, what is 'Population'?",
    "options": ["Increasing the number of servers", "Automatically replacing a field with documents from other collections", "Filling a database with fake data", "Counting the number of records"],
    "answer": "Automatically replacing a field with documents from other collections",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["mongoose", "relationships"]
  },
  {
    "id": "be-58",
    "text": "What is 'Passport.js'?",
    "options": ["A travel app", "Authentication middleware for Node.js", "A database system", "A routing engine"],
    "answer": "Authentication middleware for Node.js",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["auth", "middleware"]
  },
  {
    "id": "be-59",
    "text": "What is the difference between process.nextTick() and setImmediate()?",
    "options": ["They are the same", "nextTick() fires before the next event loop phase; setImmediate() fires in the check phase", "setImmediate() is faster", "nextTick() only works in browser"],
    "answer": "nextTick() fires before the next event loop phase; setImmediate() fires in the check phase",
    "topic": "Node Basics",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["event-loop", "advanced"]
  },
  {
    "id": "be-60",
    "text": "How do you define a route that handles a DELETE request in Express?",
    "options": ["app.remove()", "app.delete()", "app.destroy()", "app.clear()"],
    "answer": "app.delete()",
    "topic": "Express",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["routing", "crud"]
  },
  {
    "id": "be-61",
    "text": "What is the 'Buffer' class in Node.js used for?",
    "options": ["To store temporary CSS", "To handle binary data", "To buffer the video stream only", "To speed up the CPU"],
    "answer": "To handle binary data",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["data-types"]
  },
  {
    "id": "be-62",
    "text": "Which MongoDB method returns all documents in a collection?",
    "options": ["findAll()", "find({})", "getAll()", "select()"],
    "answer": "find({})",
    "topic": "MongoDB",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["crud", "query"]
  },
  {
    "id": "be-63",
    "text": "What is the purpose of 'express.Router()'? ",
    "options": ["To create modular, mountable route handlers", "To connect to a router hardware", "To redirect users", "To serve static files"],
    "answer": "To create modular, mountable route handlers",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["routing", "modularity"]
  },
  {
    "id": "be-64",
    "text": "What is the use of 'npm update'?",
    "options": ["To update the npm version", "To update all packages to the latest version based on semver", "To update the OS", "To rewrite package.json"],
    "answer": "To update all packages to the latest version based on semver",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["npm"]
  },
  {
    "id": "be-65",
    "text": "In Express, what does 'res.redirect()' do?",
    "options": ["Refreshes the current page", "Sends the user to a different URL", "Closes the browser", "Stops the server"],
    "answer": "Sends the user to a different URL",
    "topic": "Express",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["response", "navigation"]
  },
  {
    "id": "be-66",
    "text": "What is the purpose of 'mongoose.model.create()'?",
    "options": ["To define a schema", "To shortcut 'new Model()' and 'save()'", "To delete a database", "To create a connection"],
    "answer": "To shortcut 'new Model()' and 'save()'",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["mongoose", "crud"]
  },
  {
    "id": "be-67",
    "text": "Which property of 'req' contains the data sent in a POST request?",
    "options": ["req.params", "req.query", "req.body", "req.data"],
    "answer": "req.body",
    "topic": "Express",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["request"]
  },
  {
    "id": "be-68",
    "text": "What is 'Libuv'?",
    "options": ["A CSS library", "A C library that provides the event loop and asynchronous I/O in Node.js", "A MongoDB driver", "An Express plugin"],
    "answer": "A C library that provides the event loop and asynchronous I/O in Node.js",
    "topic": "Node Basics",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["architecture", "advanced"]
  },
  {
    "id": "be-69",
    "text": "How do you limit the number of results in a MongoDB query?",
    "options": ["limit()", "top()", "first()", "count()"],
    "answer": "limit()",
    "topic": "MongoDB",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["query"]
  },
  {
    "id": "be-70",
    "text": "What does 'npm ci' do?",
    "options": ["Installs dependencies for CI/CD, using package-lock.json strictly", "Creates an image", "Cleans the installer", "Checks integration"],
    "answer": "Installs dependencies for CI/CD, using package-lock.json strictly",
    "topic": "Node Basics",
    "difficulty": "Hard",
    "marks": 2,
    "tags": ["npm", "devops"]
  },
  {
    "id": "be-71",
    "text": "Which middleware is used to handle file uploads in Express?",
    "options": ["body-parser", "multer", "helmet", "cors"],
    "answer": "multer",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["middleware", "files"]
  },
  {
    "id": "be-72",
    "text": "What is a 'Compound Index' in MongoDB?",
    "options": ["An index on multiple fields", "A secret index", "An index that combines two databases", "An index for math"],
    "answer": "An index on multiple fields",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["optimization"]
  },
  {
    "id": "be-73",
    "text": "How do you export multiple functions from a file?",
    "options": ["module.exports = { func1, func2 }", "exports.func1 = ...; exports.func2 = ...", "Both A and B", "Neither A nor B"],
    "answer": "Both A and B",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["modules"]
  },
  {
    "id": "be-74",
    "text": "What is the purpose of 'res.sendFile()'? ",
    "options": ["To send a JSON file", "To transfer a file at the given path", "To download a file to the server", "To delete a file"],
    "answer": "To transfer a file at the given path",
    "topic": "Express",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["response"]
  },
  {
    "id": "be-75",
    "text": "In Mongoose, what are 'Hooks' (Middleware)?",
    "options": ["Functions passed to the front-end", "Functions that run before or after database operations (e.g., pre-save)", "React hooks used in the backend", "API endpoints"],
    "answer": "Functions that run before or after database operations (e.g., pre-save)",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["mongoose", "advanced"]
  },
  {
    "id": "be-76",
    "text": "What does 'NPM' stand for?",
    "options": ["Node Package Manager", "New Process Method", "Network Packet Module", "Node Programming Maker"],
    "answer": "Node Package Manager",
    "topic": "Node Basics",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["npm"]
  },
  {
    "id": "be-77",
    "text": "Which Express method is used to define parameters for a specific route name?",
    "options": ["app.param()", "app.id()", "app.set()", "app.get()"],
    "answer": "app.param()",
    "topic": "Express",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["routing"]
  },
  {
    "id": "be-78",
    "text": "What is the role of 'package-lock.json'?",
    "options": ["To lock the project from editing", "To store the exact version of dependencies installed", "To replace package.json", "To store passwords"],
    "answer": "To store the exact version of dependencies installed",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["npm"]
  },
  {
    "id": "be-79",
    "text": "What is the use of 'mongoose.disconnect()'? ",
    "options": ["To delete the database", "To close the connection to MongoDB", "To restart the server", "To block a user"],
    "answer": "To close the connection to MongoDB",
    "topic": "MongoDB",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["mongoose"]
  },
  {
    "id": "be-80",
    "text": "Which Node.js module is used to encrypt passwords?",
    "options": ["crypto", "bcrypt", "Both are commonly used", "fs"],
    "answer": "Both are commonly used",
    "topic": "Node Basics",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["security", "auth"]
  }
]

module.exports = { mernMcqBank };
