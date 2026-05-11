/* Java 17 — September 14, 2021 */
window.JAVA_DATA.push(
  {
    version: 17,
    date: "September 14, 2021",
    codename: null,
    lts: true,
    blurb: "The second cadence-era LTS, and where most enterprise codebases consolidated. Sealed classes went final; pattern matching for switch began its preview tour.",
    features: [
      {
        name: "Sealed classes (final)",
        summary: "Closed hierarchies, standardized.",
        desc: "Standardized after two previews. With sealed types plus records, Java now has algebraic data types — and pattern matching can reason about them exhaustively.",
        tag: "language",
        code: {
          lang: "java",
          code: `public sealed interface Json
        permits JString, JNumber, JBool, JNull, JArray, JObject {}

public record JString(String value)              implements Json {}
public record JNumber(double value)              implements Json {}
public record JBool  (boolean value)             implements Json {}
public record JNull  ()                          implements Json {}
public record JArray (List<Json> items)          implements Json {}
public record JObject(Map<String, Json> fields)  implements Json {}`
        }
      },
      {
        name: "Pattern matching for switch (preview)",
        summary: "Switch grows type patterns.",
        desc: "Switch can now match on the runtime type of a value, bind a typed variable, and (with sealed types) be checked for exhaustiveness. Finalized in Java 21.",
        tag: "preview",
        code: {
          lang: "java",
          code: `String describe(Json j) {
    return switch (j) {
        case JString s   -> "string of length " + s.value().length();
        case JNumber n   -> "number " + n.value();
        case JBool   b   -> b.value() ? "true" : "false";
        case JNull   __  -> "null";
        case JArray  a   -> "array(" + a.items().size() + ")";
        case JObject o   -> "object{" + o.fields().keySet() + "}";
    };
}`
        }
      },
      {
        name: "Foreign Function & Memory API (incubator)",
        summary: "Project Panama lands as an incubator.",
        desc: "A safer, lower-overhead alternative to JNI for calling native code and managing off-heap memory. Iterated through several incubator releases; finalized in Java 22.",
        tag: "preview",
        code: {
          lang: "java",
          code: `// Incubator API — names changed before final form in 22
try (var arena = ResourceScope.newConfinedScope()) {
    MemorySegment buf = MemorySegment.allocateNative(1024, arena);
    // ... pass to native call via CLinker
}`
        }
      },
      {
        name: "Strict floating-point, restored",
        summary: "strictfp is the default again.",
        desc: "Modern x86 CPUs no longer need the speed-vs-determinism trade-off the JVM made in 1.2. All floating-point evaluation is now strictly IEEE 754 by default; the strictfp keyword is now a no-op.",
        tag: "jvm",
        code: {
          lang: "java",
          code: `// Pre-17: needed strictfp for deterministic FP across platforms
public strictfp class Calc { /* ... */ }

// Java 17+: same behavior, no keyword required.
public class Calc {
    public double mul(double a, double b) { return a * b; }
}`
        }
      },
      {
        name: "Enhanced pseudo-random number generators",
        summary: "A proper API for modern PRNG algorithms.",
        desc: "java.util.random.RandomGenerator unifies Random, SecureRandom, SplittableRandom, and adds modern algorithms like LXM, Xoroshiro, and L128X1024MixRandom — selectable by name.",
        tag: "api",
        code: {
          lang: "java",
          code: `RandomGenerator rng = RandomGeneratorFactory
    .of("L64X128MixRandom")
    .create(42L);

DoubleStream samples = rng.doubles(1_000_000, 0.0, 1.0);
double mean = samples.average().orElse(0);`
        }
      }
    ],
    deprecations: [
      { what: "Security Manager", kind: "deprecated for removal", note: "Set on a removal path; finally removed in Java 24. Migrate sandboxing to OS-level isolation (containers, seccomp, etc.)." },
      { what: "Applet API", kind: "deprecated for removal", note: "Officially marked for removal. Browsers killed Java plugins years ago; the API itself was removed in 21." },
      { what: "RMI Activation", kind: "removed", note: "java.rmi.activation gone for good." },
      { what: "Floating-Point modifier strictfp", kind: "obsolete", note: "Still allowed for source-compat, but a no-op. Safe to delete." }
    ]
  }
);
