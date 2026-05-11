/* Java 23 — September 17, 2024 */
window.JAVA_DATA.push(
  {
    version: 23,
    date: "September 17, 2024",
    codename: null,
    lts: false,
    blurb: "String templates withdrew for a redesign; primitive patterns and module imports previewed. ZGC's non-generational mode was deprecated, signaling the generational variant as default.",
    features: [
      {
        name: "Primitive types in patterns (preview)",
        summary: "Patterns extend to int, long, double, …",
        desc: "instanceof and switch can match primitive type patterns, enabling pattern-based casts and exhaustiveness checks over primitives without autoboxing.",
        tag: "preview",
        code: {
          lang: "java",
          code: `static String fmt(Number n) {
    return switch (n) {
        case int i when i < 0  -> "negative int " + i;
        case int i             -> "int " + i;
        case long l            -> "long " + l;
        case double d          -> "double " + d;
        default                -> n.toString();
    };
}`
        }
      },
      {
        name: "Module imports (preview)",
        summary: "import module M; one line, every package.",
        desc: "Reduces the import wall in scripts and small programs by importing every exported package of a module in a single statement. Pairs with the simple source launcher.",
        tag: "preview",
        code: {
          lang: "java",
          code: `import module java.base;
import module java.net.http;

void main() throws Exception {
    var client = HttpClient.newHttpClient();
    var req    = HttpRequest.newBuilder(URI.create("https://example.com")).build();
    var body   = client.send(req, HttpResponse.BodyHandlers.ofString()).body();
    println(body);   // top-level auto-imported in JEP 477 (Java 23 preview)
}`
        }
      },
      {
        name: "Implicitly-declared classes and instance main (preview)",
        summary: "Java without the public class scaffold.",
        desc: "For learning and scripting: drop a method named main into a file and run it. No class declaration, no String[] args, no static. Combines with module imports for friction-free single-file Java.",
        tag: "preview",
        before: {
          lang: "java",
          code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world");
    }
}`
        },
        after: {
          lang: "java",
          code: `void main() {
    System.out.println("Hello, world");
}`
        }
      },
      {
        name: "Markdown in Javadoc",
        summary: "Javadoc comments accept Markdown.",
        desc: "Triple-slash Javadoc lines are rendered as Markdown — code fences, lists, tables. The old @tags still work, but you no longer need <p> and <pre> for basic formatting.",
        tag: "tooling",
        code: {
          lang: "java",
          code: `/// Computes the **factorial** of \`n\`.
///
/// - Returns 1 for \`n == 0\`
/// - Throws for negative input
///
/// \`\`\`java
/// factorial(5) == 120
/// \`\`\`
public static long factorial(int n) { /* ... */ }`
        }
      },
      {
        name: "Z Generational by default",
        summary: "Generational ZGC takes the wheel.",
        desc: "ZGC's generational mode (introduced in 21 as opt-in) is now the default when -XX:+UseZGC is selected. Non-generational mode remains via a deprecation flag.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `$ java -XX:+UseZGC MyApp                         # generational by default
$ java -XX:+UseZGC -XX:-ZGenerational MyApp      # opt out (deprecated)`
        }
      }
    ],
    deprecations: [
      { what: "String templates", kind: "withdrawn", note: "Removed from preview pending redesign. The 21–22 STR.\"...\" syntax stops compiling. Revived form returned later in the cycle." },
      { what: "Non-generational ZGC", kind: "deprecated", note: "Off-by-default since 23 default flip. Plan to remove the legacy mode in a later release." }
    ]
  }
);
