/* Java 25 — September 16, 2025 */
window.JAVA_DATA.push(
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
      { what: "Windows 32-bit x86 port", kind: "removed", note: "Windows x86 builds removed (JEP 479) after being deprecated for removal in 21. Use 64-bit Windows." },
      { what: "32-bit ARM port (Linux)", kind: "removed", note: "Linux armhf builds removed. Use aarch64." },
      { what: "Old String template syntax", kind: "absent", note: "The 21–22 STR.\"...\" syntax remains withdrawn pending a future redesign; don't rely on it." },
      { what: "Legacy locale data overrides", kind: "behavior change", note: "Final cleanup pass on locale data; verify locale-sensitive formatting if you've pinned older overrides." }
    ]
  }
);
