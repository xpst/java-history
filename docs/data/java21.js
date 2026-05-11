/* Java 21 — September 19, 2023 */
window.JAVA_DATA.push(
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
      { what: "Windows 32-bit x86 port", kind: "deprecated for removal", note: "32-bit Windows builds set for removal (JEP 449) — virtual threads need a 64-bit host. Actually removed in Java 25." }
    ]
  }
);
