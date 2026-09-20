/* Java 27 — September 15, 2026 */
window.JAVA_DATA.push(
  {
    version: 27,
    date: "September 15, 2026",
    codename: null,
    lts: false,
    blurb: "Nine JEPs, and not one of them a language change. Java 27 is a release about defaults: G1 becomes the collector on every machine, compact object headers switch on by themselves, and TLS 1.3 gets post-quantum hybrid key exchange without a line of code. Amber and Loom keep iterating behind the preview flag.",
    features: [
      {
        name: "G1 is the default collector everywhere",
        summary: "No more Serial-by-ergonomics on small machines.",
        desc: "G1 has been the default since Java 9 — but only on \"server-class\" hardware. Anything with a single CPU or less than 1792 MB of RAM quietly got the Serial collector instead, which surprised plenty of people running containers with tight limits. JEP 523 retires that split: G1 has become competitive with Serial at every heap size, so the JVM now picks it unconditionally. Serial is still one flag away if a constrained deployment genuinely prefers it.",
        tag: "jvm",
        before: {
          lang: "shell",
          code: `# Pre-27: the collector depended on the machine the JVM found itself on.
$ docker run --cpus=1 --memory=512m openjdk:26 java -XX:+PrintFlagsFinal -version \\
    | grep -E 'UseSerialGC|UseG1GC'
     bool UseG1GC     = false   {product} {default}
     bool UseSerialGC = true    {product} {ergonomic}

# Same image, bigger box → a different collector, and different latency.`
        },
        after: {
          lang: "shell",
          code: `# Java 27: G1 regardless of CPU count or container memory limit.
$ docker run --cpus=1 --memory=512m openjdk:27 java -XX:+PrintFlagsFinal -version \\
    | grep -E 'UseSerialGC|UseG1GC'
     bool UseG1GC     = true    {product} {ergonomic}
     bool UseSerialGC = false   {product} {default}

# Still explicitly selectable if you want it:
$ java -XX:+UseSerialGC -jar app.jar`
        }
      },
      {
        name: "Compact object headers by default",
        summary: "Object headers drop from 96 bits to 64.",
        desc: "Project Lilliput's header shrink was experimental in Java 24 (JEP 450) and a supported product option in 25. JEP 534 makes it the default layout on 64-bit platforms: every object on the heap gets 4 bytes smaller, which means less heap, better cache density, and less GC work. Oracle, Amazon, and SAP ran it in production for two release cycles before the flip. The opt-out flag still exists but is itself slated for deprecation.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `# Nothing to enable — this is now the default.
$ java -XX:+PrintFlagsFinal -version | grep UseCompactObjectHeaders
     bool UseCompactObjectHeaders = true  {product} {default}

# Opt out if some agent or tool depends on the old layout:
$ java -XX:-UseCompactObjectHeaders -jar app.jar

# Related: UseCompressedClassPointers is obsolete in 27 (JDK-8363996).
# The JVM now always compresses class pointers; passing the flag warns:
#   Ignoring option UseCompressedClassPointers; support was removed in 27.0`
        }
      },
      {
        name: "Post-quantum hybrid key exchange for TLS 1.3",
        summary: "X25519MLKEM768 is the top default named group.",
        desc: "\"Harvest now, decrypt later\" is the threat: an adversary records TLS traffic today and decrypts it once quantum computers can break ECDH. JEP 527 answers it with hybrid key exchange — a classical ECDHE group and ML-KEM run together, so the session stays safe unless both are broken. Three schemes ship (X25519MLKEM768, SecP256r1MLKEM768, SecP384r1MLKEM1024); only X25519MLKEM768 is enabled by default, at the front of the named-group list. Applications using javax.net.ssl get it with no code change at all.",
        tag: "api",
        code: {
          lang: "java",
          code: `// Nothing to opt into: the default list already leads with the hybrid group.
SSLParameters params = SSLContext.getDefault().getDefaultSSLParameters();
System.out.println(Arrays.toString(params.getNamedGroups()));
// [X25519MLKEM768, x25519, secp256r1, secp384r1, secp521r1,
//  x448, ffdhe2048, ffdhe3072, ffdhe4096]

// The other two hybrids are supported but not on by default —
// select them per-connection...
SSLParameters custom = socket.getSSLParameters();
custom.setNamedGroups(new String[] { "SecP384r1MLKEM1024", "X25519MLKEM768" });
socket.setSSLParameters(custom);

// ...or JVM-wide:
//   java -Djdk.tls.namedGroups=SecP256r1MLKEM768,x25519 -jar app.jar`
        }
      },
      {
        name: "TLS certificate compression (zlib)",
        summary: "Smaller handshakes, on by default.",
        desc: "The JDK now implements RFC 8879 certificate compression for TLS 1.3 using zlib, shrinking the certificate chain exchanged during the handshake. That matters most for chains carrying post-quantum signatures, which are considerably larger than their classical equivalents. Only zlib is implemented — brotli and zstd are not. It is negotiated automatically and needs no code change (JDK-8372526).",
        tag: "api",
        code: {
          lang: "shell",
          code: `# Enabled by default — the compress_certificate extension is offered
# automatically during the TLS 1.3 handshake.

# To turn it off, disable the extension on either peer:
$ java -Djdk.tls.client.disableExtensions=compress_certificate \\
       -Djdk.tls.server.disableExtensions=compress_certificate \\
       -jar app.jar

# Watch it negotiate:
$ java -Djavax.net.debug=ssl:handshake -jar app.jar 2>&1 | grep -i compress`
        }
      },
      {
        name: "JFR in-process data redaction",
        summary: "Secrets get scrubbed before the recording is written.",
        desc: "Flight Recorder captures command-line arguments, environment variables, and system properties — which routinely means tokens, passwords, and credential-bearing URLs land in a .jfr file that then gets attached to a support ticket. JEP 536 redacts that data inside the process, before it is ever written. Java 27 applies a default filter set automatically; redact-key and redact-argument let you add glob patterns of your own, read them from a file, or switch redaction off entirely.",
        tag: "tooling",
        code: {
          lang: "shell",
          code: `# Add application-specific filters on top of the defaults (note the +)
$ java -XX:FlightRecorderOptions:'redact-key=+confidential;secret' \\
       -XX:StartFlightRecording:filename=dump.jfr \\
       -Dconfidential=SOME_SECRET \\
       -jar application.jar

# Redact a credential-bearing URL, or a flag and the value that follows it
$ java -XX:FlightRecorderOptions:'redact-argument=https://*:*@*' ...
$ java -XX:FlightRecorderOptions:'redact-argument=--password *' ...

# Load filter lists from files
$ java '-XX:FlightRecorderOptions:redact-argument=@args.txt,redact-key=@keys.txt' ...

# Opt out completely
$ java -XX:FlightRecorderOptions:'redact-argument=none,redact-key=none' ...

# Related: jdk.SystemProcess no longer emits command-line arguments at all.`
        }
      },
      {
        name: "Diagnostic tooling polish",
        summary: "jcmd completion, a security-properties dump, javadoc defaults.",
        desc: "A cluster of small quality-of-life changes to the JDK tools. jcmd gains a Bash completion script and a VM.security_properties command (the security-side counterpart to VM.system_properties). -XX:FlightRecorderOptions:help finally lists its sub-options. VM.info and hs_err logs now report open file-descriptor counts, which makes \"too many open files\" far easier to diagnose. And javadoc copies doc-files subdirectories by default, retiring -docfilessubdirs.",
        tag: "tooling",
        code: {
          lang: "shell",
          code: `# Dump the active security properties of a running JVM (JDK-8364182)
$ jcmd <pid> VM.security_properties

# Open file descriptors now appear in VM.info and hs_err_pid logs (JDK-8359706)
$ jcmd <pid> VM.info | grep -i 'Open File Descriptors'
Open File Descriptors: 52

# Bash completion for jcmd (JDK-8357439)
$ source $JAVA_HOME/conf/bash-completion/jcmd

# FlightRecorderOptions is now self-documenting (JDK-8367584)
$ java -XX:FlightRecorderOptions:help

# javadoc copies doc-files/ subdirectories without -docfilessubdirs (JDK-8347112)
$ javadoc -d out com.example`
        }
      },
      {
        name: "Structured concurrency (7th preview)",
        summary: "join() gets a checked exception type; timeout() replaces onTimeout().",
        desc: "The most substantial preview churn in this release. StructuredTaskScope and Joiner gain a third type parameter, R_X, naming the exception join() can throw. The allSuccessfulOrThrow / anySuccessfulOrThrow / awaitAllSuccessfulOrThrow joiners now raise ExecutionException, with new overloads taking a Function so you can map failures to your own exception type. awaitAll() is gone, onTimeout() is replaced by timeout() (which surfaces CancelledByTimeoutException as the cause), and a new open(UnaryOperator) applies the default join policy while still letting you configure the scope.",
        tag: "preview",
        code: {
          lang: "java",
          code: `Response handle() throws ExecutionException, InterruptedException {
    try (var scope = StructuredTaskScope.open()) {
        Subtask<String>  user  = scope.fork(() -> findUser());
        Subtask<Integer> order = scope.fork(() -> fetchOrder());

        scope.join();
        return new Response(user.get(), order.get());
    }
}

// 7th-preview deltas vs. JDK 26:
//   Joiner.allSuccessfulOrThrow()  → throws ExecutionException
//   anySuccessfulResultOrThrow()   → anySuccessfulOrThrow() (renamed in 26)
//   awaitAll()                     → removed
//   Joiner.onTimeout(...)          → Joiner.timeout(...)
//
// javac --release 27 --enable-preview Main.java`
        }
      },
      {
        name: "Lazy constants (3rd preview)",
        summary: "Set.ofLazy arrives; the escape-hatch methods leave.",
        desc: "The third preview of java.lang.LazyConstant tightens the API rather than growing it. isInitialized() and orElse(T) are gone — both let callers observe or work around the un-initialized state in ways the design deliberately wants to rule out. Going the other way, Set.ofLazy(...) joins the existing List.ofLazy and Map.ofLazy factories, so all three main collection shapes can now be lazily populated element by element.",
        tag: "preview",
        code: {
          lang: "java",
          code: `class OrderController {
    private final LazyConstant<Logger> logger =
        LazyConstant.of(() -> Logger.create(OrderController.class));

    void submitOrder(User user, List<Product> products) {
        logger.get().info("order started");   // supplier runs once, on first get()
    }
}

// Lazy collections — each element computed on first access:
List<Integer> squares = List.ofLazy(1_000, i -> i * i);
Map<String, Config>  byName = Map.ofLazy(names, Config::load);
Set<Token>           tokens = Set.ofLazy(...);   // new in the 3rd preview

// Removed in this preview: isInitialized(), orElse(T)
// javac --release 27 --enable-preview ...`
        }
      },
      {
        name: "PEM encodings (3rd preview)",
        summary: "DEREncodable becomes BinaryEncodable.",
        desc: "Another polish round on the PEM API. The PEM type changes from a record to an ordinary class with constructors that accept Base64 content as byte arrays. The DEREncodable interface is renamed BinaryEncodable, which describes what PEM text actually carries. EncryptedPrivateKeyInfo gains getKeyPair methods for PKCS#8 payloads that include a public key, getKey / getKeyPair now take just a Key, PEMDecoder.withFactory becomes withFactoriesOf, and a new CryptoException reports runtime cryptographic failures.",
        tag: "preview",
        code: {
          lang: "java",
          code: `// Encode a key pair to PEM text
PEMEncoder encoder = PEMEncoder.of();
String pem = encoder.encodeToString(new KeyPair(publicKey, privateKey));

// Decode it back
X509Certificate cert = PEMDecoder.of()
    .decode(Files.readString(Path.of("cert.pem")), X509Certificate.class);

// 3rd-preview deltas vs. JDK 26:
//   DEREncodable          → BinaryEncodable
//   PEMDecoder.withFactory → withFactoriesOf
//   new CryptoException for runtime crypto failures
//
// javac --release 27 --enable-preview ...`
        }
      },
      {
        name: "Primitive types in patterns (5th preview)",
        summary: "Re-previewed unchanged.",
        desc: "Pattern matching across the primitive/reference divide takes a fifth lap with no changes at all. The refinements landed in the fourth preview (Java 26) — a sharper definition of unconditional exactness, and tighter dominance checking between switch labels — and the feature is simply riding out another cycle before finalization. instanceof performs a range check as well as a type check, so i instanceof byte b matches only when the value actually fits.",
        tag: "preview",
        code: {
          lang: "java",
          code: `// A typed pattern instead of default — the value stays usable
String label = switch (x.getStatus()) {
    case 0     -> "okay";
    case 1     -> "warning";
    case 2     -> "error";
    case int i -> "unknown status: " + i;
};

// instanceof on a primitive checks range, then binds
int i = 127;
if (i instanceof byte b) {
    System.out.println("fits in a byte: " + b);   // 127 does; 128 would not
}

// javac --release 27 --enable-preview Main.java`
        }
      },
      {
        name: "Vector API (12th incubator)",
        summary: "No API change; SLEEF upgraded to 3.9.0.",
        desc: "The twelfth incubation carries no API changes whatsoever. The one substantive update is internal: the bundled SLEEF vector-math library moves from 3.6.1 to 3.9.0, which brings vector math intrinsics to ARM and RISC-V. Standardization is still gated on Project Valhalla — the vector classes need to become real value classes before the API can be promoted out of incubation.",
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
    for (; i < x.length; i++) y[i] += a * x[i];   // scalar tail
}

// SLEEF 3.9.0 adds ARM + RISC-V intrinsics for transcendental lanewise ops.
// javac --add-modules jdk.incubator.vector ...`
        }
      }
    ],
    deprecations: [
      { what: "JVM Compiler Interface (JVMCI)", kind: "removed", note: "The experimental JVMCI is gone (JDK-8382582): the HotSpot-side code, the jdk.internal.vm.ci / jdk.graal.compiler / jdk.graal.compiler.management modules, the JVMCI JIT policies, -XX:+UseGraalJIT, and every flag with JVMCI in the name. GraalVM's own distributions are unaffected; a stock JDK can no longer host a Java-written JIT." },
      { what: "-noclassgc, -noverify, -verifyremote, -Xverify:none", kind: "removed", note: "These long-deprecated launcher and VM options are removed (JDK-8373481). Use -Xnoclassgc for the first and -Xverify:remote for the third; the bytecode-verification opt-outs have no replacement and should not be used." },
      { what: "ThreadPoolExecutor.finalize()", kind: "removed", note: "Removed (JDK-8371748). Deprecated in JDK 9 with JEP 421, re-specified to do nothing in 11, deprecated for removal in 18. Subclasses calling super.finalize() now reach Object.finalize(), which declares throws Throwable — so they may stop compiling." },
      { what: "UseCompressedClassPointers", kind: "obsolete", note: "Deprecated in JDK 25, obsolete in 27 (JDK-8363996). The JVM always compresses class pointers now; passing the flag either way just logs \"Ignoring option UseCompressedClassPointers; support was removed in 27.0\"." },
      { what: "VFORK process launch mechanism (Linux)", kind: "removed", note: "-Djdk.lang.Process.launchMechanism=VFORK is removed (JDK-8357089) — it was inherently dangerous. Fall back to the default POSIX_SPAWN, or FORK if you need the old fork semantics." },
      { what: "java.locale.useOldISOCodes", kind: "removed", note: "The escape hatch back to legacy ISO 639 codes (iw, ji, in) no longer has any effect and warns at runtime (JDK-8355522). Added in 17, deprecated in 25. Move to he, yi, and id." }
    ]
  }
);
