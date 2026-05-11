/* Java 12 — March 19, 2019 */
window.JAVA_DATA.push(
  {
    version: 12,
    date: "March 19, 2019",
    codename: null,
    lts: false,
    blurb: "A preview-heavy release. Switch expressions arrived as a preview and the Shenandoah low-pause GC entered experimentally.",
    features: [
      {
        name: "Switch expressions (preview)",
        summary: "Switch becomes an expression — and ditches fall-through.",
        desc: "A new arrow syntax that returns a value, supports comma-separated labels, and refuses implicit fall-through. Lets you assign a value from a switch directly. Finalized in Java 14.",
        tag: "preview",
        before: {
          lang: "java",
          code: `int days;
switch (month) {
    case JANUARY:
    case MARCH:
    case MAY:
    case JULY:
    case AUGUST:
    case OCTOBER:
    case DECEMBER:
        days = 31; break;
    case APRIL: case JUNE: case SEPTEMBER: case NOVEMBER:
        days = 30; break;
    case FEBRUARY:
        days = leap ? 29 : 28; break;
    default:
        throw new IllegalStateException();
}`
        },
        after: {
          lang: "java",
          code: `int days = switch (month) {
    case JANUARY, MARCH, MAY, JULY, AUGUST, OCTOBER, DECEMBER -> 31;
    case APRIL, JUNE, SEPTEMBER, NOVEMBER                     -> 30;
    case FEBRUARY                                             -> leap ? 29 : 28;
};`
        }
      },
      {
        name: "Shenandoah GC (experimental)",
        summary: "Sub-10ms pause-time collector.",
        desc: "A concurrent collector targeting low pause times regardless of heap size. Available out-of-the-box from OpenJDK builds in 12, marked production-ready in 15.",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `$ java -XX:+UnlockExperimentalVMOptions \\
       -XX:+UseShenandoahGC \\
       -Xmx8g \\
       MyApp`
        }
      },
      {
        name: "Compact number formatting",
        summary: "1.2K, 3.4M, 5.6B out of the box.",
        desc: "NumberFormat.getCompactNumberInstance produces locale-aware short forms of large numbers — handy for dashboards, badges, and feed UIs.",
        tag: "api",
        code: {
          lang: "java",
          code: `var fmt = NumberFormat.getCompactNumberInstance(
    Locale.US, NumberFormat.Style.SHORT);
fmt.format(1_234);       // "1K"
fmt.format(12_345_000);  // "12M"

var de = NumberFormat.getCompactNumberInstance(
    Locale.GERMAN, NumberFormat.Style.LONG);
de.format(1_500);        // "1,5 Tausend"`
        }
      },
      {
        name: "String::indent and ::transform",
        summary: "Re-indent and pipe strings.",
        desc: "indent adjusts leading whitespace and normalizes line terminators. transform applies an arbitrary Function — useful for fluent text manipulation without nesting calls.",
        tag: "api",
        code: {
          lang: "java",
          code: `String code = "class A {\\n  int x;\\n}";
System.out.println(code.indent(4));

String slug = "  Hello World  ".transform(s -> s.strip()
                                                .toLowerCase()
                                                .replace(' ', '-'));
// slug == "hello-world"`
        }
      }
    ],
    deprecations: [
      { what: "Default CDS archives", kind: "behavior change", note: "JDK now ships a precomputed default CDS archive; expect faster startup out of the box." }
    ]
  }
);
