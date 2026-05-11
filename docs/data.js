/* ============================================================
   Java Evolution — data
   Single source of truth for all versions, features, deprecations.
   Tags: language | api | jvm | tooling | preview
   ============================================================ */

window.JAVA_DATA = [
  /* ============================================ JAVA 8 */
  {
    version: 8,
    date: "March 18, 2014",
    codename: "Spider",
    lts: true,
    blurb: "The watershed release. Lambdas, the Stream API, and a brand-new date/time library reshaped how Java code is written more than any version before or since.",
    features: [
      {
        name: "Lambda expressions",
        summary: "First-class functions, finally.",
        desc: "Anonymous-class boilerplate collapses into a single expression. Combined with functional interfaces, lambdas made Java's collection and concurrency APIs dramatically more expressive and enabled the Stream API.",
        tag: "language",
        before: {
          lang: "java",
          code: `Collections.sort(people, new Comparator<Person>() {
    @Override
    public int compare(Person a, Person b) {
        return a.getLastName().compareTo(b.getLastName());
    }
});`
        },
        after: {
          lang: "java",
          code: `// Lambda + method reference
people.sort((a, b) -> a.getLastName().compareTo(b.getLastName()));
people.sort(Comparator.comparing(Person::getLastName));`
        }
      },
      {
        name: "Stream API",
        summary: "Declarative pipelines for collections.",
        desc: "java.util.stream lets you chain map/filter/reduce operations over collections (and sources like files or generators). Streams encourage immutability, can run in parallel with one call, and pair naturally with lambdas.",
        tag: "api",
        code: {
          lang: "java",
          code: `List<String> topNames = people.stream()
    .filter(p -> p.getAge() >= 18)
    .map(Person::getFullName)
    .sorted()
    .limit(10)
    .collect(Collectors.toList());

double avgAge = people.parallelStream()
    .mapToInt(Person::getAge)
    .average()
    .orElse(0.0);`
        }
      },
      {
        name: "Optional<T>",
        summary: "A container for \"maybe null\".",
        desc: "Optional makes the absence of a value explicit in the type system, replacing many sentinel-null returns. Use it on return types; avoid it for parameters and fields.",
        tag: "api",
        code: {
          lang: "java",
          code: `Optional<User> user = repo.findById(id);

String displayName = user
    .map(User::getName)
    .filter(n -> !n.isBlank())
    .orElse("Anonymous");

user.ifPresentOrElse(
    u -> log.info("found {}", u),
    () -> log.warn("missing user {}", id)
);`
        }
      },
      {
        name: "java.time (JSR-310)",
        summary: "A modern, immutable date/time API.",
        desc: "Replaces the much-maligned java.util.Date and Calendar with immutable types: Instant, LocalDate, LocalDateTime, ZonedDateTime, Duration, Period. Thread-safe and timezone-aware by design.",
        tag: "api",
        code: {
          lang: "java",
          code: `LocalDate today = LocalDate.now();
LocalDate releaseDay = LocalDate.of(2014, Month.MARCH, 18);
Period since = Period.between(releaseDay, today);

ZonedDateTime meeting = ZonedDateTime
    .of(2026, 5, 12, 14, 30, 0, 0, ZoneId.of("Europe/Berlin"));

Duration timeLeft = Duration.between(Instant.now(), meeting.toInstant());`
        }
      },
      {
        name: "Default methods",
        summary: "Interfaces can ship behavior.",
        desc: "Default methods let interfaces evolve without breaking implementers — a prerequisite for retrofitting forEach, stream, and friends onto Collection. Use sparingly; an interface is still a contract first.",
        tag: "language",
        code: {
          lang: "java",
          code: `public interface Greeter {
    String name();

    default String greet() {
        return "Hello, " + name() + "!";
    }

    static Greeter of(String n) {
        return () -> n;
    }
}`
        }
      },
      {
        name: "CompletableFuture",
        summary: "Composable async without callback hell.",
        desc: "A Future you can chain, combine, and complete by hand. Replaces nested Future.get() patterns with thenApply/thenCompose/thenCombine pipelines and timeout/exception hooks.",
        tag: "api",
        code: {
          lang: "java",
          code: `CompletableFuture<String> page = CompletableFuture
    .supplyAsync(() -> http.get(url))
    .thenApply(this::parse)
    .thenCompose(this::enrich)
    .exceptionally(ex -> "fallback: " + ex.getMessage())
    .orTimeout(2, TimeUnit.SECONDS);

page.thenAccept(System.out::println);`
        }
      }
    ],
    deprecations: [
      { what: "PermGen", kind: "removed", note: "Metaspace replaces it; class metadata now lives in native memory and grows as needed." },
      { what: "Old date/time types", kind: "discouraged", note: "java.util.Date and Calendar remain but are superseded by java.time for all new code." }
    ]
  },

  /* ============================================ JAVA 9 */
  {
    version: 9,
    date: "September 21, 2017",
    codename: null,
    lts: false,
    blurb: "The modularization release. JPMS finally split the platform itself into modules, JShell brought a REPL, and the collection factories trimmed a decade of boilerplate.",
    features: [
      {
        name: "JPMS — the module system",
        summary: "Strong encapsulation at platform scale.",
        desc: "Project Jigsaw introduced named modules with explicit requires/exports declarations. The JDK itself is now ~90 modules. You can build smaller runtimes with jlink and stop accidentally depending on sun.* internals.",
        tag: "language",
        code: {
          lang: "java",
          code: `// src/com.example.app/module-info.java
module com.example.app {
    requires java.net.http;
    requires com.fasterxml.jackson.databind;

    exports com.example.app.api;
    // Reflective frameworks need opens, not exports:
    opens com.example.app.model to com.fasterxml.jackson.databind;
}`
        }
      },
      {
        name: "JShell",
        summary: "Java gets a REPL.",
        desc: "Interactive read-eval-print loop for prototyping snippets, exploring APIs, and teaching. No public-static-void-main scaffold required.",
        tag: "tooling",
        code: {
          lang: "shell",
          code: `$ jshell
|  Welcome to JShell -- Version 9
jshell> var nums = List.of(1, 2, 3, 4)
nums ==> [1, 2, 3, 4]
jshell> nums.stream().mapToInt(Integer::intValue).sum()
$2 ==> 10
jshell> /exit`
        }
      },
      {
        name: "Collection factories",
        summary: "List.of, Set.of, Map.of.",
        desc: "Immutable collections in one line. They reject null elements, are space-efficient for small sizes, and replace the Arrays.asList / Collections.unmodifiableMap two-step.",
        tag: "api",
        before: {
          lang: "java",
          code: `Map<String, Integer> ages = new HashMap<>();
ages.put("ada", 36);
ages.put("alan", 41);
ages = Collections.unmodifiableMap(ages);`
        },
        after: {
          lang: "java",
          code: `var ages = Map.of(
    "ada",  36,
    "alan", 41
);
var primes = List.of(2, 3, 5, 7, 11);
var tags   = Set.of("jvm", "language", "api");`
        }
      },
      {
        name: "Private interface methods",
        summary: "Share helpers between default methods.",
        desc: "Default methods inside an interface can now call private helpers, avoiding duplicated logic without leaking implementation details to consumers.",
        tag: "language",
        code: {
          lang: "java",
          code: `public interface AuditLog {
    void write(String entry);

    default void info(String msg)  { write(line("INFO",  msg)); }
    default void warn(String msg)  { write(line("WARN",  msg)); }
    default void error(String msg) { write(line("ERROR", msg)); }

    private String line(String level, String msg) {
        return "[" + Instant.now() + "] " + level + " " + msg;
    }
}`
        }
      },
      {
        name: "Stream / Optional enhancements",
        summary: "takeWhile, dropWhile, ofNullable, ifPresentOrElse.",
        desc: "Small but well-placed additions: streams gained ordered short-circuit operators, Optional gained ifPresentOrElse and stream(), and Stream.ofNullable handles the empty-or-one case cleanly.",
        tag: "api",
        code: {
          lang: "java",
          code: `Stream.of(1, 2, 3, 4, 5)
      .takeWhile(n -> n < 4)   // [1, 2, 3]
      .forEach(System.out::println);

Optional.ofNullable(maybeUser)
        .ifPresentOrElse(
            u -> publish(u),
            () -> log.warn("no user")
        );`
        }
      }
    ],
    deprecations: [
      { what: "Applet API", kind: "deprecated", note: "Browser plugins were already gone; the API itself is now on a deprecation path (removed for-removal in 17, removed in 21)." },
      { what: "java.util.Observer / Observable", kind: "deprecated", note: "Use a proper listener interface, java.beans.PropertyChangeListener, or a reactive library (Flow, Reactor, RxJava)." },
      { what: "_ as an identifier", kind: "warning", note: "Reserved for future use. The single underscore is now a compile error in source; the reservation later became unnamed variables in 21+." }
    ]
  },

  /* ============================================ JAVA 10 */
  {
    version: 10,
    date: "March 20, 2018",
    codename: null,
    lts: false,
    blurb: "Java's first six-month cadence release. Small surface, but var changed daily code more than any single addition since lambdas.",
    features: [
      {
        name: "Local-variable type inference (var)",
        summary: "Let the compiler write the obvious types.",
        desc: "var infers the type of local variables from the initializer. It's still strongly and statically typed — just less repetitive. Reserved for locals; not allowed on fields, parameters, or return types.",
        tag: "language",
        before: {
          lang: "java",
          code: `Map<String, List<Order>> ordersByCustomer =
    new HashMap<String, List<Order>>();

URL url = new URL("https://example.com");
InputStream in = url.openStream();`
        },
        after: {
          lang: "java",
          code: `var ordersByCustomer = new HashMap<String, List<Order>>();

var url = new URL("https://example.com");
var in  = url.openStream();

for (var entry : ordersByCustomer.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue().size());
}`
        }
      },
      {
        name: "Garbage-Collector Interface",
        summary: "Plug-in collectors for the JVM.",
        desc: "A clean internal interface for GC implementations. Made it possible to add (and remove) collectors like ZGC, Shenandoah, and Epsilon without surgery across HotSpot.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `# Pick a collector at launch time
$ java -XX:+UseG1GC      MyApp     # default since 9
$ java -XX:+UseParallelGC MyApp     # throughput-oriented
$ java -XX:+UseZGC        MyApp     # added in 11+ (experimental), 15 production
$ java -XX:+UseEpsilonGC  MyApp     # no-op collector, useful for short-lived benchmarks`
        }
      },
      {
        name: "Application Class-Data Sharing",
        summary: "Faster startup by sharing class metadata.",
        desc: "AppCDS extends CDS to application classes. Dump a shared archive once, then mmap it across JVM instances — measurable startup and footprint wins for short-lived processes and containers.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `# 1. Record the classes used
$ java -XX:DumpLoadedClassList=app.lst -cp app.jar com.example.App

# 2. Build the shared archive
$ java -Xshare:dump -XX:SharedClassListFile=app.lst \\
       -XX:SharedArchiveFile=app.jsa -cp app.jar

# 3. Run with the archive
$ java -Xshare:auto -XX:SharedArchiveFile=app.jsa -cp app.jar com.example.App`
        }
      },
      {
        name: "Copy-of unmodifiable collections",
        summary: "Snapshot a collection in one call.",
        desc: "List.copyOf / Set.copyOf / Map.copyOf produce truly immutable shallow copies. Cheap, intent-revealing, and they reject null entries.",
        tag: "api",
        code: {
          lang: "java",
          code: `var snapshot = List.copyOf(liveOrders);
// snapshot.add(...) → UnsupportedOperationException

// Useful in constructors to defensively freeze input:
public Order(List<LineItem> items) {
    this.items = List.copyOf(items);
}`
        }
      }
    ],
    deprecations: [
      { what: "javah", kind: "removed", note: "Removed in favor of javac -h, which generates JNI headers as part of the regular compile." },
      { what: "Old Solaris / SPARC ports", kind: "deprecated", note: "Set on a deprecation path; removed entirely in Java 15." }
    ]
  },

  /* ============================================ JAVA 11 */
  {
    version: 11,
    date: "September 25, 2018",
    codename: null,
    lts: true,
    blurb: "The first LTS of the new cadence. A modern HTTP client landed, Java EE and CORBA were finally cut out of the JDK, and source-launch turned simple scripts into Java one-liners.",
    features: [
      {
        name: "HttpClient (java.net.http)",
        summary: "A standard, modern HTTP/2 client.",
        desc: "Replaces HttpURLConnection. Supports HTTP/2, WebSocket, sync and async, and integrates with CompletableFuture. No more pulling in Apache HttpClient or OkHttp for basic calls.",
        tag: "api",
        code: {
          lang: "java",
          code: `var client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_2)
    .connectTimeout(Duration.ofSeconds(5))
    .build();

var request = HttpRequest.newBuilder(URI.create("https://api.example.com/users"))
    .header("Accept", "application/json")
    .GET()
    .build();

// Async
client.sendAsync(request, BodyHandlers.ofString())
      .thenApply(HttpResponse::body)
      .thenAccept(System.out::println);`
        }
      },
      {
        name: "String enhancements",
        summary: "strip, lines, repeat, isBlank.",
        desc: "Long-overdue String additions: strip() is Unicode-aware (unlike trim), lines() yields a Stream<String>, repeat(n) concatenates, isBlank tests whitespace-only.",
        tag: "api",
        code: {
          lang: "java",
          code: `"  hello\\u2003".strip();           // "hello"  (handles unicode whitespace)
"  hello\\u2003".trim();            // "hello\\u2003" (only ASCII < 0x20)

"line one\\nline two\\nline three"
    .lines()
    .filter(Predicate.not(String::isBlank))
    .forEach(System.out::println);

"=".repeat(40);                    // "========================================"`
        }
      },
      {
        name: "var in lambda parameters",
        summary: "Annotate lambda params with var.",
        desc: "Lets you place annotations like @NonNull or @SuppressWarnings on a lambda parameter without having to write its full type. Mostly a tooling/annotations convenience.",
        tag: "language",
        code: {
          lang: "java",
          code: `// Without var, you couldn't annotate a parameter type-inferred in a lambda
people.stream()
      .filter((@NonNull var p) -> p.isActive())
      .toList();`
        }
      },
      {
        name: "Single-file source launch",
        summary: "java Hello.java — no compile step.",
        desc: "Treat .java files as scripts. The launcher compiles in memory and runs main(). Combined with a shebang line, makes Java viable for ad-hoc tooling.",
        tag: "tooling",
        code: {
          lang: "shell",
          code: `#!/usr/bin/env java --source 11
public class Greet {
    public static void main(String[] args) {
        System.out.println("hi, " + (args.length > 0 ? args[0] : "world"));
    }
}

$ chmod +x ./greet
$ ./greet Ada
hi, Ada`
        }
      },
      {
        name: "Files.readString / writeString",
        summary: "One-call file IO for text.",
        desc: "Read or write an entire file as a String in a single call. Useful for config, templates, and tests. Pair with java.nio.file.Path.",
        tag: "api",
        code: {
          lang: "java",
          code: `var path = Path.of("config.json");
String json = Files.readString(path, StandardCharsets.UTF_8);

Files.writeString(
    Path.of("out.txt"),
    "rendered at " + Instant.now(),
    StandardCharsets.UTF_8,
    StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING
);`
        }
      }
    ],
    deprecations: [
      { what: "Java EE modules", kind: "removed", note: "java.xml.bind (JAXB), java.xml.ws (JAX-WS), java.activation, java.corba, java.transaction. Use the stand-alone Jakarta EE artifacts on Maven Central." },
      { what: "CORBA", kind: "removed", note: "java.corba is gone. If you still need it, depend on GlassFish CORBA explicitly — but really, don't." },
      { what: "Nashorn JS engine", kind: "deprecated", note: "Marked for removal. Migrate to GraalJS or another JavaScript runtime. Actually removed in Java 15." },
      { what: "Pack200", kind: "deprecated", note: "Pack200 tools and API deprecated; removed in Java 14." }
    ]
  },

  /* ============================================ JAVA 12 */
  {
    version: 12,
    date: "March 19, 2019",
    codename: null,
    lts: false,
    blurb: "A preview-heavy release. Switch expressions arrived as a preview and the Shenandoah low-pause GC entered experimentally.",
    features: [
      {
        name: "Switch expressions (preview)",
        summary: "Switch becomes an expression — and ditches fall-through.",
        desc: "A new arrow syntax that returns a value, supports comma-separated labels, and refuses implicit fall-through. Lets you assign a value from a switch directly. Finalized in Java 14.",
        tag: "preview",
        before: {
          lang: "java",
          code: `int days;
switch (month) {
    case JANUARY:
    case MARCH:
    case MAY:
    case JULY:
    case AUGUST:
    case OCTOBER:
    case DECEMBER:
        days = 31; break;
    case APRIL: case JUNE: case SEPTEMBER: case NOVEMBER:
        days = 30; break;
    case FEBRUARY:
        days = leap ? 29 : 28; break;
    default:
        throw new IllegalStateException();
}`
        },
        after: {
          lang: "java",
          code: `int days = switch (month) {
    case JANUARY, MARCH, MAY, JULY, AUGUST, OCTOBER, DECEMBER -> 31;
    case APRIL, JUNE, SEPTEMBER, NOVEMBER                     -> 30;
    case FEBRUARY                                             -> leap ? 29 : 28;
};`
        }
      },
      {
        name: "Shenandoah GC (experimental)",
        summary: "Sub-10ms pause-time collector.",
        desc: "A concurrent collector targeting low pause times regardless of heap size. Available out-of-the-box from OpenJDK builds in 12, marked production-ready in 15.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `$ java -XX:+UnlockExperimentalVMOptions \\
       -XX:+UseShenandoahGC \\
       -Xmx8g \\
       MyApp`
        }
      },
      {
        name: "Compact number formatting",
        summary: "1.2K, 3.4M, 5.6B out of the box.",
        desc: "NumberFormat.getCompactNumberInstance produces locale-aware short forms of large numbers — handy for dashboards, badges, and feed UIs.",
        tag: "api",
        code: {
          lang: "java",
          code: `var fmt = NumberFormat.getCompactNumberInstance(
    Locale.US, NumberFormat.Style.SHORT);
fmt.format(1_234);       // "1K"
fmt.format(12_345_000);  // "12M"

var de = NumberFormat.getCompactNumberInstance(
    Locale.GERMAN, NumberFormat.Style.LONG);
de.format(1_500);        // "1,5 Tausend"`
        }
      },
      {
        name: "String::indent and ::transform",
        summary: "Re-indent and pipe strings.",
        desc: "indent adjusts leading whitespace and normalizes line terminators. transform applies an arbitrary Function — useful for fluent text manipulation without nesting calls.",
        tag: "api",
        code: {
          lang: "java",
          code: `String code = "class A {\\n  int x;\\n}";
System.out.println(code.indent(4));

String slug = "  Hello World  ".transform(s -> s.strip()
                                                .toLowerCase()
                                                .replace(' ', '-'));
// slug == "hello-world"`
        }
      }
    ],
    deprecations: [
      { what: "Default CDS archives", kind: "behavior change", note: "JDK now ships a precomputed default CDS archive; expect faster startup out of the box." }
    ]
  },

  /* ============================================ JAVA 13 */
  {
    version: 13,
    date: "September 17, 2019",
    codename: null,
    lts: false,
    blurb: "Text blocks arrived as a preview, switch expressions iterated on yield, and ZGC kept maturing.",
    features: [
      {
        name: "Text blocks (preview)",
        summary: "Multi-line string literals.",
        desc: "Triple-quoted string literals that preserve formatting and strip incidental whitespace based on the closing delimiter's indent. Kills the StringBuilder-per-line pattern. Finalized in Java 15.",
        tag: "preview",
        before: {
          lang: "java",
          code: `String html = "<html>\\n" +
              "  <body>\\n" +
              "    <p>Hello, world.</p>\\n" +
              "  </body>\\n" +
              "</html>";`
        },
        after: {
          lang: "java",
          code: `String html = """
        <html>
          <body>
            <p>Hello, world.</p>
          </body>
        </html>
        """;

String query = """
        SELECT id, name, email
        FROM users
        WHERE active = true
        """;`
        }
      },
      {
        name: "Switch expressions: yield (preview)",
        summary: "Multi-statement arms via yield.",
        desc: "Refinement of switch expressions: when an arm needs a block, use yield to return its value. Replaces the awkward break value syntax from Java 12's preview.",
        tag: "preview",
        code: {
          lang: "java",
          code: `int score = switch (grade) {
    case 'A' -> 4;
    case 'B' -> 3;
    case 'C' -> 2;
    case 'D' -> 1;
    case 'F' -> 0;
    default  -> {
        log.warn("unknown grade: {}", grade);
        yield -1;
    }
};`
        }
      },
      {
        name: "ZGC on macOS & Windows",
        summary: "Low-pause GC, now portable.",
        desc: "The Z Garbage Collector — designed for very large heaps and sub-millisecond pauses — gained macOS and Windows support, having shipped only on Linux x64 in 11.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `$ java -XX:+UnlockExperimentalVMOptions -XX:+UseZGC -Xmx16g MyApp`
        }
      },
      {
        name: "Reimplemented Socket API",
        summary: "java.net.Socket on a new foundation.",
        desc: "PlainSocketImpl was replaced by NioSocketImpl, a simpler implementation that's easier to maintain and a prerequisite for virtual-thread-friendly blocking I/O down the line.",
        tag: "jvm",
        code: {
          lang: "java",
          code: `// No code change required — same Socket API,
// but with a cleaner JVM-level implementation under the hood.
try (var s = new Socket("example.com", 80)) {
    s.getOutputStream().write("GET / HTTP/1.0\\r\\n\\r\\n".getBytes());
}`
        }
      }
    ],
    deprecations: [
      { what: "rmic tool", kind: "deprecated", note: "RMI stub compiler set for removal. Modern RMI uses dynamic proxies; rmic was for the JRMP transport layer most apps no longer touch." }
    ]
  },

  /* ============================================ JAVA 14 */
  {
    version: 14,
    date: "March 17, 2020",
    codename: null,
    lts: false,
    blurb: "Records and pattern matching for instanceof both previewed. Helpful NullPointerExceptions started naming the actual culprit.",
    features: [
      {
        name: "Records (preview)",
        summary: "Concise immutable data carriers.",
        desc: "A record is a transparent carrier for a fixed set of fields. The compiler generates the constructor, accessors, equals, hashCode, and toString. Finalized in Java 16.",
        tag: "preview",
        before: {
          lang: "java",
          code: `public final class Point {
    private final double x, y;
    public Point(double x, double y) { this.x = x; this.y = y; }
    public double x() { return x; }
    public double y() { return y; }
    @Override public boolean equals(Object o) { /* ... */ }
    @Override public int hashCode() { /* ... */ }
    @Override public String toString() { /* ... */ }
}`
        },
        after: {
          lang: "java",
          code: `public record Point(double x, double y) {}

// Compact constructor for validation:
public record Range(int lo, int hi) {
    public Range {
        if (lo > hi) throw new IllegalArgumentException();
    }
}`
        }
      },
      {
        name: "Pattern matching for instanceof (preview)",
        summary: "Test-and-cast in one shot.",
        desc: "Binds a typed pattern variable when instanceof matches. Eliminates the cast-after-check redundancy and the bug class where the check and the cast drift apart. Finalized in 16.",
        tag: "preview",
        before: {
          lang: "java",
          code: `if (obj instanceof String) {
    String s = (String) obj;
    if (s.length() > 5) return s.toUpperCase();
}`
        },
        after: {
          lang: "java",
          code: `if (obj instanceof String s && s.length() > 5) {
    return s.toUpperCase();
}`
        }
      },
      {
        name: "Helpful NullPointerExceptions",
        summary: "NPE messages that point to the actual null.",
        desc: "The JVM now tells you which variable in a chained expression was null — a small change that pays back a hundred debugging sessions. Enabled by default since Java 15.",
        tag: "jvm",
        code: {
          lang: "java",
          code: `// Before:
//   Exception in thread "main" java.lang.NullPointerException
//
// After:
//   Exception in thread "main" java.lang.NullPointerException:
//     Cannot invoke "Address.getStreet()" because the return value of
//     "User.getAddress()" is null
//       at com.example.App.format(App.java:42)

String street = user.getAddress().getStreet().toUpperCase();`
        }
      },
      {
        name: "Packaging tool: jpackage (incubator)",
        summary: "Native installers for Java apps.",
        desc: "Bundle your app and a runtime into a platform-native installer — .msi, .pkg, .deb. Replaces the long-removed javapackager. Promoted out of incubator in Java 16.",
        tag: "tooling",
        code: {
          lang: "shell",
          code: `$ jpackage \\
    --name MyApp \\
    --input target/dist \\
    --main-jar myapp.jar \\
    --main-class com.example.App \\
    --type dmg`
        }
      }
    ],
    deprecations: [
      { what: "CMS Garbage Collector", kind: "removed", note: "Concurrent Mark Sweep is gone; switch to G1 (default) or ZGC/Shenandoah for low-pause needs." },
      { what: "ParallelScavenge + SerialOld combo", kind: "removed", note: "An obscure GC combination — the JVM no longer accepts it." },
      { what: "Pack200 tools and API", kind: "removed", note: "Gone for good. JARs are no longer pack200-compressed." }
    ]
  },

  /* ============================================ JAVA 15 */
  {
    version: 15,
    date: "September 15, 2020",
    codename: null,
    lts: false,
    blurb: "Text blocks went final, sealed classes previewed, ZGC and Shenandoah graduated to production, and Nashorn was finally removed.",
    features: [
      {
        name: "Text blocks (final)",
        summary: "Triple-quoted strings, no preview flag required.",
        desc: "Promoted to a standard language feature after two previews. Supports new escape sequences (\\s, line-continuation \\) for fine-grained whitespace control.",
        tag: "language",
        code: {
          lang: "java",
          code: `String greeting = """
    Hello,
    \\sworld\\
    .\\
    """;
// "Hello,\\n world."

String json = """
    {
      "name": "%s",
      "age":  %d
    }
    """.formatted(name, age);`
        }
      },
      {
        name: "Sealed classes (preview)",
        summary: "Closed type hierarchies.",
        desc: "Restrict who can extend a class or implement an interface. Pairs with pattern matching to give the compiler enough info for exhaustive switch checks. Finalized in 17.",
        tag: "preview",
        code: {
          lang: "java",
          code: `public sealed interface Shape
        permits Circle, Square, Triangle {}

public record Circle(double r)        implements Shape {}
public record Square(double side)     implements Shape {}
public record Triangle(double b, double h) implements Shape {}

// Non-permitted subclass = compile error
// public class Hexagon implements Shape {} // ERROR`
        }
      },
      {
        name: "ZGC & Shenandoah → production",
        summary: "Low-pause collectors leave experimental.",
        desc: "Both ZGC and Shenandoah are now supported, production-grade GC choices. ZGC targets very large heaps and sub-ms pauses; Shenandoah targets consistent low pauses across heap sizes.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `$ java -XX:+UseZGC        -Xmx32g MyApp
$ java -XX:+UseShenandoahGC -Xmx16g MyApp

# No more -XX:+UnlockExperimentalVMOptions required.`
        }
      },
      {
        name: "EdDSA cryptography",
        summary: "Edwards-Curve digital signatures.",
        desc: "Ed25519 and Ed448 signature algorithms added to the standard Java crypto provider. Modern, deterministic signing without pulling in BouncyCastle.",
        tag: "api",
        code: {
          lang: "java",
          code: `KeyPairGenerator kpg = KeyPairGenerator.getInstance("Ed25519");
KeyPair kp = kpg.generateKeyPair();

Signature sig = Signature.getInstance("Ed25519");
sig.initSign(kp.getPrivate());
sig.update("hello".getBytes(UTF_8));
byte[] signature = sig.sign();`
        }
      },
      {
        name: "Hidden classes",
        summary: "Framework-grade dynamic class loading.",
        desc: "A JVM mechanism for runtime-generated classes (think proxies, lambdas, scripting) that aren't discoverable via bytecode names. Replaces sun.misc.Unsafe.defineAnonymousClass.",
        tag: "jvm",
        code: {
          lang: "java",
          code: `byte[] bytes = generateBytecode();
Lookup lookup = MethodHandles.lookup();
Class<?> hidden = lookup
    .defineHiddenClass(bytes, true, ClassOption.NESTMATE)
    .lookupClass();`
        }
      }
    ],
    deprecations: [
      { what: "Nashorn JavaScript engine", kind: "removed", note: "Removed entirely. Use GraalJS for embedded JS — same javax.script SPI, modern ECMAScript support." },
      { what: "Biased locking", kind: "deprecated", note: "Old throughput optimization for uncontended locks. Disabled by default; eventually removed in 18." },
      { what: "RMI Activation", kind: "deprecated", note: "java.rmi.activation marked for removal — a rarely-used corner of RMI. Removed in Java 17." },
      { what: "Solaris and SPARC ports", kind: "removed", note: "Gone for good in 15." }
    ]
  },

  /* ============================================ JAVA 16 */
  {
    version: 16,
    date: "March 16, 2021",
    codename: null,
    lts: false,
    blurb: "Records and pattern-matching-for-instanceof both went final. The JDK itself moved off Mercurial to Git/GitHub, and JEP 396 strongly encapsulated all JDK internals by default.",
    features: [
      {
        name: "Records (final)",
        summary: "Promoted to a standard language feature.",
        desc: "After two previews, records are now a permanent part of Java. Used pervasively in modern APIs to model DTOs, value objects, and pattern-matchable carriers.",
        tag: "language",
        code: {
          lang: "java",
          code: `public record Money(BigDecimal amount, Currency currency) {
    public Money {
        Objects.requireNonNull(amount);
        Objects.requireNonNull(currency);
        if (amount.signum() < 0) throw new IllegalArgumentException();
    }

    public Money plus(Money other) {
        if (!currency.equals(other.currency))
            throw new IllegalArgumentException("currency mismatch");
        return new Money(amount.add(other.amount), currency);
    }
}`
        }
      },
      {
        name: "Pattern matching for instanceof (final)",
        summary: "Type test + bind, now standard.",
        desc: "Standardized after two previews; the foundation for the larger pattern-matching story coming in 17/21.",
        tag: "language",
        code: {
          lang: "java",
          code: `public String describe(Object o) {
    if (o instanceof Integer i)        return "int "      + i;
    if (o instanceof Long    l)        return "long "     + l;
    if (o instanceof String  s && !s.isBlank())
                                       return "string \\"" + s + "\\"";
    return "unknown";
}`
        }
      },
      {
        name: "Unix-domain socket channels",
        summary: "AF_UNIX in NIO.",
        desc: "SocketChannel and ServerSocketChannel now support Unix-domain sockets on Linux, macOS, and Windows. Useful for low-latency local IPC: container sidecars, Docker, PostgreSQL.",
        tag: "api",
        code: {
          lang: "java",
          code: `Path socket = Path.of("/tmp/myapp.sock");

try (ServerSocketChannel server = ServerSocketChannel
        .open(StandardProtocolFamily.UNIX)) {
    server.bind(UnixDomainSocketAddress.of(socket));
    SocketChannel client = server.accept();
    // ...
}`
        }
      },
      {
        name: "Strong encapsulation of JDK internals",
        summary: "Goodbye, sun.misc.Unsafe (for most callers).",
        desc: "JEP 396 flips the default: internal JDK APIs (sun.*, com.sun.*) are now strongly encapsulated. Existing --illegal-access escape hatches still work, but the long deprecation is approaching its end.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `# Old escape hatches still exist, but discouraged:
$ java --add-opens java.base/sun.nio.ch=ALL-UNNAMED -jar app.jar

# Better: migrate to public APIs. Most former sun.misc.Unsafe uses
# now have public equivalents in java.lang.invoke.VarHandle and
# java.lang.foreign (since 19+).`
        }
      },
      {
        name: "Stream.toList()",
        summary: "The collector you actually wanted.",
        desc: "Returns an unmodifiable list — no .collect(Collectors.toList()) and no remembering whether the result is mutable. Returns null-tolerant unlike List.of.",
        tag: "api",
        before: {
          lang: "java",
          code: `List<String> upper = names.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());`
        },
        after: {
          lang: "java",
          code: `List<String> upper = names.stream()
    .map(String::toUpperCase)
    .toList();   // unmodifiable, allows nulls`
        }
      }
    ],
    deprecations: [
      { what: "Mercurial → Git", kind: "tooling", note: "OpenJDK migrated from Mercurial to git.openjdk.java.net and GitHub. Affects contributors, not consumers." },
      { what: "ZipFileSystem warning", kind: "behavior change", note: "Older ZIP-FS bugs around encoding fixed; double-check any code that hand-tuned zip path handling." }
    ]
  },

  /* ============================================ JAVA 17 */
  {
    version: 17,
    date: "September 14, 2021",
    codename: null,
    lts: true,
    blurb: "The second cadence-era LTS, and where most enterprise codebases consolidated. Sealed classes went final; pattern matching for switch began its preview tour.",
    features: [
      {
        name: "Sealed classes (final)",
        summary: "Closed hierarchies, standardized.",
        desc: "Standardized after two previews. With sealed types plus records, Java now has algebraic data types — and pattern matching can reason about them exhaustively.",
        tag: "language",
        code: {
          lang: "java",
          code: `public sealed interface Json
        permits JString, JNumber, JBool, JNull, JArray, JObject {}

public record JString(String value)              implements Json {}
public record JNumber(double value)              implements Json {}
public record JBool  (boolean value)             implements Json {}
public record JNull  ()                          implements Json {}
public record JArray (List<Json> items)          implements Json {}
public record JObject(Map<String, Json> fields)  implements Json {}`
        }
      },
      {
        name: "Pattern matching for switch (preview)",
        summary: "Switch grows type patterns.",
        desc: "Switch can now match on the runtime type of a value, bind a typed variable, and (with sealed types) be checked for exhaustiveness. Finalized in Java 21.",
        tag: "preview",
        code: {
          lang: "java",
          code: `String describe(Json j) {
    return switch (j) {
        case JString s   -> "string of length " + s.value().length();
        case JNumber n   -> "number " + n.value();
        case JBool   b   -> b.value() ? "true" : "false";
        case JNull   __  -> "null";
        case JArray  a   -> "array(" + a.items().size() + ")";
        case JObject o   -> "object{" + o.fields().keySet() + "}";
    };
}`
        }
      },
      {
        name: "Foreign Function & Memory API (incubator)",
        summary: "Project Panama lands as an incubator.",
        desc: "A safer, lower-overhead alternative to JNI for calling native code and managing off-heap memory. Iterated through several incubator releases; finalized in Java 22.",
        tag: "preview",
        code: {
          lang: "java",
          code: `// Incubator API — names changed before final form in 22
try (var arena = ResourceScope.newConfinedScope()) {
    MemorySegment buf = MemorySegment.allocateNative(1024, arena);
    // ... pass to native call via CLinker
}`
        }
      },
      {
        name: "Strict floating-point, restored",
        summary: "strictfp is the default again.",
        desc: "Modern x86 CPUs no longer need the speed-vs-determinism trade-off the JVM made in 1.2. All floating-point evaluation is now strictly IEEE 754 by default; the strictfp keyword is now a no-op.",
        tag: "jvm",
        code: {
          lang: "java",
          code: `// Pre-17: needed strictfp for deterministic FP across platforms
public strictfp class Calc { /* ... */ }

// Java 17+: same behavior, no keyword required.
public class Calc {
    public double mul(double a, double b) { return a * b; }
}`
        }
      },
      {
        name: "Enhanced pseudo-random number generators",
        summary: "A proper API for modern PRNG algorithms.",
        desc: "java.util.random.RandomGenerator unifies Random, SecureRandom, SplittableRandom, and adds modern algorithms like LXM, Xoroshiro, and L128X1024MixRandom — selectable by name.",
        tag: "api",
        code: {
          lang: "java",
          code: `RandomGenerator rng = RandomGeneratorFactory
    .of("L64X128MixRandom")
    .create(42L);

DoubleStream samples = rng.doubles(1_000_000, 0.0, 1.0);
double mean = samples.average().orElse(0);`
        }
      }
    ],
    deprecations: [
      { what: "Security Manager", kind: "deprecated for removal", note: "Set on a removal path; finally removed in Java 24. Migrate sandboxing to OS-level isolation (containers, seccomp, etc.)." },
      { what: "Applet API", kind: "deprecated for removal", note: "Officially marked for removal. Browsers killed Java plugins years ago; the API itself was removed in 21." },
      { what: "RMI Activation", kind: "removed", note: "java.rmi.activation gone for good." },
      { what: "Floating-Point modifier strictfp", kind: "obsolete", note: "Still allowed for source-compat, but a no-op. Safe to delete." }
    ]
  },

  /* ============================================ JAVA 18 */
  {
    version: 18,
    date: "March 22, 2022",
    codename: null,
    lts: false,
    blurb: "UTF-8 became the platform default. A tiny built-in web server made demos and tests easier. Pattern matching for switch took its second preview.",
    features: [
      {
        name: "UTF-8 by default",
        summary: "file.encoding=UTF-8 everywhere.",
        desc: "Standard Java APIs now default to UTF-8 instead of the platform encoding. Removes a long-standing source of cross-platform surprise — files written on Windows no longer mis-decode on Linux.",
        tag: "jvm",
        before: {
          lang: "java",
          code: `// Pre-18: same code, different result on Windows vs Linux
new FileReader("data.txt");                 // platform default
new FileWriter("out.txt");                  // platform default
new String(Files.readAllBytes(p));          // platform default`
        },
        after: {
          lang: "java",
          code: `// Java 18+: UTF-8 unless overridden by -Dfile.encoding=...
new FileReader("data.txt");                 // UTF-8
new FileWriter("out.txt");                  // UTF-8
new String(Files.readAllBytes(p));          // UTF-8

// Want the old behavior?
//   java -Dfile.encoding=COMPAT MyApp`
        }
      },
      {
        name: "Simple Web Server",
        summary: "jwebserver — a one-shot static file server.",
        desc: "A minimal HTTP server bundled with the JDK and runnable via the jwebserver command. Built for demos, prototypes, ad-hoc file sharing, and offline docs — not production.",
        tag: "tooling",
        code: {
          lang: "shell",
          code: `$ cd ./docs
$ jwebserver -p 8000
Binding to loopback by default. For all interfaces use "-b 0.0.0.0".
Serving /Users/me/docs and subdirectories on 127.0.0.1 port 8000
URL http://127.0.0.1:8000/`
        }
      },
      {
        name: "Code snippets in Javadoc",
        summary: "@snippet for runnable doc examples.",
        desc: "An @snippet tag in Javadoc that supports syntax highlighting, region markers, and external snippet files — so your docs and your tests can reference the same source.",
        tag: "tooling",
        code: {
          lang: "java",
          code: `/**
 * Computes the area of a circle.
 *
 * {@snippet :
 *   double area = circleArea(2.0);  // @highlight regex='area'
 *   assert area > 12.5 && area < 12.6;
 * }
 */
public static double circleArea(double r) {
    return Math.PI * r * r;
}`
        }
      },
      {
        name: "Internet-Address Resolution SPI",
        summary: "Pluggable host-name resolution.",
        desc: "A service-provider interface for InetAddress lookups. Lets frameworks plug in custom resolvers — useful for mocking DNS in tests, using DNS-over-HTTPS, or service-discovery integrations.",
        tag: "api",
        code: {
          lang: "java",
          code: `// SPI: implement InetAddressResolverProvider
public class CustomResolverProvider extends InetAddressResolverProvider {
    @Override
    public InetAddressResolver get(Configuration cfg) {
        return new InetAddressResolver() {
            @Override
            public Stream<InetAddress> lookupByName(String host, LookupPolicy p) {
                return Stream.of(/* custom logic */);
            }
            // ... lookupByAddress
        };
    }
    @Override public String name() { return "custom"; }
}`
        }
      }
    ],
    deprecations: [
      { what: "Thread.stop / suspend / resume", kind: "deprecated for removal", note: "Always unsafe; setting the gravestone. Use interruption + cooperative cancellation." },
      { what: "Finalization", kind: "deprecated for removal", note: "Object.finalize() set on a removal path. Use try-with-resources and Cleaner for cleanup." }
    ]
  },

  /* ============================================ JAVA 19 */
  {
    version: 19,
    date: "September 20, 2022",
    codename: null,
    lts: false,
    blurb: "The big preview release for Project Loom: virtual threads and structured concurrency both landed as previews. Stream gatherers' precursor APIs began to take shape.",
    features: [
      {
        name: "Virtual threads (preview)",
        summary: "Cheap, scalable threads — finally.",
        desc: "JVM-managed user-mode threads with tiny stacks and no fixed thread-per-task mapping. Blocking I/O parks the carrier thread, not the OS one. Finalized in Java 21.",
        tag: "preview",
        before: {
          lang: "java",
          code: `// Pool of platform threads — backpressure by OS thread count
ExecutorService pool = Executors.newFixedThreadPool(200);
for (int i = 0; i < 10_000; i++) {
    pool.submit(() -> handle(i));   // queues, can starve
}`
        },
        after: {
          lang: "java",
          code: `// One virtual thread per task — millions are fine
try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 10_000; i++) {
        exec.submit(() -> handle(i));
    }
}

Thread vt = Thread.ofVirtual().start(() -> handle(0));`
        }
      },
      {
        name: "Structured concurrency (incubator)",
        summary: "Treat concurrent code like a structured block.",
        desc: "StructuredTaskScope ties the lifetimes of child tasks to a syntactic scope, similar to try-with-resources. Cancellation, error propagation, and timeouts get cleaner shape.",
        tag: "preview",
        code: {
          lang: "java",
          code: `try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Supplier<User>  user  = scope.fork(() -> fetchUser(id));
    Supplier<Order> order = scope.fork(() -> fetchOrder(id));

    scope.join();           // wait for both
    scope.throwIfFailed();  // propagate any error

    return new Profile(user.get(), order.get());
}`
        }
      },
      {
        name: "Pattern matching for switch (3rd preview)",
        summary: "Approaching final shape.",
        desc: "Refinements toward the final feature shipped in 21: guarded patterns moved into the case label with when, and null became matchable as a case.",
        tag: "preview",
        code: {
          lang: "java",
          code: `String describe(Object obj) {
    return switch (obj) {
        case null              -> "null";
        case Integer i when i < 0 -> "negative int " + i;
        case Integer i         -> "non-negative int " + i;
        case String s          -> "string of length " + s.length();
        default                -> obj.getClass().getSimpleName();
    };
}`
        }
      },
      {
        name: "Record patterns (preview)",
        summary: "Destructure records inline.",
        desc: "Decompose a record into its components within a pattern. Combined with switch, you get type-safe ML-style ADT pattern matching. Finalized in 21.",
        tag: "preview",
        code: {
          lang: "java",
          code: `record Point(int x, int y) {}
record Line(Point from, Point to) {}

if (shape instanceof Line(Point(var x1, var y1),
                          Point(var x2, var y2))) {
    double len = Math.hypot(x2 - x1, y2 - y1);
}`
        }
      }
    ],
    deprecations: [
      { what: "Locale-related defaults", kind: "behavior change", note: "Continued cleanup; double-check date/number formatting on locale-sensitive paths." }
    ]
  },

  /* ============================================ JAVA 20 */
  {
    version: 20,
    date: "March 21, 2023",
    codename: null,
    lts: false,
    blurb: "A bridge release between Loom's previews and the Java 21 LTS finalizations. Scoped values appeared as an incubator alternative to ThreadLocal.",
    features: [
      {
        name: "Scoped values (incubator)",
        summary: "Immutable per-thread context, virtual-thread-friendly.",
        desc: "An alternative to ThreadLocal designed for the era of virtual threads: bind a value for a lexical scope, share it with child tasks via structured concurrency, and avoid the unbounded memory growth of TL-per-thread.",
        tag: "preview",
        code: {
          lang: "java",
          code: `private static final ScopedValue<User> CURRENT_USER = ScopedValue.newInstance();

void handle(Request req) {
    User u = authenticate(req);
    ScopedValue.where(CURRENT_USER, u).run(() -> {
        // anywhere inside this lambda, even across virtual-thread forks:
        process(req);
    });
}

void process(Request req) {
    User u = CURRENT_USER.get();   // never null inside a where(...)
    // ...
}`
        }
      },
      {
        name: "Virtual threads (2nd preview)",
        summary: "Refinements toward final.",
        desc: "More monitoring hooks, JFR events, and small behavioral tweaks ahead of the 21 finalization. By 20, frameworks like Helidon Níma and Vert.x had public previews running on virtual threads.",
        tag: "preview",
        code: {
          lang: "java",
          code: `// Picking carrier thread parallelism (advanced):
//   -Djdk.virtualThreadScheduler.parallelism=8

Thread.startVirtualThread(() -> {
    try { Thread.sleep(Duration.ofMillis(50)); }
    catch (InterruptedException e) { /* ... */ }
    System.out.println(Thread.currentThread());
    // VirtualThread[#42]/runnable@ForkJoinPool-1-worker-3
});`
        }
      },
      {
        name: "Pattern matching for switch (4th preview)",
        summary: "Settling syntax.",
        desc: "Mostly grammar finalizations and edge cases. Parenthesized patterns were removed in favor of the simpler form that shipped final in 21.",
        tag: "preview",
        code: {
          lang: "java",
          code: `static int describe(Object obj) {
    return switch (obj) {
        case Integer i  -> i;
        case Long    l  -> (int) (long) l;
        case Double  d  -> d.intValue();
        case String  s  -> Integer.parseInt(s);
        default         -> -1;
    };
}`
        }
      },
      {
        name: "Foreign Function & Memory (2nd preview)",
        summary: "Panama API converges on its final shape.",
        desc: "Arena replaces the older ResourceScope; layouts and downcall handles became more ergonomic. Finalized in Java 22.",
        tag: "preview",
        code: {
          lang: "java",
          code: `try (Arena arena = Arena.ofConfined()) {
    MemorySegment buf = arena.allocate(64);
    buf.setString(0, "hello");
    System.out.println(buf.getString(0));
}`
        }
      }
    ],
    deprecations: [
      { what: "jdk.incubator.foreign", kind: "removed", note: "The incubator FFM package is gone in favor of the java.lang.foreign preview." }
    ]
  },

  /* ============================================ JAVA 21 */
  {
    version: 21,
    date: "September 19, 2023",
    codename: null,
    lts: true,
    blurb: "A landmark LTS. Virtual threads, pattern matching for switch, and record patterns all went final — the last decade of Amber and Loom previews crystallized into the language.",
    features: [
      {
        name: "Virtual threads (final)",
        summary: "Loom lands.",
        desc: "The biggest concurrency change since java.util.concurrent. Frameworks can drop reactive workarounds for plain blocking-style code and still scale to hundreds of thousands of concurrent operations.",
        tag: "language",
        code: {
          lang: "java",
          code: `// Concurrent fetch of N URLs — one virtual thread each
List<String> bodies;
try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
    bodies = urls.stream()
        .map(u -> exec.submit(() -> http.send(get(u), ofString()).body()))
        .map(f -> { try { return f.get(); } catch (Exception e) { throw new RuntimeException(e); } })
        .toList();
}`
        }
      },
      {
        name: "Pattern matching for switch (final)",
        summary: "Type patterns, guards, exhaustiveness — done.",
        desc: "Sealed types + records + switch patterns give Java algebraic-data-type-style modeling with compile-time exhaustiveness. This is the form to write to.",
        tag: "language",
        code: {
          lang: "java",
          code: `sealed interface Shape permits Circle, Square, Triangle {}
record Circle(double r)            implements Shape {}
record Square(double side)         implements Shape {}
record Triangle(double b, double h) implements Shape {}

static double area(Shape s) {
    return switch (s) {
        case Circle   c             -> Math.PI * c.r() * c.r();
        case Square(double side)    -> side * side;
        case Triangle t when t.b() > 0 -> 0.5 * t.b() * t.h();
        case Triangle __            -> 0;
    };
}`
        }
      },
      {
        name: "Record patterns (final)",
        summary: "Nested destructuring, standardized.",
        desc: "Records can be deconstructed in instanceof and switch patterns, including nested records. Combined with sealed types, it's structural pattern matching done in Java's own idiom.",
        tag: "language",
        code: {
          lang: "java",
          code: `record Pair<A, B>(A first, B second) {}

Object o = new Pair<>(new Point(1, 2), "tag");
if (o instanceof Pair<?, ?>(Point(int x, int y), String s)) {
    System.out.printf("(%d, %d) → %s%n", x, y, s);
}`
        }
      },
      {
        name: "Sequenced collections",
        summary: "First, last, reversed — for any ordered collection.",
        desc: "New interfaces (SequencedCollection / SequencedSet / SequencedMap) give every order-bearing collection a uniform API for first/last access and reversed views — eliminating per-collection .get(0) / .getFirst() inconsistencies.",
        tag: "api",
        code: {
          lang: "java",
          code: `SequencedCollection<String> xs = new ArrayList<>(List.of("a","b","c"));
xs.getFirst();      // "a"
xs.getLast();       // "c"
xs.addFirst("zero");
xs.reversed();      // view, not a copy

SequencedMap<String,Integer> m = new LinkedHashMap<>();
m.putFirst("a", 1);
m.firstEntry();     // a=1`
        }
      },
      {
        name: "String templates (preview)",
        summary: "Safer interpolation, opt-in processors.",
        desc: "A template-literal-like syntax that channels values through a processor (STR, FMT, …) instead of raw concatenation, enabling safe SQL/HTML/JSON construction. Withdrawn in 23 — see Java 25's revival.",
        tag: "preview",
        code: {
          lang: "java",
          code: `String name = "Ada";
int    age  = 36;

// STR: simple interpolation
String s = STR."\\{name} is \\{age} years old";

// FMT: printf-style formats
String f = FMT."\\{name}%-10s is \\{age}%3d years old";`
        }
      },
      {
        name: "Generational ZGC",
        summary: "Young-old generation split for ZGC.",
        desc: "ZGC gains a generational mode (off by default) that significantly improves throughput on workloads with high allocation rates by collecting short-lived objects more aggressively.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `$ java -XX:+UseZGC -XX:+ZGenerational -Xmx16g MyApp`
        }
      }
    ],
    deprecations: [
      { what: "Applet API", kind: "removed", note: "java.applet finally gone after a decade of obsolescence." },
      { what: "Thread suspend/resume", kind: "removed", note: "The deadlock-prone Thread.suspend / Thread.resume methods are gone." },
      { what: "Windows 32-bit x86 port", kind: "deprecated for removal", note: "32-bit Windows builds set for removal — virtual threads need a 64-bit host." },
      { what: "Parallel-class-loading workarounds", kind: "behavior change", note: "Class loaders now parallel-capable by default. Custom CLs may need updates." }
    ]
  },

  /* ============================================ JAVA 22 */
  {
    version: 22,
    date: "March 19, 2024",
    codename: null,
    lts: false,
    blurb: "Unnamed variables landed final; the Foreign Function & Memory API finally exited preview after seven incubations; statements-before-super(...) loosened constructor rules.",
    features: [
      {
        name: "Unnamed variables and patterns",
        summary: "_ for the values you don't care about.",
        desc: "Underscore is now legal again — as a name for a variable, pattern, or catch parameter you intend to ignore. Pairs perfectly with record patterns: you can deconstruct without naming every component.",
        tag: "language",
        before: {
          lang: "java",
          code: `for (Map.Entry<String, Integer> e : counts.entrySet()) {
    String unusedKey = e.getKey();   // boilerplate name
    process(e.getValue());
}

try { /* ... */ }
catch (IOException ignored) { /* ... */ }`
        },
        after: {
          lang: "java",
          code: `for (var _ : counts.entrySet()) {        // I don't even need .getValue
    counter.increment();
}

if (obj instanceof Pair<Integer, String>(int n, _)) {
    System.out.println(n);                // ignore the String
}

try { /* ... */ }
catch (IOException _) { /* ... */ }`
        }
      },
      {
        name: "Foreign Function & Memory API (final)",
        summary: "Panama, standardized.",
        desc: "Call native libraries and manage off-heap memory without JNI. Arena scopes deterministically free native memory; downcall handles bind to native symbols by name.",
        tag: "api",
        code: {
          lang: "java",
          code: `Linker  linker = Linker.nativeLinker();
SymbolLookup libc = linker.defaultLookup();

MethodHandle strlen = linker.downcallHandle(
    libc.find("strlen").orElseThrow(),
    FunctionDescriptor.of(ValueLayout.JAVA_LONG, ValueLayout.ADDRESS));

try (Arena arena = Arena.ofConfined()) {
    MemorySegment cStr = arena.allocateUtf8String("Hello, native!");
    long n = (long) strlen.invoke(cStr);
}`
        }
      },
      {
        name: "Statements before super(...) / this(...)",
        summary: "Validate constructor args before calling super.",
        desc: "Constructors can now contain statements before the explicit constructor invocation, as long as those statements don't reference this. Useful for argument validation and transformation without throwing inside the super call.",
        tag: "preview",
        before: {
          lang: "java",
          code: `public PositiveBigInt(long value) {
    super(value < 0
        ? -value   // hacky: had to validate inside the super call
        : value);
    // would throw too late
}`
        },
        after: {
          lang: "java",
          code: `public PositiveBigInt(long value) {
    if (value < 0)
        throw new IllegalArgumentException("must be positive");
    var bytes = BigInteger.valueOf(value).toByteArray();
    super(bytes);
}`
        }
      },
      {
        name: "Stream gatherers (preview)",
        summary: "Build your own intermediate stream operations.",
        desc: "Gatherer is the long-awaited counterpart to Collector for intermediate ops. Lets you implement custom windowing, debouncing, scan, and other stateful streaming patterns without leaving the Stream pipeline.",
        tag: "preview",
        code: {
          lang: "java",
          code: `// Sliding window of size 3
List<List<Integer>> windows = Stream.of(1, 2, 3, 4, 5, 6)
    .gather(Gatherers.windowSliding(3))
    .toList();
// [[1,2,3], [2,3,4], [3,4,5], [4,5,6]]

// Custom: running sum
Gatherer<Integer, ?, Integer> runningSum = Gatherer.ofSequential(
    () -> new int[1],
    (state, elem, downstream) -> {
        state[0] += elem;
        return downstream.push(state[0]);
    });`
        }
      },
      {
        name: "Class-file API (preview)",
        summary: "Bytecode manipulation, in the JDK.",
        desc: "A standard, JDK-owned API for reading and writing .class files. Aims to replace ASM as the canonical choice for instrumentation, code generation, and bytecode tooling.",
        tag: "preview",
        code: {
          lang: "java",
          code: `byte[] bytes = ClassFile.of().build(
    ClassDesc.of("HelloWorld"),
    classBuilder -> classBuilder
        .withVersion(ClassFile.JAVA_22_VERSION, 0)
        .withMethod("main", MethodTypeDesc.of(CD_void, CD_String.arrayType()),
            ClassFile.ACC_PUBLIC | ClassFile.ACC_STATIC,
            mb -> mb.withCode(cb -> cb
                .getstatic(CD_System, "out", CD_PrintStream)
                .ldc("Hello, world")
                .invokevirtual(CD_PrintStream, "println", MethodTypeDesc.of(CD_void, CD_String))
                .return_())));`
        }
      }
    ],
    deprecations: [
      { what: "32-bit x86 port (Windows)", kind: "removed", note: "Windows x86 builds removed; only 64-bit remains." },
      { what: "Old GC flags", kind: "obsolete", note: "Several long-deprecated GC tuning flags removed or made no-ops." }
    ]
  },

  /* ============================================ JAVA 23 */
  {
    version: 23,
    date: "September 17, 2024",
    codename: null,
    lts: false,
    blurb: "String templates withdrew for a redesign; primitive patterns and module imports previewed. ZGC's non-generational mode was deprecated, signaling the generational variant as default.",
    features: [
      {
        name: "Primitive types in patterns (preview)",
        summary: "Patterns extend to int, long, double, …",
        desc: "instanceof and switch can match primitive type patterns, enabling pattern-based casts and exhaustiveness checks over primitives without autoboxing.",
        tag: "preview",
        code: {
          lang: "java",
          code: `static String fmt(Number n) {
    return switch (n) {
        case int i when i < 0  -> "negative int " + i;
        case int i             -> "int " + i;
        case long l            -> "long " + l;
        case double d          -> "double " + d;
        default                -> n.toString();
    };
}`
        }
      },
      {
        name: "Module imports (preview)",
        summary: "import module M; one line, every package.",
        desc: "Reduces the import wall in scripts and small programs by importing every exported package of a module in a single statement. Pairs with the simple source launcher.",
        tag: "preview",
        code: {
          lang: "java",
          code: `import module java.base;
import module java.net.http;

void main() {
    var client = HttpClient.newHttpClient();
    var req    = HttpRequest.newBuilder(URI.create("https://example.com")).build();
    var body   = client.send(req, HttpResponse.BodyHandlers.ofString()).body();
    IO.println(body);
}`
        }
      },
      {
        name: "Implicitly-declared classes and instance main (preview)",
        summary: "Java without the public class scaffold.",
        desc: "For learning and scripting: drop a method named main into a file and run it. No class declaration, no String[] args, no static. Combines with module imports for friction-free single-file Java.",
        tag: "preview",
        before: {
          lang: "java",
          code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world");
    }
}`
        },
        after: {
          lang: "java",
          code: `void main() {
    System.out.println("Hello, world");
}`
        }
      },
      {
        name: "Markdown in Javadoc",
        summary: "Javadoc comments accept Markdown.",
        desc: "Triple-slash Javadoc lines are rendered as Markdown — code fences, lists, tables. The old @tags still work, but you no longer need <p> and <pre> for basic formatting.",
        tag: "tooling",
        code: {
          lang: "java",
          code: `/// Computes the **factorial** of \`n\`.
///
/// - Returns 1 for \`n == 0\`
/// - Throws for negative input
///
/// \`\`\`java
/// factorial(5) == 120
/// \`\`\`
public static long factorial(int n) { /* ... */ }`
        }
      },
      {
        name: "Z Generational by default",
        summary: "Generational ZGC takes the wheel.",
        desc: "ZGC's generational mode (introduced in 21 as opt-in) is now the default when -XX:+UseZGC is selected. Non-generational mode remains via a deprecation flag.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `$ java -XX:+UseZGC MyApp                         # generational by default
$ java -XX:+UseZGC -XX:-ZGenerational MyApp      # opt out (deprecated)`
        }
      }
    ],
    deprecations: [
      { what: "String templates", kind: "withdrawn", note: "Removed from preview pending redesign. The 21–22 STR.\"...\" syntax stops compiling. Revived form returned later in the cycle." },
      { what: "Non-generational ZGC", kind: "deprecated", note: "Off-by-default since 23 default flip. Plan to remove the legacy mode in a later release." }
    ]
  },

  /* ============================================ JAVA 24 */
  {
    version: 24,
    date: "March 18, 2025",
    codename: null,
    lts: false,
    blurb: "Stream gatherers shipped final. The Security Manager was finally removed after years on the deprecation path. Key encapsulation mechanisms previewed for post-quantum crypto.",
    features: [
      {
        name: "Stream gatherers (final)",
        summary: "User-defined intermediate stream operations.",
        desc: "Gatherers stabilized after two previews. The built-in Gatherers utility supplies fold, scan, mapConcurrent, windowFixed, and windowSliding; you can write your own with one builder call.",
        tag: "api",
        code: {
          lang: "java",
          code: `// Concurrent map with bounded parallelism — order preserved
List<Page> pages = urls.stream()
    .gather(Gatherers.mapConcurrent(8, http::fetch))
    .toList();

// Fold: running maximum
List<Integer> runningMax = Stream.of(3, 1, 4, 1, 5, 9, 2, 6)
    .gather(Gatherers.scan(() -> Integer.MIN_VALUE, Math::max))
    .toList();
// [3, 3, 4, 4, 5, 9, 9, 9]`
        }
      },
      {
        name: "Class-file API (final)",
        summary: "Standard bytecode I/O.",
        desc: "The official JDK API for reading and writing class files is now standard. Frameworks (Spring's CGLIB replacement, instrumentation agents, build tools) can drop ASM in favor of the platform offering.",
        tag: "api",
        code: {
          lang: "java",
          code: `var cf = ClassFile.of();
ClassModel cm = cf.parse(Path.of("MyClass.class"));

for (MethodModel m : cm.methods()) {
    System.out.println(m.methodName() + m.methodType());
}`
        }
      },
      {
        name: "Compact object headers (experimental)",
        summary: "Smaller objects, lower GC pressure.",
        desc: "Project Lilliput: reduces object header size from 12/16 bytes to 8. On heap-heavy workloads, can shave 10–20% off footprint and improve cache density. Experimental in 24.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `$ java -XX:+UnlockExperimentalVMOptions \\
       -XX:+UseCompactObjectHeaders \\
       -Xmx8g \\
       MyApp`
        }
      },
      {
        name: "ML-KEM & ML-DSA",
        summary: "Post-quantum crypto in the standard library.",
        desc: "Module-Lattice-based Key-Encapsulation Mechanism (FIPS 203) and Digital Signature Algorithm (FIPS 204), the first NIST-standardized post-quantum primitives, now ship in the standard provider.",
        tag: "api",
        code: {
          lang: "java",
          code: `// Key encapsulation
KeyPairGenerator kpg = KeyPairGenerator.getInstance("ML-KEM");
kpg.initialize(NamedParameterSpec.ML_KEM_768);
KeyPair kp = kpg.generateKeyPair();

KEM kem = KEM.getInstance("ML-KEM");
KEM.Encapsulator enc = kem.newEncapsulator(kp.getPublic());
KEM.Encapsulated encap = enc.encapsulate();
// encap.encapsulation() is sent to the receiver
// encap.key() is the shared secret on the sender side`
        }
      },
      {
        name: "Ahead-of-Time class loading (experimental)",
        summary: "Pre-load + pre-link classes for faster startup.",
        desc: "Building on CDS, this JEP records and replays not just class metadata but also pre-linked, pre-loaded class state. Trim seconds off cold-start in containerized deployments.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `# 1. Record
$ java -XX:AOTMode=record -XX:AOTConfiguration=app.aotconf -jar app.jar
# 2. Create cache
$ java -XX:AOTMode=create -XX:AOTConfiguration=app.aotconf \\
       -XX:AOTCache=app.aot -jar app.jar
# 3. Run
$ java -XX:AOTCache=app.aot -jar app.jar`
        }
      }
    ],
    deprecations: [
      { what: "Security Manager", kind: "removed", note: "SecurityManager and AccessController gone for good. Migrate sandboxing to OS/container isolation or an external policy engine." },
      { what: "32-bit ARM port", kind: "deprecated", note: "armhf set on a removal path; 64-bit ARM (aarch64) is the path forward." },
      { what: "Memory-Access API legacy paths", kind: "obsolete", note: "Remaining traces of jdk.incubator.foreign cleared." }
    ]
  },

  /* ============================================ JAVA 25 */
  {
    version: 25,
    date: "September 16, 2025",
    codename: null,
    lts: true,
    blurb: "The newest LTS — and the cleanest snapshot of post-Loom, post-Amber Java. Module imports and compact source files went final; scoped values stabilized; PEM encoding got first-class API support.",
    features: [
      {
        name: "Compact source files & instance main (final)",
        summary: "void main() { } is now standard.",
        desc: "After three previews, implicitly-declared classes and instance main methods are a final language feature. New learners can write real Java without the public-static-void-main scaffold; scripters can ship .java files like shell scripts.",
        tag: "language",
        code: {
          lang: "java",
          code: `// Hello.java — that's the entire file
void main() {
    var name = System.getenv().getOrDefault("USER", "world");
    IO.println("Hello, " + name);
}

// $ java Hello.java
// Hello, ada`
        }
      },
      {
        name: "Module imports (final)",
        summary: "import module M; goes standard.",
        desc: "Single-statement bulk import of a module's exported packages. Pairs naturally with compact source files for friction-free single-file programs and scripts.",
        tag: "language",
        code: {
          lang: "java",
          code: `import module java.base;
import module java.net.http;

void main() throws Exception {
    var client = HttpClient.newHttpClient();
    var resp   = client.send(
        HttpRequest.newBuilder(URI.create("https://example.com")).build(),
        HttpResponse.BodyHandlers.ofString());
    IO.println(resp.body());
}`
        }
      },
      {
        name: "Scoped values (final)",
        summary: "The modern replacement for ThreadLocal.",
        desc: "Immutable, scoped, inheritable across structured task scopes — and dramatically cheaper than ThreadLocal in a virtual-thread world. The default mechanism for request-context propagation going forward.",
        tag: "api",
        code: {
          lang: "java",
          code: `static final ScopedValue<RequestId> REQ_ID = ScopedValue.newInstance();

void handle(HttpExchange ex) {
    var id = RequestId.fromHeader(ex);
    ScopedValue.where(REQ_ID, id).run(() -> {
        try (var scope = StructuredTaskScope.open()) {
            scope.fork(() -> fetchUser());      // REQ_ID is visible here
            scope.fork(() -> fetchInvoices());
            scope.join();
        }
    });
}`
        }
      },
      {
        name: "Structured concurrency (final)",
        summary: "Lifetime-scoped concurrent tasks.",
        desc: "StructuredTaskScope graduated from incubator. Tasks forked inside a scope are bounded by the scope; cancellation, timeout, and error propagation are first-class.",
        tag: "api",
        code: {
          lang: "java",
          code: `try (var scope = StructuredTaskScope.open(
        Joiner.<Result>anySuccessfulResultOrThrow(),
        cf -> cf.withTimeout(Duration.ofSeconds(2)))) {

    scope.fork(() -> primaryDb.read(key));
    scope.fork(() -> replicaDb.read(key));

    return scope.join();   // first success wins; rest are cancelled
}`
        }
      },
      {
        name: "PEM encoding / decoding API",
        summary: "Read keys and certs in two lines.",
        desc: "A standard java.security PEM API — finally. Decodes PKCS#8 keys, X.509 certs, and CSRs from -----BEGIN-style files without rolling your own Base64 decoder.",
        tag: "api",
        code: {
          lang: "java",
          code: `String pem = Files.readString(Path.of("cert.pem"));
X509Certificate cert = (X509Certificate)
    PEMDecoder.of().decode(pem, X509Certificate.class);

String back = PEMEncoder.of().encodeToString(cert);
Files.writeString(Path.of("cert.out.pem"), back);`
        }
      },
      {
        name: "Generational Shenandoah",
        summary: "Shenandoah catches up with generational ZGC.",
        desc: "Shenandoah gains a generational mode, mirroring ZGC's improvement: separating young from old objects to collect short-lived garbage more aggressively and reclaim memory faster.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `$ java -XX:+UseShenandoahGC \\
       -XX:ShenandoahGCMode=generational \\
       -Xmx16g \\
       MyApp`
        }
      }
    ],
    deprecations: [
      { what: "Non-generational ZGC", kind: "removed", note: "Legacy ZGC mode gone; -XX:+ZGenerational is now the only behavior under -XX:+UseZGC." },
      { what: "32-bit ARM port (Linux)", kind: "removed", note: "Linux armhf builds removed. Use aarch64." },
      { what: "Old String template syntax", kind: "absent", note: "The 21–22 STR.\"...\" syntax remains withdrawn pending a future redesign; don't rely on it." },
      { what: "Legacy locale data overrides", kind: "behavior change", note: "Final cleanup pass on locale data; verify locale-sensitive formatting if you've pinned older overrides." }
    ]
  }
];
