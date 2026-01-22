import csv
import random
import datetime

# Setup
question_file = 'question.csv'
answer_file = 'answer.csv'
current_date = datetime.date.today().isoformat()

categories = ["Frontend", "Backend", "Database", "DevOps", "Networking", "Security"]
difficulties = ["EASY", "MEDIUM", "HARD"]

# Data Source: (Category, Subcategory, Question, Correct Answer, [Wrong Answers])
raw_questions = [
    # Frontend - React
    ("Frontend", "React", "What is the Virtual DOM?", "A lightweight copy of the real DOM", ["A database for React", "A browser API", "A direct reference to HTML"]),
    ("Frontend", "React", "What is the purpose of useEffect?", "To handle side effects in components", ["To manage global state", "To create new components", "To style elements"]),
    ("Frontend", "React", "What is a Hook in React?", "A function to use state and other features", ["A class component", "A database connection", "A routing library"]),
    ("Frontend", "React", "What does Redux manage?", "Global application state", ["CSS styles", "Database queries", "Server requests"]),
    ("Frontend", "React", "What is Prop Drilling?", "Passing data through many layers of components", ["Drilling holes in hardware", "A new React installation method", "Optimizing build time"]),
    ("Frontend", "React", "What is JSX?", "A syntax extension for JavaScript", ["A new programming language", "A database query language", "A CSS preprocessor"]),
    ("Frontend", "React", "Difference between State and Props?", "State is internal, Props are external", ["State is immutable, Props are mutable", "Both are same", "Props are for database"]),
    ("Frontend", "React", "What is the Context API used for?", "Avoiding prop drilling", ["Making API calls", "Styling components", "Testing components"]),
    ("Frontend", "React", "What is a Higher-Order Component?", "A function that takes a component and returns a new one", ["A component with high priority", "A component at the top of the tree", "A component for header"]),
    ("Frontend", "React", "What is React Fragment?", "A way to group children without adding extra nodes", ["A broken component", "A part of the URL", "A memory leak"]),
    
    # Frontend - HTML/CSS/JS
    ("Frontend", "HTML", "What does HTML stand for?", "HyperText Markup Language", ["HighText Machine Language", "HyperText Marking Language", "HyperTool Multi Language"]),
    ("Frontend", "HTML", "What is the purpose of the <alt> attribute?", "To provide alternative text for images", ["To change image color", "To link to another page", "To bold text"]),
    ("Frontend", "CSS", "What is the Box Model?", "A box wrapping every HTML element", ["A layout for flexbox", "A 3D modeling tool", "A packaging standard"]),
    ("Frontend", "CSS", "What does 'z-index' control?", "The stack order of elements", ["The zoom level", "The font size", "The horizontal position"]),
    ("Frontend", "CSS", "Difference between Flexbox and Grid?", "Flexbox is 1D, Grid is 2D", ["Flexbox is for text, Grid is for images", "Grid is older", "No difference"]),
    ("Frontend", "JavaScript", "What is a Closure?", "A function remembering its lexical scope", ["A closing tag", "A database connection closer", "A variable type"]),
    ("Frontend", "JavaScript", "What is Hoisting?", "Moving declarations to the top", ["Lifting weights", "Scrolling up", "Hosting a website"]),
    ("Frontend", "JavaScript", "What is the Event Loop?", "Mechanism handling async callbacks", ["A loop that never ends", "A for loop in events", "A click handler"]),
    ("Frontend", "JavaScript", "What is a Promise?", "An object representing eventual completion of async op", ["A guarantee to user", "A function type", "A strict variable"]),
    ("Frontend", "JavaScript", "Difference between '==' and '==='?", "'===' checks value and type", ["'==' is faster", "'===' is for text only", "No difference"]),

    # Backend - Node.js
    ("Backend", "Node.js", "What is Node.js?", "A JavaScript runtime built on Chrome's V8 engine", ["A framework for Java", "A database", "A text editor"]),
    ("Backend", "Node.js", "What is npm?", "Node Package Manager", ["Node Project Maker", "New Program Method", "Node Process Manager"]),
    ("Backend", "Node.js", "What is 'callback hell'?", "Deeply nested callbacks making code hard to read", ["Calling a function back", "A database error", "A server crash"]),
    ("Backend", "Node.js", "What is Middleware in Express?", "Functions executing during the request-response cycle", ["Hardware between server and client", "Database software", "A frontend tool"]),
    ("Backend", "Node.js", "What is libuv?", "Library for async I/O in Node.js", ["A library for UV light", "A video library", "A React component"]),
    ("Backend", "Node.js", "Difference between process.nextTick and setImmediate?", "nextTick runs before IO events, setImmediate after", ["They are same", "setImmediate is faster", "nextTick is for browser"]),
    ("Backend", "Node.js", "What is package.json?", "Manifest file for Node projects", ["A javascript file", "A database file", "A log file"]),
    ("Backend", "Node.js", "What is a Stream?", "Collection of data that might not be available all at once", ["A river", "A video call", "A static file"]),
    ("Backend", "Node.js", "What is the Cluster module?", "Enables multi-core systems usage", ["A grouping of stars", "A database index", "A file zipper"]),
    ("Backend", "Node.js", "What is REPL?", "Read-Eval-Print Loop", ["Read-Edit-Print Loop", "Run-Execute-Process Loop", "Repeat-Every-Program Loop"]),

    # Backend - Python
    ("Backend", "Python", "What is PEP 8?", "Style guide for Python code", ["A Python version", "A database connector", "A web framework"]),
    ("Backend", "Python", "What is a tuple?", "Immutable sequence type", ["A mutable list", "A dictionary", "A function"]),
    ("Backend", "Python", "What is the GIL?", "Global Interpreter Lock", ["Global Interface Layer", "General Index List", "Graphic Image Library"]),
    ("Backend", "Python", "What is a decorator?", "Function that modifies another function", ["A CSS style", "A variable type", "A design pattern for classes only"]),
    ("Backend", "Python", "List vs Tuple?", "Lists are mutable, Tuples are immutable", ["Lists are faster", "Tuples use brackets", "No difference"]),
    ("Backend", "Python", "What is 'self'?", "Reference to the current instance", ["Reference to the class", "Reference to global scope", "A keyword like 'this'"]),
    ("Backend", "Python", "What is Flask?", "A micro web framework", ["A database", "A hardware device", "A Python compiler"]),
    ("Backend", "Python", "What is Pickling?", "Serializing object structure", ["Preserving food", "Compressing files", "Encrypting data"]),
    ("Backend", "Python", "What is lambda?", "Anonymous function", ["A serverless service", "A variable", "A module"]),
    ("Backend", "Python", "What is a generator?", "Function yielding values one by one", ["A power source", "A constructor", "A loop"]),

    # Database
    ("Database", "SQL", "What is a Primary Key?", "Unique identifier for a record", ["The first key", "A password", "A foreign link"]),
    ("Database", "SQL", "What is a Foreign Key?", "Field linking to another table's Primary Key", ["A key from another country", "A backup key", "A secret code"]),
    ("Database", "SQL", "What is Normalization?", "Organizing data to reduce redundancy", ["Making data normal", "Deleting data", "Backing up data"]),
    ("Database", "SQL", "What is SQL Injection?", "Code injection technique to attack data-driven apps", ["Adding SQL to database", "Speeding up SQL", "Installing SQL"]),
    ("Database", "SQL", "What is ACID?", "Atomicity, Consistency, Isolation, Durability", ["Acidic properties", "Access, Control, ID, Data", "A database brand"]),
    ("Database", "SQL", "INNER JOIN returns?", "Records with matching values in both tables", ["All records from left", "All records from right", "All records"]),
    ("Database", "SQL", "What is an Index?", "Data structure to speed up retrieval", ["A book index", "A list of tables", "A primary key"]),
    ("Database", "NoSQL", "What is MongoDB?", "A document-oriented NoSQL database", ["A SQL database", "A programming language", "A fruit"]),
    ("Database", "NoSQL", "What is CAP Theorem?", "Consistency, Availability, Partition Tolerance", ["Capital, Asset, Profit", "Computer, App, Phone", "Create, Add, Put"]),
    ("Database", "NoSQL", "What is Redis?", "In-memory key-value store", ["A red color", "A relational DB", "A web server"]),

    # Networking
    ("Networking", "HTTP", "What is HTTP?", "Protocol for transmitting hypermedia documents", ["HyperText Text Program", "A programming language", "A browser"]),
    ("Networking", "HTTP", "Status code 200 means?", "OK", ["Not Found", "Error", "Redirect"]),
    ("Networking", "HTTP", "Status code 404 means?", "Not Found", ["OK", "Server Error", "Forbidden"]),
    ("Networking", "HTTP", "Status code 500 means?", "Internal Server Error", ["OK", "Not Found", "Unauthorized"]),
    ("Networking", "HTTP", "What is HTTPS?", "Secure version of HTTP", ["HTTP Service", "HTTP Standard", "HTTP Speed"]),
    ("Networking", "HTTP", "GET vs POST?", "GET requests data, POST submits data", ["GET is safer", "POST is faster", "No difference"]),
    ("Networking", "HTTP", "What is a Cookie?", "Small data stored on user's computer", ["A biscuit", "A virus", "A program"]),
    ("Networking", "HTTP", "What is DNS?", "Translates domain names to IP addresses", ["Domain Name Server", "Data Network Service", "Digital Name System"]),
    ("Networking", "HTTP", "What is TCP?", "Transmission Control Protocol", ["Transfer Call Protocol", "Text Control Program", "Total Connection Path"]),
    ("Networking", "HTTP", "What is UDP?", "User Datagram Protocol", ["User Data Path", "Under Data Process", "Union Data Point"]),

    # DevOps
    ("DevOps", "Docker", "What is Docker?", "Platform for developing, shipping, and running applications in containers", ["A shipping company", "A VM manager", "A coding language"]),
    ("DevOps", "Docker", "What is a Container?", "Standard unit of software packaging code and dependencies", ["A box", "A virtual machine", "A folder"]),
    ("DevOps", "Docker", "What is Kubernetes?", "Container orchestration system", ["A Docker alternative", "A Linux version", "A cloud provider"]),
    ("DevOps", "Docker", "What is CI/CD?", "Continuous Integration and Continuous Delivery", ["Code Integration", "Cloud Integration", "Computer Interface"]),
    ("DevOps", "Docker", "What is Jenkins?", "Open source automation server", ["A butler", "A database", "A text editor"]),
    ("DevOps", "Cloud", "What is AWS?", "Amazon Web Services", ["Amazon Web Server", "Apple Web System", "All Web Services"]),
    ("DevOps", "Cloud", "What is IaaS?", "Infrastructure as a Service", ["Internet as a Service", "Info as a Service", "Identity as a Service"]),
    ("DevOps", "Cloud", "What is PaaS?", "Platform as a Service", ["Product as a Service", "Program as a Service", "Protocol as a Service"]),
    ("DevOps", "Cloud", "What is SaaS?", "Software as a Service", ["Storage as a Service", "System as a Service", "Security as a Service"]),
    ("DevOps", "Git", "What is Git?", "Distributed version control system", ["A coding language", "A centralized server", "A GitHub clone"]),

    # Security
    ("Security", "Web", "What is XSS?", "Cross-Site Scripting", ["Extra Secure Socket", "XML Style Sheet", "X-ray Site Scan"]),
    ("Security", "Web", "What is CSRF?", "Cross-Site Request Forgery", ["Customer Service RF", "Code Source RF", "Cloud Server RF"]),
    ("Security", "Web", "What is SQL Injection?", "Inserting malicious SQL into queries", ["Cleaning SQL", "Updating SQL", "Formatting SQL"]),
    ("Security", "Web", "What is hashing?", "Converting data into fixed-size string", ["Encrypting", "Compressing", "Hiding"]),
    ("Security", "Web", "Encryption vs Hashing?", "Encryption is reversible, Hashing is not", ["Hashing is reversible", "Both are same", "Encryption is faster"]),
    ("Security", "Web", "What is JWT?", "JSON Web Token", ["Java Web Token", "JavaScript Web Token", "Just Web Token"]),
    ("Security", "Web", "What is OAuth?", "Open Authorization standard", ["Open Authentication", "Online Auth", "Only Auth"]),
    ("Security", "Web", "What is CORS?", "Cross-Origin Resource Sharing", ["Cross-Origin Request Service", "Core OS Resource System", "Code Origin Recovery System"]),
    ("Security", "Web", "What is DDOS?", "Distributed Denial of Service", ["Direct Denial of Service", "Data Denial of Service", "Domain Denial of Service"]),
    ("Security", "Web", "What is SSL?", "Secure Sockets Layer", ["Secure System Layer", "Simple Socket Layer", "Server Socket Layer"]),
    
    # Extra General
    ("Programming", "General", "What is a Variable?", "Container for storing data values", ["A number", "A function", "A loop"]),
    ("Programming", "General", "What is an Algorithm?", "Step-by-step procedure to solve a problem", ["A math formula", "A log", "A computer"]),
    ("Programming", "General", "What is Recursion?", "Function calling itself", ["A loop", "A curse", "A mistake"]),
    ("Programming", "General", "What is Big O Notation?", "Describes performance or complexity of an algorithm", ["A big number", "A notation for zero", "A variable"]),
    ("Programming", "General", "What is OOP?", "Object-Oriented Programming", ["Only One Program", "Object Over Process", "Order of Operation"]),
    ("Programming", "General", "What is Inheritance?", "Mechanism where one class acquires properties of another", ["Getting money", "Copying code", "Deleting code"]),
    ("Programming", "General", "What is Polymorphism?", "Ability to present same interface for different forms", ["Many shapes", "Changing colors", "Multiple inheritance"]),
    ("Programming", "General", "What is Encapsulation?", "Bundling data and methods that operate on that data", ["Hiding code", "Compressing", "Saving"]),
    ("Programming", "General", "What is Abstraction?", "Hiding complex implementation details", ["Drawing", "Removing code", "Abstract art"]),
    ("Programming", "General", "What is an Interface?", "Contract specifying a set of methods", ["A GUI", "A connection", "A face"]),
    ("Programming", "General", "What is a Compiler?", "Translates source code to machine code", ["Runs code", "Checks errors", "Writes code"]),
    ("Programming", "General", "What is an Interpreter?", "Executes instructions directly", ["Translates languages", "Compiles code", "Optimizes code"]),
    ("Programming", "General", "Stack vs Heap?", "Stack is static mem alloc, Heap is dynamic", ["Stack is big", "Heap is ordered", "No difference"]),
    ("Programming", "General", "What is a Bug?", "Error/flaw in software", ["A virus", "A feature", "An insect"]),
    ("Programming", "General", "What is Debugging?", "Finding and resolving bugs", ["Creating bugs", "Ignoring bugs", "Running code"]),
    ("Programming", "General", "What is IDE?", "Integrated Development Environment", ["Internet Dev Environment", "Internal Dev Engine", "Input Data Entry"]),
    ("Programming", "General", "What is API?", "Application Programming Interface", ["App Program Input", "Applied Protocol Interface", "Auto Process Integration"]),
    ("Programming", "General", "What is JSON?", "JavaScript Object Notation", ["Java Standard Object", "JavaScript Online Notation", "Just Some Object"]),
    ("Programming", "General", "What is XML?", "Extensible Markup Language", ["Extra Markup Language", "Example Markup Language", "X Markup Language"]),
    ("Programming", "General", "What is URI?", "Uniform Resource Identifier", ["URL", "URN", "USB"]),
]

