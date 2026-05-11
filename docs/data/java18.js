/* Java 18 — March 22, 2022 */
window.JAVA_DATA.push(
  {
    version: 18,
    date: "March 22, 2022",
    codename: null,
    lts: false,
    blurb: "UTF-8 became the platform default. A tiny built-in web server made demos and tests easier. Pattern matching for switch took its second preview.",
    features: [
      {
        name: "UTF-8 by default",
        summary: "file.encoding=UTF-8 everywhere.",
        desc: "Standard Java APIs now default to UTF-8 instead of the platform encoding. Removes a long-standing source of cross-platform surprise — files written on Windows no longer mis-decode on Linux.",
        tag: "jvm",
        before: {
          lang: "java",
          code: `// Pre-18: same code, different result on Windows vs Linux
new FileReader("data.txt");                 // platform default
new FileWriter("out.txt");                  // platform default
new String(Files.readAllBytes(p));          // platform default`
        },
        after: {
          lang: "java",
          code: `// Java 18+: UTF-8 unless overridden by -Dfile.encoding=...
new FileReader("data.txt");                 // UTF-8
new FileWriter("out.txt");                  // UTF-8
new String(Files.readAllBytes(p));          // UTF-8

// Want the old behavior?
//   java -Dfile.encoding=COMPAT MyApp`
        }
      },
      {
        name: "Simple Web Server",
        summary: "jwebserver — a one-shot static file server.",
        desc: "A minimal HTTP server bundled with the JDK and runnable via the jwebserver command. Built for demos, prototypes, ad-hoc file sharing, and offline docs — not production.",
        tag: "tooling",
        code: {
          lang: "shell",
          code: `$ cd ./docs
$ jwebserver -p 8000
Binding to loopback by default. For all interfaces use "-b 0.0.0.0".
Serving /Users/me/docs and subdirectories on 127.0.0.1 port 8000
URL http://127.0.0.1:8000/`
        }
      },
      {
        name: "Code snippets in Javadoc",
        summary: "@snippet for runnable doc examples.",
        desc: "An @snippet tag in Javadoc that supports syntax highlighting, region markers, and external snippet files — so your docs and your tests can reference the same source.",
        tag: "tooling",
        code: {
          lang: "java",
          code: `/**
 * Computes the area of a circle.
 *
 * {@snippet :
 *   double area = circleArea(2.0);  // @highlight regex='area'
 *   assert area > 12.5 && area < 12.6;
 * }
 */
public static double circleArea(double r) {
    return Math.PI * r * r;
}`
        }
      },
      {
        name: "Internet-Address Resolution SPI",
        summary: "Pluggable host-name resolution.",
        desc: "A service-provider interface for InetAddress lookups. Lets frameworks plug in custom resolvers — useful for mocking DNS in tests, using DNS-over-HTTPS, or service-discovery integrations.",
        tag: "api",
        code: {
          lang: "java",
          code: `// SPI: implement InetAddressResolverProvider
public class CustomResolverProvider extends InetAddressResolverProvider {
    @Override
    public InetAddressResolver get(Configuration cfg) {
        return new InetAddressResolver() {
            @Override
            public Stream<InetAddress> lookupByName(String host, LookupPolicy p) {
                return Stream.of(/* custom logic */);
            }
            // ... lookupByAddress
        };
    }
    @Override public String name() { return "custom"; }
}`
        }
      }
    ],
    deprecations: [
      { what: "Thread.stop / suspend / resume", kind: "deprecated for removal", note: "Always unsafe; setting the gravestone. Use interruption + cooperative cancellation." },
      { what: "Finalization", kind: "deprecated for removal", note: "Object.finalize() set on a removal path. Use try-with-resources and Cleaner for cleanup." }
    ]
  }
);
