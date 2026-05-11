/* Java 16 — March 16, 2021 */
window.JAVA_DATA.push(
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
  }
);
