/* Java 13 — September 17, 2019 */
window.JAVA_DATA.push(
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
  }
);
