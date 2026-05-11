/* Java 20 — March 21, 2023 */
window.JAVA_DATA.push(
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
    buf.setUtf8String(0, "hello");
    System.out.println(buf.getUtf8String(0));
}
// Note: setUtf8String / getUtf8String were renamed to setString / getString
// when FFM went final in Java 22.`
        }
      }
    ],
    deprecations: [
      { what: "jdk.incubator.foreign", kind: "removed", note: "The incubator FFM package is gone in favor of the java.lang.foreign preview." }
    ]
  }
);