# Ensure we have 100
while len(raw_questions) < 100:
    count = len(raw_questions) + 1
    raw_questions.append(("Programming", "General", f"Generic Question {count}", "Correct Answer", ["Wrong A", "Wrong B", "Wrong C"]))

# Trim if > 100
raw_questions = raw_questions[:100]

questions_data = []
answers_data = []

q_id_counter = 1
a_id_counter = 1

for cat, subcat, q_text, correct, wrongs in raw_questions:
    q_id = f"q{q_id_counter}"
    
    # Create options list
    options_list = [correct] + wrongs
    # Shuffle options
    random.shuffle(options_list)
    
    # Create Question Row
    slug = q_text.lower().replace("?", "").replace(" ", "-")[:50]
    options_str = ",".join(options_list)
    
    questions_data.append({
        "id": q_id,
        "title": q_text,
        "content": f"{q_text} Choose the best answer.",
        "slug": slug,
        "category": cat,
        "tags": f"{subcat.lower()},{cat.lower()}",
        "options": options_str,
        "difficulty": random.choice(difficulties),
        "views": random.randint(0, 100),
        "upvotes": random.randint(0, 50),
        "downvotes": 0,
        "isPublished": "true",
        "isFeatured": "true" if random.random() > 0.8 else "false",
        "createdAt": current_date,
        "updatedAt": current_date
    })
    
    # Create Answer Rows
    for opt in options_list:
        a_id = f"a{a_id_counter}"
        is_correct = "true" if opt == correct else "false"
        
        answers_data.append({
            "id": a_id,
            "text": opt,
            "isCorrect": is_correct,
            "questionId": q_id,
            "createdAt": current_date,
            "updatedAt": current_date
        })
        a_id_counter += 1
        
    q_id_counter += 1

# Write questions.csv
q_header = ["id","title","content","slug","category","tags","options","difficulty","views","upvotes","downvotes","isPublished","isFeatured","createdAt","updatedAt"]
with open(question_file, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=q_header, quoting=csv.QUOTE_ALL)
    writer.writeheader()
    writer.writerows(questions_data)

# Write answers.csv
a_header = ['id', 'text', 'isCorrect', 'questionId', 'createdAt', 'updatedAt']
with open(answer_file, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=a_header) # Minimal quoting for answers usually ok, or consistent
    writer.writeheader()
    writer.writerows(answers_data)

print(f"Generated {len(questions_data)} questions and {len(answers_data)} answers.")
