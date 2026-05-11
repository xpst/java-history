/* Java 11 — September 25, 2018 */
window.JAVA_DATA.push(
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
  }
);
