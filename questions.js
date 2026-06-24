// questions.js
const questionsData = [
    { id: 1, section: "HR & Introduction", question: "Tell me about yourself.", answer: `I'm Dipak Narkhede, a Java Backend Developer with 3+ years of experience building production systems. I did my MCA from RTMNU Nagpur in 2023, started my career at Sarvatra Technologies supporting core banking systems for UPI and IMPS, then moved to Encora as a Junior Developer where I worked on a high-traffic job portal handling 10,000+ daily users. Currently I'm at Stark Digital Media Services as a Software Engineer, where my main work is on RTS — a live government services portal for PMRDA, the Pune Metropolitan Region Development Authority. The stack is Spring MVC, Hibernate, PostgreSQL with BillDesk payment integration. My strongest areas are Spring Boot backend development, REST API design, SQL performance tuning, and I also work with React on the side. I'm an immediate joiner.` },
    { id: 2, section: "HR & Introduction", question: "Why are you looking for a change?", answer: `I've grown a lot at my current role — especially on the PMRDA portal where I've owned features end-to-end like the TAT calculation engine and the BillDesk penalty module. But I'm looking for a role with more exposure to Spring Boot 3, microservices, and cloud-native development since most of my current work is on Spring MVC with a monolithic architecture. I want to work on modern stacks and broaden my engineering depth.` },
    { id: 3, section: "HR & Introduction", question: "What are your strengths?", answer: `Three things I'd highlight:
1. Production debugging — I'm comfortable reading logs, profiling SQL, and tracing issues in live systems. I maintained 98% SLA compliance at Encora doing exactly this.
2. Database-level thinking — I write performant Hibernate native queries, understand PostgreSQL gotchas like aliasing in COUNT, casting issues, and view-level filters.
3. Ownership — On the PMRDA portal, I work directly with seniors and TLs to ship features that touch real citizens. I document my work and write merge-friendly code.` },
    { id: 4, section: "HR & Introduction", question: "What is your weakness?", answer: `Earlier in my career I would dive into code before fully mapping out the data flow, which sometimes led to rework. I've consciously fixed this by — before writing a single line — first running verification SQL against real data, checking information_schema for column names, and writing a small implementation note. It slowed me down at first but my code-review feedback has improved significantly.` },
    { id: 5, section: "HR & Introduction", question: "Where do you see yourself in 3–5 years?", answer: `In 3 years I want to be a strong senior backend engineer — someone who owns a service end-to-end, mentors juniors, and contributes to architecture decisions. In 5 years I'd like to grow into a tech lead role where I can balance hands-on coding with system design and team mentorship.` },
    { id: 6, section: "HR & Introduction", question: "Why should we hire you?", answer: `Three reasons. First, I'm production-experienced — I've shipped features to a live government portal used by real citizens, so I understand non-breaking changes, audit trails, and zero-downtime deploys. Second, I bring measurable impact — 25% API improvement, 30% throughput gain, 40% reduction in banking transaction failures. Third, I'm an immediate joiner with no notice period.` },
    { id: 7, section: "HR & Introduction", question: "What's your expected CTC / notice period?", answer: `- CTC: Based on my 3+ years and the responsibilities I've handled on a live government system, I'm looking at market standards. But I'm open to discussion based on the overall package and growth opportunity.
- Notice: I'm an immediate joiner.` },
    { id: 8, section: "HR & Introduction", question: "Are you comfortable working on legacy code?", answer: `Yes, and I have direct experience. The PMRDA portal is a Spring MVC + JSP + Apache Tiles application — not the latest stack, but a real production system. I've learned to make additive, non-breaking changes, comment out replaced code rather than deleting it for cleaner merges, and always verify my assumptions against the actual database schema before refactoring.` },
    { id: 9, section: "Resume Deep-Dive", question: "Walk me through your most challenging project.", answer: `The most challenging one is the PMRDA RTS portal — specifically the TAT (Turn Around Time) feature I built. The requirement was to show citizens and department staff exactly how many working days an application has been pending — but with several tricky business rules:
1. TAT had to freeze the moment a challan was generated, and resume once payment was received.
2. Working days only — no weekends, no government holidays.
3. For APPROVED and REJECTED applications, the column had to show 'N/A'.
4. The same logic had to work consistently in citizenInbox and departmentInbox.
Data was spread across tbl_application_detail, tbl_application_transaction, tbl_challan, and the vw_department_inbox view masked real status.
My approach: Written a static helper countWorkingDaysBetween, cached holidays list via loadHolidays(), bypassed view case logic with fetchRealStatusMap(), and orchestrated via applyDeptTat(). It went live without a single rollback.` },
    { id: 10, section: "Resume Deep-Dive", question: "Tell me about the high-traffic job portal where you reduced API response time by 25%.", answer: `At Encora I worked on a job portal with 10,000+ daily active users. Found three issues:
1. Query was fetching all columns -> replaced with a projection.
2. N+1 fetches via lazy loading -> added explicit JOIN FETCH.
3. Missing indexes -> adding a composite index on (location, posted_date) gave the biggest single jump. Response time dropped 25%, throughput went up 30%.` },
    { id: 11, section: "Resume Deep-Dive", question: "The resume says 40% reduction in transaction failures at Sarvatra — explain.", answer: `At Sarvatra I supported a core banking system handling UPI and IMPS. Root cause of reconciliation failures was data inconsistency between two tables causing partial failures. Worked with seniors to write a corrective SQL script identifying orphans to complete/reverse them based on timestamp, and added a constraint preventing future occurrences. Queue dropped 40% month-over-month.` },
    { id: 12, section: "Resume Deep-Dive", question: "What does the Citizen Complaint Tracker do, and why did you build it?", answer: `It's a full-stack side project built to deepen Spring Boot 3 + React skills. Features dynamic JWT-based authentication, Role-Based Access Control (RBAC) via @PreAuthorize, global exception handling via @RestControllerAdvice, and Swagger/OpenAPI documentation.` },
    { id: 13, section: "Resume Deep-Dive", question: "What's the Virtual File System project about?", answer: `A C++ academic project implementing a Linux-style virtual file system from scratch (inodes, file descriptors, open-file tables). It helped me natively understand resource handling, streams, and file patterns inside server architectures.` },
    { id: 14, section: "Java Core", question: "What's the difference between JDK, JRE, and JVM?", answer: `- JVM: Runtime executing bytecode. Platform-specific.
- JRE: JVM + core class libraries needed to run Java programs.
- JDK: JRE + compiler (javac), debugger, tools needed to build apps. (JDK ⊃ JRE ⊃ JVM)` },
    { id: 15, section: "Java Core", question: "Explain the four pillars of OOP with a real example from your work.", answer: `- Encapsulation: My CitizenInboxModel keeps fields private with public getters/setters — and getPaymentDone() returns a Boolean wrapper, so callers must use Boolean.TRUE.equals() for null-safe checks.
- Inheritance: All my entities extend BaseAuditAttributes which provides createdOn, createdBy, updatedOn so I don't repeat audit fields in every entity.
- Polymorphism: CommonService is an interface with CommonServiceImpl as the implementation. Controllers depend on the interface, so I can swap implementations without touching the controller.
- Abstraction: Service layer hides the JPA/native-query complexity from controllers.` },
    { id: 16, section: "Java Core", question: "== vs .equals() — when do you use which?", answer: `- == compares references (memory addresses) for objects, and values for primitives.
- .equals() compares content — but only if the class overrides it.
Real-world rule: For Strings, always use .equals(). For primitives, use ==. For your own classes, override equals() and hashCode() together.` },
    { id: 17, section: "Java Core", question: "What's the difference between String, StringBuilder, and StringBuffer?", answer: `String: Immutable, thread-safe, slow for concat.
StringBuilder: Mutable, not thread-safe, fast (best inside single-threaded methods).
StringBuffer: Mutable, thread-safe (synchronized), slower than StringBuilder.` },
    { id: 18, section: "Java Core", question: "What's the difference between ArrayList and LinkedList?", answer: `- ArrayList — backed by a resizable array. O(1) random access, O(n) insert/delete in middle. Better when you read more than you modify.
- LinkedList — doubly-linked nodes. O(n) random access, O(1) insert/delete if you have the node reference.` },
    { id: 19, section: "Java Core", question: "HashMap vs HashTable vs ConcurrentHashMap?", answer: `- HashMap — not thread-safe, allows one null key, multiple null values, fastest single-threaded.
- HashTable — legacy, synchronized on every method, no nulls allowed. Avoid.
- ConcurrentHashMap — thread-safe but uses bucket-level locking, so much better concurrency than HashTable. No nulls.` },
    { id: 20, section: "Java Core", question: "Explain final, finally, finalize.", answer: `- final — modifier. final variable = constant. final method = can't be overridden. final class = can't be extended.
- finally — the block after try/catch that always runs for resource cleanup.
- finalize — called by the garbage collector before reclaiming an object. Deprecated since Java 9 — don't use it.` },
    { id: 21, section: "Java Core", question: "Checked vs Unchecked exceptions?", answer: `- Checked — extend Exception. Must be either caught or declared in the throws clause. Example: SQLException, IOException.
- Unchecked — extend RuntimeException. Compiler doesn't force you to handle them. Example: NullPointerException, IllegalArgumentException.` },
    { id: 22, section: "Java Core", question: "What's the difference between throw and throws?", answer: `- throw — used inside a method body to actually throw an exception instance.
- throws — used in a method signature to declare that the method might throw a checked exception.` },
    { id: 23, section: "Java Core", question: "Explain Java 8 features you've used.", answer: `The ones I use regularly: Lambdas, Stream API, Optional, Functional interfaces (Function, Predicate, Consumer), and Default methods in interfaces.` },
    { id: 24, section: "Java Core", question: "Difference between Comparable and Comparator?", answer: `- Comparable<T> — implemented by the class itself. Has compareTo(). Defines the natural ordering. One per class.
- Comparator<T> — a separate class/lambda. Has compare(). You can have many comparators per class (sort by name, by date, etc.).` },
    { id: 25, section: "Java Core", question: "What is the JVM Memory Model?", answer: `JVM divides memory into:
- Heap — where all objects live (Young Gen + Old Gen).
- Stack — one per thread. Holds method frames, local variables, references.
- Metaspace — class metadata, static variables (replaced PermGen in Java 8).
- PC Register & Native Method Stack.` },
    { id: 26, section: "Spring MVC & Spring Boot", question: "Spring MVC vs Spring Boot — what's the actual difference?", answer: `Spring MVC is the web framework handling the MVC pattern. You configure it manually.
Spring Boot is Spring MVC + Spring core + opinionated auto-configuration + an embedded server (Tomcat by default).` },
    { id: 27, section: "Spring MVC & Spring Boot", question: "What is @SpringBootApplication?", answer: `It's a meta-annotation that combines three:
- @Configuration (marks class as source of beans)
- @EnableAutoConfiguration (auto-configures based on classpath)
- @ComponentScan (scans package and subpackages for components)` },
    { id: 28, section: "Spring MVC & Spring Boot", question: "Explain Dependency Injection. Why does it matter?", answer: `DI means objects don't create their dependencies — they receive them from the Spring container. It matters for Testability, Loose coupling, and Lifecycle management.` },
    { id: 29, section: "Spring MVC & Spring Boot", question: "Constructor injection vs Field injection — which is better?", answer: `Constructor injection is preferred because dependencies are explicit, fields can be final (immutable), and it works without Spring container in unit tests.` },
    { id: 30, section: "Spring MVC & Spring Boot", question: "Explain the bean lifecycle.", answer: `Spring Instantiates -> Populates properties (DI) -> Aware Interfaces -> @PostConstruct -> Bean is Ready -> Container Shutdown -> @PreDestroy.` },
    { id: 31, section: "Spring MVC & Spring Boot", question: "Bean scopes in Spring?", answer: `Singleton (default, one per container), Prototype (new per request), Request (one per HTTP request), Session (one per HTTP session), and Application.` },
    { id: 32, section: "Spring MVC & Spring Boot", question: "What is @RequestMapping? How is it different from @GetMapping, @PostMapping?", answer: `@RequestMapping is generic (specify path and method verb). @GetMapping and @PostMapping are method-specific shortcuts that improve readability.` },
    { id: 33, section: "Spring MVC & Spring Boot", question: "@Controller vs @RestController?", answer: `- @Controller — returns a view name (JSP, Thymeleaf) by default.
- @RestController — @Controller + @ResponseBody. Every method's return value is serialized directly to JSON/XML.` },
    { id: 34, section: "Spring MVC & Spring Boot", question: "What does @RequestBody and @ResponseBody do?", answer: `- @RequestBody — deserializes HTTP request JSON into a Java object using Jackson.
- @ResponseBody — serializes the return value directly into the HTTP response body.` },
    { id: 35, section: "Spring MVC & Spring Boot", question: "What is Spring Boot Starter?", answer: `Curated dependency bundles (e.g., spring-boot-starter-web) that pull in all required compatible jars automatically.` },
    { id: 36, section: "Spring MVC & Spring Boot", question: "How does Spring Boot do auto-configuration?", answer: `Looks at the classpath and configurations using @Conditional annotations (@ConditionalOnClass, @ConditionalOnMissingBean) to instantiate default setups.` },
    { id: 37, section: "Spring MVC & Spring Boot", question: "What's application.properties vs application.yml?", answer: `Same thing, different syntax. Properties is flat key=value; YAML is hierarchical and cleaner for nested configuration structures.` },
    { id: 38, section: "Spring MVC & Spring Boot", question: "How do you handle exceptions globally in Spring Boot?", answer: `Using @RestControllerAdvice with custom methods annotated with @ExceptionHandler to catch specific exceptions and return unified error JSON shapes.` },
    { id: 39, section: "Spring MVC & Spring Boot", question: "What are profiles in Spring Boot?", answer: `Environment-specific configurations (application-dev.yml, application-prod.yml). Active profiles can isolate different DB URLs, log levels, or services.` },
    { id: 40, section: "Spring MVC & Spring Boot", question: "What is Spring Actuator?", answer: `Exposes production-ready monitoring endpoints like /actuator/health, /metrics, /info, /env, and /threaddump out of the box.` },
    { id: 41, section: "Hibernate & JPA", question: "JPA vs Hibernate?", answer: `- JPA is the specification (interfaces and annotations like @Entity).
- Hibernate is the actual concrete implementation of that specification.` },
    { id: 42, section: "Hibernate & JPA", question: "get() vs load() in Hibernate?", answer: `- get() hits the DB immediately and returns null if not found.
- load() returns a proxy wrapper without hitting the DB, throwing an exception only when you access a property if it doesn't exist.` },
    { id: 43, section: "Hibernate & JPA", question: "save() vs persist() vs merge() vs saveOrUpdate()?", answer: `- persist(): JPA standard, makes transient entity managed (void).
- save(): Hibernate-specific, returns generated ID.
- merge(): JPA standard, copies state from detached entity onto a managed instance.
- saveOrUpdate(): Toggles between save and update based on ID presence.` },
    { id: 44, section: "Hibernate & JPA", question: "Lazy vs Eager loading?", answer: `- Lazy: related collection/object fetched only when accessed. Default for collections.
- Eager: fetched immediately with parent via automated joins. Default for single relationships.` },
    { id: 45, section: "Hibernate & JPA", question: "What is the N+1 query problem?", answer: `Performance trap where loading a parent executes 1 query, but accessing its lazy collection inside a loop executes N individual queries. Fixed with JOIN FETCH.` },
    { id: 46, section: "Hibernate & JPA", question: "JPQL vs Native Query vs Criteria API?", answer: `- JPQL: Entity-based abstract query language.
- Native SQL: Raw SQL strings running database-specific features directly.
- Criteria API: Programmatic, type-safe dynamic query builders.` },
    { id: 47, section: "Hibernate & JPA", question: "What gotchas have you hit with PostgreSQL native queries in Hibernate?", answer: `1. ::date cast breaks named parameters (use CAST instead).
2. COUNT(*) must be explicitly aliased to prevent syntax map exceptions.
3. Checking active flags using char markers ('Y'/'N') instead of true/false booleans.` },
    { id: 48, section: "Hibernate & JPA", question: "What is the first-level and second-level cache in Hibernate?", answer: `- First-level: Session cache scoped to a single transaction (active by default).
- Second-level: Shared across sessions, optional plugin architecture (Ehcache, Caffeine) for reference metrics.` },
    { id: 49, section: "Hibernate & JPA", question: "What's the difference between @OneToMany and @ManyToOne?", answer: `- @ManyToOne is the owning side holding the foreign key column target.
- @OneToMany is the inverse side utilizing mappedBy to tie back relationships.` },
    { id: 50, section: "REST API Design", question: "What is REST? Six constraints?", answer: `Representational State Transfer. Constraints: Client-Server, Stateless, Cacheable, Uniform Interface, Layered System, Code on Demand.` },
    { id: 51, section: "REST API Design", question: "HTTP methods and what they do?", answer: `GET (Read, safe, idempotent), POST (Create, unsafe), PUT (Full overwrite, idempotent), PATCH (Partial update), DELETE (Remove, idempotent).` },
    { id: 52, section: "REST API Design", question: "HTTP status codes you use most often?", answer: `200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401 (Unauthenticated), 403 (Forbidden Role), 404 (Not Found), 500 (Internal Server Error).` },
    { id: 53, section: "REST API Design", question: "PUT vs PATCH — when do you use which?", answer: `- PUT replaces the entire resource representation (missing fields get nulled).
- PATCH transmits granular delta changes to a narrow subset of fields.` },
    { id: 54, section: "REST API Design", question: "How do you version your REST APIs?", answer: `Preferably via explicit URL path versioning (e.g., /api/v1/applications) to guarantee client transparency.` },
    { id: 55, section: "REST API Design", question: "How do you secure REST APIs?", answer: `Enforced HTTPS layers, state-free JWT tokens, explicit DTO input validations via @Valid, rate limiting, and RBAC role checks.` },
    { id: 56, section: "REST API Design", question: "What's the difference between authentication and authorization?", answer: `- Authentication: Validates identity parameters (Who are you?).
- Authorization: Validates permission groups and access access privileges (What can you do?).` },
    { id: 57, section: "Database & SQL", question: "What's the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN?", answer: `- INNER: exact matching intersects across both sides.
- LEFT: all left rows, matching right rows, or null markers on mismatch.
- RIGHT: mirror opposite of Left.
- FULL: matches everything from both sides, filling nulls where gaps exist.` },
    { id: 58, section: "Database & SQL", question: "WHERE vs HAVING?", answer: `- WHERE: filters rows before aggregation steps occur.
- HAVING: filters aggregated groups after GROUP BY steps run.` },
    { id: 59, section: "Database & SQL", question: "What is normalization? Which forms have you used?", answer: `The removal of data redundancies. In practice, I aim for 3NF (decoupling transitive dependencies) and denormalize views intentionally for quick reads.` },
    { id: 60, section: "Database & SQL", question: "Indexing — what is it and when do you add one?", answer: `A B-Tree lookup structure accelerating retrieval speeds. Apply onto frequent foreign keys or target WHERE criteria columns with high cardinality.` },
    { id: 61, section: "Database & SQL", question: "What's the difference between Clustered and Non-clustered index?", answer: `- Clustered physical stores row order data matching the index configuration (1 per table).
- Non-Clustered is a separate reference structure pointing back to primary addresses.` },
    { id: 62, section: "Database & SQL", question: "ACID properties of transactions?", answer: `Atomicity (all or nothing), Consistency (schema validation holds), Isolation (no concurrent overlapping), Durability (hardened updates survive crashes).` },
    { id: 63, section: "Database & SQL", question: "Transaction isolation levels?", answer: `Read Uncommitted (dirty reads risk), Read Committed (PostgreSQL default), Repeatable Read (prevents modification anomalies), and Serializable (complete sequential thread isolation).` },
    { id: 64, section: "Database & SQL", question: "How would you optimize a slow SQL query?", answer: `Run EXPLAIN ANALYZE to track sequential scans, introduce composite indexes, remove wasteful SELECT * wildcards, and clean up bad join paths.` },
    { id: 65, section: "Database & SQL", question: "How do you write a query for pagination?", answer: `Use LIMIT and OFFSET keywords, or pivot to faster keyset cursor pagination tracking sequential primary IDs when parsing massive tables.` },
    { id: 66, section: "Security", question: "What is JWT? How does it work?", answer: `JSON Web Token. Statelessly secures interactions across three dot-separated components: Header, Payload, and Signature. Verified directly by server secret pairs without requiring central session lookups.` },
    { id: 67, section: "Security", question: "JWT vs Session-based auth?", answer: `- Sessions track state in server memory mapped to cookie IDs. Easy to cancel but harder to scale.
- JWT uses self-contained stateless access structures. High scaling capacity but harder to revoke instantly.` },
    { id: 68, section: "Security", question: "How did you implement JWT in your Citizen Complaint Tracker?", answer: `Built via Spring Security filtering pipelines extending OncePerRequestFilter. Captures inbound Bearer headers to process signatures and populate context maps.` },
    { id: 69, section: "Security", question: "What is RBAC?", answer: `Role-Based Access Control. Maps system permission structures strictly onto security group roles (e.g., ADMIN vs USER) instead of tracking individual accounts directly.` },
    { id: 70, section: "Security", question: "Why AES/GCM? Why not just AES?", answer: `AES defines the encryption block cipher, but GCM provides AEAD (Authenticated Encryption with Associated Data). This delivers built-in integrity tags that natively detect tampering or data modification during decryption routines.` },
    { id: 71, section: "Security", question: "Walk me through BillDesk payment integration.", answer: `Concatenate core payment properties into secure message streams -> sign payloads with merchant keys via HMAC checksum configurations -> redirect users to BillDesk -> intercept responses securely -> confirm incoming signature integrity keys before validating order tables.` },
    { id: 72, section: "Security", question: "What is CSRF? Do JWT-based APIs need CSRF protection?", answer: `Cross-Site Request Forgery exploits automatic browser cookie routing policies. State-free APIs utilizing manual token authorization headers are inherently safe against CSRF vectors because malicious environments cannot fetch local user data.` },
    { id: 73, section: "Production Debugging & Behavioral", question: "Walk me through a tough production bug you solved.", answer: `Resolved wrong department inbox metric displays on the PMRDA portal caused by rigid internal view joins. Debugged view query behaviors to reconstruct dashboards via precise UNION strategies to handle unique relational rules without rollbacks.` },
    { id: 74, section: "Production Debugging & Behavioral", question: "Tell me about a time you missed a deadline.", answer: `Encountered data integration bottlenecks during a dashboard launch due to mock data mismatches. Instantly flagged the issue to leadership, delivered completed features upfront, and revised data verification checks for upcoming sprints.` },
    { id: 75, section: "Production Debugging & Behavioral", question: "Describe a conflict with a teammate.", answer: `Resolved architectural disagreements over utility component placements by demonstrating framework injection limitations with concrete code prototypes rather than opinions.` },
    { id: 76, section: "Production Debugging & Behavioral", question: "Tell me about a time you took initiative.", answer: `Compiled a central 'PostgreSQL + Hibernate optimization guide' inside team Confluence spaces, drastically reducing ramp-up time for incoming engineering colleagues.` },
    { id: 77, section: "Production Debugging & Behavioral", question: "How do you handle pressure / tight deadlines?", answer: `Isolate delivery dependencies visibly, prioritize core operational milestones over secondary features, and keep communication clear and frequent across project milestones.` },
    { id: 78, section: "AI Tools & Modern Practices", question: "The resume mentions GitHub Copilot, Claude, ChatGPT. How do you actually use them at work?", answer: `Utilized as code review companions to track edge cases, expedite stack trace debugging, and generate high quality infrastructure documentation outlines without exposing proprietary algorithms or data.` },
    { id: 79, section: "AI Tools & Modern Practices", question: "Have you used AI to generate code you then committed?", answer: `Yes, for structural scaffolding tasks like jsPDF configurations, while auditing every generated line to verify business compliance before deployment.` },
    { id: 80, section: "Quick-Fire Tricky Questions", question: "Can you have a try block without catch?", answer: `Yes, both try-finally and try-with-resources blocks are completely valid in Java. You simply need at least one catch or finally block present.` },
    { id: 81, section: "Quick-Fire Tricky Questions", question: "Can a constructor be final, static, or abstract?", answer: `No. Constructors are never inherited (making final meaningless), initialize instance states (contradicting static), and must contain logic bodies to materialize object graphs (disallowing abstract).` },
    { id: 82, section: "Quick-Fire Tricky Questions", question: "Can you override a static method?", answer: `No. Static methods belong directly to the class definitions. Re-declaring static methods inside extended classes performs method hiding rather than a polymorphistic override.` },
    { id: 83, section: "Quick-Fire Tricky Questions", question: "Can you override a private or final method?", answer: `No. Private methods are invisible to subclasses, and final methods explicitly block modification to protect structural integrity.` },
    { id: 84, section: "Quick-Fire Tricky Questions", question: "What's the difference between String s = \"hello\" and String s = new String(\"hello\")?", answer: `Literal initializations look up allocations via the JVM String Pool to optimize memory reuse. Using the 'new' keyword explicitly instantiates completely distinct objects directly onto the heap space.` },
    { id: 85, section: "Quick-Fire Tricky Questions", question: "Can main method be overloaded?", answer: `Yes, you can declare multiple main signatures inside a class. However, the JVM will strictly execute public static void main(String[] args) as the standard entry point.` },
    { id: 86, section: "Quick-Fire Tricky Questions", question: "What is the difference between interface and abstract class?", answer: `- Interfaces offer multiple inheritance options mapping design contracts without active variables.
- Abstract classes manage single lineage hierarchies capable of carrying structural state variables.` },
    { id: 87, section: "Quick-Fire Tricky Questions", question: "What does volatile do?", answer: `Instructs the thread schedulers to process reads and updates directly from the main hardware memory stack, completely bypassing localized core cache systems to resolve cross-thread state visibility.` },
    { id: 88, section: "Quick-Fire Tricky Questions", question: "What's the difference between synchronized method and synchronized block?", answer: `- Synchronized methods lock the whole instance context on execution.
- Synchronized blocks allow narrow locks on specific targets for finer performance controls.` },
    { id: 89, section: "Quick-Fire Tricky Questions", question: "What is transient?", answer: `An operational field modifier preventing designated variables from being serialized into outbound persistent data streams.` },
    { id: 90, section: "Quick-Fire Tricky Questions", question: "What is the contract between equals() and hashCode()?", answer: `If two objects evaluate as equal via equals(), they MUST return identical hash codes. Breaking this rule compromises data operations across collection types like HashMap and HashSet.` }
];
