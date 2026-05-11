/* Java 26 — March 17, 2026 */
window.JAVA_DATA.push(
  {
    version: 26,
    date: "March 17, 2026",
    codename: null,
    lts: false,
    blurb: "The first release after the Java 25 LTS — 10 JEPs in all. HTTP/3 lands in the standard HttpClient, the AOT cache stops being GC-specific, G1 sheds synchronization overhead, and the Applet API is finally, conclusively gone. Project Amber and structured concurrency keep cooking in preview.",
    features: [
      {
        name: "HTTP/3 for HttpClient",
        summary: "java.net.http now speaks HTTP/3.",
        desc: "Opt-in HTTP/3 support in the standard HttpClient — same builder shape, one new .version(HTTP_3) call. HTTP/2 stays the default; HTTP/3 is enabled per-client or per-request. No new dependency, no third-party client needed.",
        tag: "api",
        before: {
          lang: "java",
          code: `// HTTP/2 (default) — unchanged
HttpClient client = HttpClient.newHttpClient();

HttpRequest request = HttpRequest.newBuilder(
        URI.create("https://example.com/"))
    .GET()
    .build();

HttpResponse<String> response = client.send(
    request, HttpResponse.BodyHandlers.ofString());`
        },
        after: {
          lang: "java",
          code: `// HTTP/3 — opt in on the client (or per-request)
HttpClient client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_3)
    .build();

HttpRequest request = HttpRequest.newBuilder(
        URI.create("https://example.com/"))
    .version(HttpClient.Version.HTTP_3)
    .GET()
    .build();

HttpResponse<String> response = client.send(
    request, HttpResponse.BodyHandlers.ofString());`
        }
      },
      {
        name: "AOT object caching with any GC",
        summary: "Project Leyden's AOT cache works under ZGC too.",
        desc: "The ahead-of-time cache introduced by Project Leyden was previously tied to specific garbage collectors and could not be used with ZGC. JEP 516 reworks the cache to load objects sequentially in a GC-agnostic format, so AOT-cached startup wins are available regardless of which collector you run with.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `# Generate an AOT cache, then run under ZGC — both now work
$ java -XX:AOTMode=record -XX:AOTConfiguration=app.aotconf -cp app.jar Main
$ java -XX:AOTMode=create -XX:AOTConfiguration=app.aotconf -XX:AOTCache=app.aot \\
       -cp app.jar Main

$ java -XX:+UseZGC -XX:AOTCache=app.aot -cp app.jar Main
# Previously: ZGC + AOT cache was incompatible. Now: fine.`
        }
      },
      {
        name: "G1: less synchronization, more throughput",
        summary: "Smaller write barriers, less GC/app contention.",
        desc: "G1 remains the default collector. JEP 522 reduces the synchronization between application threads and GC threads and shrinks the injected write-barrier code — net effect: better throughput on the same hardware, no user-visible API change, no flags to flip.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `# Nothing to opt into — G1 is still the default
$ java -XX:+UseG1GC -Xmx8g -jar app.jar

# JEP 522 is implementation-only. Expect throughput improvements
# on write-heavy workloads compared to JDK 25.`
        }
      },
      {
        name: "Primitive types in patterns (4th preview)",
        summary: "Pattern matching reaches primitives.",
        desc: "Pattern matching now spans the primitive/reference divide. instanceof and switch accept primitive type patterns, with safe-cast semantics — i instanceof byte b only matches when the int value fits. Switch over double/long/float gets case labels and guarded patterns just like reference types.",
        tag: "preview",
        code: {
          lang: "java",
          code: `// Primitive instanceof — checks range AND binds
int i = 127;
if (i instanceof byte b) {
    System.out.println("i fits in a byte: " + b);
}

// Switch on a primitive with patterns and guards
static String checkStatus(double temperature) {
    return switch (temperature) {
        case 0.0                   -> "Freezing";
        case 100.0                 -> "Boiling";
        case double d when d > 30  -> "Hot: " + d;
        case double d              -> "Normal: " + d;
    };
}

// javac --release 26 --enable-preview Main.java`
        }
      },
      {
        name: "Structured concurrency (6th preview)",
        summary: "Joiner gains onTimeout; results return as lists.",
        desc: "The sixth preview of StructuredTaskScope is a polish pass: Joiner.allSuccessfulOrThrow() now returns a List<T> directly instead of a stream of subtasks; anySuccessfulResultOrThrow() is renamed to anySuccessfulOrThrow(); Joiner gains an onTimeout() hook. The shape is otherwise unchanged from JDK 25.",
        tag: "preview",
        code: {
          lang: "java",
          code: `try (var scope = StructuredTaskScope.open(
        Joiner.<String>allSuccessfulOrThrow())) {

    scope.fork(() -> "Data from A");
    scope.fork(() -> "Data from B");

    // 6th-preview change: join() returns the joiner's result.
    // For allSuccessfulOrThrow that's a List<String> directly.
    List<String> results = scope.join();
    System.out.println(String.join(", ", results));
}`
        }
      },
      {
        name: "Lazy constants (2nd preview)",
        summary: "StableValue was renamed LazyConstant.",
        desc: "The thread-safe lazy-init primitive previewed as StableValue in JDK 25 (JEP 502) has been redesigned and renamed. Class is now java.lang.LazyConstant<T>, constructed via LazyConstant.of(Supplier) and dereferenced via .get(). The low-level orElseSet / setOrThrow / trySet methods are gone — the API is now firmly focused on the lazy-constant use case. Lazy list/map factories moved into java.util.List and java.util.Map.",
        tag: "preview",
        code: {
          lang: "java",
          code: `import java.lang.LazyConstant;

class OrderController {
    static final LazyConstant<Logger> LOG =
        LazyConstant.of(() -> Logger.create(OrderController.class));

    void submit(User u, List<Product> ps) {
        LOG.get().info("order started");   // supplier runs on first .get()
        // ...
        LOG.get().info("order submitted"); // subsequent calls return cached
    }
}

// javac --release 26 --enable-preview ...`
        }
      },
      {
        name: "PEM encodings (2nd preview)",
        summary: "Decode and encode PEM in two lines.",
        desc: "Second preview of the PEM API. PEMDecoder and PEMEncoder handle PKCS#8 keys, X.509 certificates, CSRs, and CRLs without rolling your own Base64. Iteration since the first preview tightens the parsing contract and the encoder defaults.",
        tag: "preview",
        code: {
          lang: "java",
          code: `String pem = Files.readString(Path.of("cert.pem"));

X509Certificate cert = PEMDecoder.of()
    .decode(pem, X509Certificate.class);

String back = PEMEncoder.of().encodeToString(cert);
Files.writeString(Path.of("cert.out.pem"), back);

// javac --release 26 --enable-preview ...`
        }
      },
      {
        name: "Vector API (11th incubator)",
        summary: "Still incubating, still gated by Valhalla.",
        desc: "Eleventh round of incubation for jdk.incubator.vector. Same shape — express SIMD computations portably; HotSpot picks the right vector instructions at runtime. Final standardization keeps waiting on Project Valhalla's value classes.",
        tag: "preview",
        code: {
          lang: "java",
          code: `import jdk.incubator.vector.*;

static final VectorSpecies<Float> SPECIES = FloatVector.SPECIES_PREFERRED;

void saxpy(float a, float[] x, float[] y) {
    int i = 0, upper = SPECIES.loopBound(x.length);
    for (; i < upper; i += SPECIES.length()) {
        var vx = FloatVector.fromArray(SPECIES, x, i);
        var vy = FloatVector.fromArray(SPECIES, y, i);
        vy.add(vx.mul(a)).intoArray(y, i);
    }
    for (; i < x.length; i++) y[i] += a * x[i];
}

// javac --add-modules jdk.incubator.vector ...`
        }
      },
      {
        name: "Prepare to make final mean final",
        summary: "Warnings now precede the lockdown.",
        desc: "Setting up integrity-by-default: JDK 26 issues runtime warnings when deep reflection (Field.setAccessible + Field.set) is used to mutate a final field. The warnings are advance notice — a future release will reject the mutation outright. Application authors can opt back in selectively where it's essential (e.g., serialization frameworks).",
        tag: "jvm",
        code: {
          lang: "java",
          code: `class C {
    final int x;
    C() { x = 100; }
}

Field f = C.class.getDeclaredField("x");
f.setAccessible(true);
C obj = new C();
f.set(obj, 200);   // ← JDK 26: warning. Future release: blocked.

// To re-enable for a specific module (e.g. serialization), opt in
// explicitly at startup; the default becomes "final means final".`
        }
      }
    ],
    deprecations: [
      { what: "Applet API (JEP 504)", kind: "removed", note: "java.applet (Applet, AppletContext, AppletStub, AudioClip), java.beans.AppletInitializer, and javax.swing.JApplet are gone. Deprecated for removal in JDK 17; browsers stopped supporting applets years ago." },
      { what: "Thread.stop()", kind: "removed", note: "Deprecated in JDK 1.2 (1998), deprecated for removal in JDK 18, neutered in JDK 20 to throw UnsupportedOperationException, and finally removed in JDK 26. Code calling it no longer compiles; older bytecode invoking it throws NoSuchMethodError." },
      { what: "MulticastSocket / DatagramSocketImpl legacy TTL methods", kind: "removed", note: "Removed: MulticastSocket.setTTL(byte)/getTTL()/send(DatagramPacket, byte) and DatagramSocketImpl.setTTL/getTTL. Use the int-based setTimeToLive / getTimeToLive instead (in place since JDK 1.2)." },
      { what: "java.net.SocketPermission", kind: "deprecated", note: "Deprecated for removal — useless now that the Security Manager is no longer supported." },
      { what: "Socket / ServerSocket / SocketImpl .setPerformancePreferences", kind: "deprecated", note: "Deprecated for removal. The 1.5-era hint methods have been no-ops in practice for a long time." },
      { what: "java.sql.SQLPermission", kind: "deprecated", note: "Deprecated for removal alongside SocketPermission for the same Security-Manager reason." }
    ]
  }
);
