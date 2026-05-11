/* Java 15 — September 15, 2020 */
window.JAVA_DATA.push(
  {
    version: 15,
    date: "September 15, 2020",
    codename: null,
    lts: false,
    blurb: "Text blocks went final, sealed classes previewed, ZGC and Shenandoah graduated to production, and Nashorn was finally removed.",
    features: [
      {
        name: "Text blocks (final)",
        summary: "Triple-quoted strings, no preview flag required.",
        desc: "Promoted to a standard language feature after two previews. Supports new escape sequences (\\s, line-continuation \\) for fine-grained whitespace control.",
        tag: "language",
        code: {
          lang: "java",
          code: `String greeting = """
    Hello,
    \\sworld\\
    .\\
    """;
// "Hello,\\n world."

String json = """
    {
      "name": "%s",
      "age":  %d
    }
    """.formatted(name, age);`
        }
      },
      {
        name: "Sealed classes (preview)",
        summary: "Closed type hierarchies.",
        desc: "Restrict who can extend a class or implement an interface. Pairs with pattern matching to give the compiler enough info for exhaustive switch checks. Finalized in 17.",
        tag: "preview",
        code: {
          lang: "java",
          code: `public sealed interface Shape
        permits Circle, Square, Triangle {}

public record Circle(double r)        implements Shape {}
public record Square(double side)     implements Shape {}
public record Triangle(double b, double h) implements Shape {}

// Non-permitted subclass = compile error
// public class Hexagon implements Shape {} // ERROR`
        }
      },
      {
        name: "ZGC & Shenandoah → production",
        summary: "Low-pause collectors leave experimental.",
        desc: "Both ZGC and Shenandoah are now supported, production-grade GC choices. ZGC targets very large heaps and sub-ms pauses; Shenandoah targets consistent low pauses across heap sizes.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `$ java -XX:+UseZGC        -Xmx32g MyApp
$ java -XX:+UseShenandoahGC -Xmx16g MyApp

# No more -XX:+UnlockExperimentalVMOptions required.`
        }
      },
      {
        name: "EdDSA cryptography",
        summary: "Edwards-Curve digital signatures.",
        desc: "Ed25519 and Ed448 signature algorithms added to the standard Java crypto provider. Modern, deterministic signing without pulling in BouncyCastle.",
        tag: "api",
        code: {
          lang: "java",
          code: `KeyPairGenerator kpg = KeyPairGenerator.getInstance("Ed25519");
KeyPair kp = kpg.generateKeyPair();

Signature sig = Signature.getInstance("Ed25519");
sig.initSign(kp.getPrivate());
sig.update("hello".getBytes(UTF_8));
byte[] signature = sig.sign();`
        }
      },
      {
        name: "Hidden classes",
        summary: "Framework-grade dynamic class loading.",
        desc: "A JVM mechanism for runtime-generated classes (think proxies, lambdas, scripting) that aren't discoverable via bytecode names. Replaces sun.misc.Unsafe.defineAnonymousClass.",
        tag: "jvm",
        code: {
          lang: "java",
          code: `byte[] bytes = generateBytecode();
Lookup lookup = MethodHandles.lookup();
Class<?> hidden = lookup
    .defineHiddenClass(bytes, true, ClassOption.NESTMATE)
    .lookupClass();`
        }
      }
    ],
    deprecations: [
      { what: "Nashorn JavaScript engine", kind: "removed", note: "Removed entirely. Use GraalJS for embedded JS — same javax.script SPI, modern ECMAScript support." },
      { what: "Biased locking", kind: "deprecated", note: "Old throughput optimization for uncontended locks. Disabled by default in 15 (JEP 374); retained as a deprecated, opt-in feature in later releases." },
      { what: "RMI Activation", kind: "deprecated", note: "java.rmi.activation marked for removal — a rarely-used corner of RMI. Removed in Java 17." },
      { what: "Solaris and SPARC ports", kind: "removed", note: "Gone for good in 15." }
    ]
  }
);
