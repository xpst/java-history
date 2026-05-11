/* Java 10 — March 20, 2018 */
window.JAVA_DATA.push(
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
  }
);
