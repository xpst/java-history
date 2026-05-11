/* Java 24 — March 18, 2025 */
window.JAVA_DATA.push(
  {
    version: 24,
    date: "March 18, 2025",
    codename: null,
    lts: false,
    blurb: "Stream gatherers shipped final. The Security Manager was finally removed after years on the deprecation path. Key encapsulation mechanisms previewed for post-quantum crypto.",
    features: [
      {
        name: "Stream gatherers (final)",
        summary: "User-defined intermediate stream operations.",
        desc: "Gatherers stabilized after two previews. The built-in Gatherers utility supplies fold, scan, mapConcurrent, windowFixed, and windowSliding; you can write your own with one builder call.",
        tag: "api",
        code: {
          lang: "java",
          code: `// Concurrent map with bounded parallelism — order preserved
List<Page> pages = urls.stream()
    .gather(Gatherers.mapConcurrent(8, http::fetch))
    .toList();

// Fold: running maximum
List<Integer> runningMax = Stream.of(3, 1, 4, 1, 5, 9, 2, 6)
    .gather(Gatherers.scan(() -> Integer.MIN_VALUE, Math::max))
    .toList();
// [3, 3, 4, 4, 5, 9, 9, 9]`
        }
      },
      {
        name: "Class-file API (final)",
        summary: "Standard bytecode I/O.",
        desc: "The official JDK API for reading and writing class files is now standard. Frameworks (Spring's CGLIB replacement, instrumentation agents, build tools) can drop ASM in favor of the platform offering.",
        tag: "api",
        code: {
          lang: "java",
          code: `var cf = ClassFile.of();
ClassModel cm = cf.parse(Path.of("MyClass.class"));

for (MethodModel m : cm.methods()) {
    System.out.println(m.methodName() + m.methodType());
}`
        }
      },
      {
        name: "Compact object headers (experimental)",
        summary: "Smaller objects, lower GC pressure.",
        desc: "Project Lilliput: reduces object header size from 12/16 bytes to 8. On heap-heavy workloads, can shave 10–20% off footprint and improve cache density. Experimental in 24.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `$ java -XX:+UnlockExperimentalVMOptions \\
       -XX:+UseCompactObjectHeaders \\
       -Xmx8g \\
       MyApp`
        }
      },
      {
        name: "ML-KEM & ML-DSA",
        summary: "Post-quantum crypto in the standard library.",
        desc: "Module-Lattice-based Key-Encapsulation Mechanism (FIPS 203) and Digital Signature Algorithm (FIPS 204), the first NIST-standardized post-quantum primitives, now ship in the standard provider.",
        tag: "api",
        code: {
          lang: "java",
          code: `// Key encapsulation
KeyPairGenerator kpg = KeyPairGenerator.getInstance("ML-KEM");
kpg.initialize(NamedParameterSpec.ML_KEM_768);
KeyPair kp = kpg.generateKeyPair();

KEM kem = KEM.getInstance("ML-KEM");
KEM.Encapsulator enc = kem.newEncapsulator(kp.getPublic());
KEM.Encapsulated encap = enc.encapsulate();
// encap.encapsulation() is sent to the receiver
// encap.key() is the shared secret on the sender side`
        }
      },
      {
        name: "Ahead-of-Time class loading (experimental)",
        summary: "Pre-load + pre-link classes for faster startup.",
        desc: "Building on CDS, this JEP records and replays not just class metadata but also pre-linked, pre-loaded class state. Trim seconds off cold-start in containerized deployments.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `# 1. Record
$ java -XX:AOTMode=record -XX:AOTConfiguration=app.aotconf -jar app.jar
# 2. Create cache
$ java -XX:AOTMode=create -XX:AOTConfiguration=app.aotconf \\
       -XX:AOTCache=app.aot -jar app.jar
# 3. Run
$ java -XX:AOTCache=app.aot -jar app.jar`
        }
      }
    ],
    deprecations: [
      { what: "Security Manager", kind: "removed", note: "SecurityManager and AccessController gone for good. Migrate sandboxing to OS/container isolation or an external policy engine." },
      { what: "32-bit ARM port", kind: "deprecated", note: "armhf set on a removal path; 64-bit ARM (aarch64) is the path forward." },
      { what: "Memory-Access API legacy paths", kind: "obsolete", note: "Remaining traces of jdk.incubator.foreign cleared." }
    ]
  }
);
