import csv
import random

categories = ["Frontend", "Backend", "Database", "DevOps", "Networking", "Security", "Programming", "Cloud", "System Design"]
difficulties = ["EASY", "MEDIUM", "HARD"]

topics = {
    "Frontend": [
        ("React", ["What is Virtual DOM?", "Explain useEffect?", "What are Hooks?", "Redux purpose?", "Context API usage?", "React vs Vue?", "JSX meaning?", "Prop drilling?", "React Lifecycle?", "What is SSR?"]),
        ("CSS", ["Box Model?", "Flexbox usage?", "Grid vs Flex?", "CSS Selectors?", "Specificity?", "Media Queries?", "CSS Variables?", "BEM methodology?", "Position property?", "Z-index?"]),
        ("HTML", ["Semantic HTML?", "DOCTYPE?", "Meta tags?", "Canvas API?", "SVG vs Canvas?", "HTML5 features?", "Web Storage?", "Accessibility?", "SEO basics?", "Forms?"]),
        ("JavaScript", ["Closures?", "Hoisting?", "Event Loop?", "Promises?", "Async/Await?", "ES6 features?", "this keyword?", "Prototypes?", "Map vs Set?", "WeakMap?"])
    ],
    "Backend": [
        ("Node.js", ["Event Driven?", "Libuv?", "Streams?", "Buffer?", "Middleware?", "Express vs Nest?", "Package.json?", "NPM vs Yarn?", "Cluster module?", "Worker threads?"]),
        ("Python", ["GIL?", "Decorators?", "Generators?", "List Comprehension?", "Django vs Flask?", "Python 2 vs 3?", "Lambda functions?", "Pickling?", "Pandas?", "NumPy?"]),
        ("Java", ["JVM?", "Garbage Collection?", "OOP principles?", "Interface vs Abstract?", "Threads?", "Collections?", "Spring Boot?", "Maven?", "Hibernate?", "Exception Handling?"])
    ],
    "Database": [
        ("SQL", ["Joins?", "Normalization?", "ACID properties?", "Indexing?", "Stored Procedures?", "Views?", "Trigger?", "Primary vs Foreign Key?", "Transactions?", "SQL Injection?"]),
        ("NoSQL", ["MongoDB?", "CAP Theorem?", "Cassandra?", "Redis?", "Document Store?", "Key-Value Pair?", "Graph DB?", "Sharding?", "Replication?", "Aggregation?"])
    ],
    "DevOps": [
        ("Docker", ["Container vs VM?", "Dockerfile?", "Docker Compose?", "Images vs Containers?", "Volumes?", "Networking?", "Kubernetes?", "Orchestration?", "CI/CD?", "Jenkins?"])
    ],
    "Networking": [
        ("HTTP", ["GET vs POST?", "Status Codes?", "HTTPS?", "TCP vs UDP?", "DNS?", "OSI Model?", "Cookies vs Session?", "REST API?", "GraphQL?", "WebSockets?"])
    ],
    "Security": [
        ("Web Sec", ["XSS?", "CSRF?", "CORS?", "SQL Injection prevention?", "Hashing vs Encryption?", "JWT?", "OAuth?", "OpenID?", "Salting?", "DDOS?"])
    ]
}

questions_data = []

count = 1

# Generate specific topic questions first
for category, topic_list in topics.items():
    for subtopic, qs in topic_list:
        for q_title in qs:
            if count > 100: break
            
            slug = q_title.lower().replace("?", "").replace(" ", "-")
            content = f"{q_title} Choose the best description or answer."
            tags = f"{subtopic.lower()},{category.lower()}"
            options = "Option A,Option B,Option C,Option D" # Generic options for bulk generation, or I could try to make them specific but that's hard for 100.
            # Let's make options slightly dynamic to look real
            options = f"Related to {subtopic},Related to {category},General Concept,Incorrect Option"
            
            questions_data.append({
                "id": f"q{count}",
                "title": f"What is {q_title}" if "What" not in q_title and "Explain" not in q_title else q_title,
                "content": content,
                "slug": slug,
                "category": category,
                "tags": tags,
                "options": options,
                "difficulty": random.choice(difficulties),
                "views": random.randint(0, 100),
                "upvotes": random.randint(0, 50),
                "downvotes": 0,
                "isPublished": "true",
                "isFeatured": "true" if random.random() > 0.8 else "false",
                "createdAt": "2026-01-21",
                "updatedAt": "2026-01-21"
            })
            count += 1

# Fill the rest with generic questions if needed
while count <= 100:
    q_type = random.choice(list(topics.keys()))
    questions_data.append({
        "id": f"q{count}",
        "title": f"Generic Question {count}",
        "content": "This is a placeholder question content.",
        "slug": f"generic-question-{count}",
        "category": q_type,
        "tags": "generic",
        "options": "A,B,C,D",
        "difficulty": "EASY",
        "views": 0,
        "upvotes": 0,
        "downvotes": 0,
        "isPublished": "true",
        "isFeatured": "false",
        "createdAt": "2026-01-21",
        "updatedAt": "2026-01-21"
    })
    count += 1

header = ["id","title","content","slug","category","tags","options","difficulty","views","upvotes","downvotes","isPublished","isFeatured","createdAt","updatedAt"]

with open("question.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=header, quoting=csv.QUOTE_ALL)
    writer.writeheader()
    writer.writerows(questions_data)

print(f"Successfully generated {len(questions_data)} questions in question.csv")
