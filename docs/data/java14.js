/* Java 14 — March 17, 2020 */
window.JAVA_DATA.push(
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
  }
);
