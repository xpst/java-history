/* Java 9 — September 21, 2017 */
window.JAVA_DATA.push(
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
  }
);
