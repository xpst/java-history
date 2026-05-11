/* Java 19 — September 20, 2022 */
window.JAVA_DATA.push(
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
  }
);
