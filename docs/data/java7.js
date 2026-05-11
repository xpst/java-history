/* Java 7 — July 28, 2011 */
window.JAVA_DATA.push(
  {
    version: 7,
    date: "July 28, 2011",
    codename: "Dolphin",
    lts: false,
    blurb: "The Project Coin release. A grab-bag of small language conveniences — try-with-resources, multi-catch, the diamond operator, strings in switch — that quietly removed mountains of everyday boilerplate. Also delivered NIO.2 and the fork/join framework under the hood.",
    features: [
      {
        name: "Strings in switch",
        summary: "switch(s) finally accepts String.",
        desc: "Pre-7, only integral types and enums were allowed as switch selectors; chains of if/else if on String were the only option. Java 7 lets a String drive a switch directly, with the compiler generating a hashCode/equals-based dispatch underneath.",
        tag: "language",
        before: {
          lang: "java",
          code: `String day = ...;
if (day.equals("MON") || day.equals("TUE")) {
    // early week
} else if (day.equals("FRI")) {
    // pizza
} else {
    // other
}`
        },
        after: {
          lang: "java",
          code: `switch (day) {
    case "MON":
    case "TUE":
        // early week
        break;
    case "FRI":
        // pizza
        break;
    default:
        // other
}`
        }
      },
      {
        name: "Try-with-resources",
        summary: "Automatic resource management.",
        desc: "Any object implementing AutoCloseable (or its superinterface Closeable) declared in a try-with-resources header is closed automatically at the end of the block — in reverse declaration order, and with close-time exceptions chained onto the primary via Throwable.getSuppressed(). Replaces the verbose explicit-finally pattern that everyone got subtly wrong.",
        tag: "language",
        before: {
          lang: "java",
          code: `BufferedReader r = null;
try {
    r = new BufferedReader(new FileReader(path));
    return r.readLine();
} finally {
    if (r != null) {
        try { r.close(); } catch (IOException ignored) {}
    }
}`
        },
        after: {
          lang: "java",
          code: `try (BufferedReader r = new BufferedReader(new FileReader(path))) {
    return r.readLine();
}
// r.close() runs automatically; any close-time IOException is
// added to the primary exception via getSuppressed().`
        }
      },
      {
        name: "Diamond operator",
        summary: "Type inference for generic constructors.",
        desc: "On the right-hand side of an assignment or initialization, the compiler can infer the constructor's type arguments. The redundant <String, List<Integer>> after `new HashMap` becomes `<>`. Java 9 later extended inference to anonymous-class constructors as well (JEP 213, Milling Project Coin), when the inferred type is denotable.",
        tag: "language",
        before: {
          lang: "java",
          code: `Map<String, List<Integer>> index =
    new HashMap<String, List<Integer>>();
List<Map.Entry<String, Integer>> entries =
    new ArrayList<Map.Entry<String, Integer>>();`
        },
        after: {
          lang: "java",
          code: `Map<String, List<Integer>> index = new HashMap<>();
List<Map.Entry<String, Integer>> entries = new ArrayList<>();`
        }
      },
      {
        name: "Simplified varargs method declaration",
        summary: "@SafeVarargs moves heap-pollution warnings to the declaration.",
        desc: "Generic varargs are inherently unsafe (the runtime array element type is erased), so pre-7 every caller of e.g. Arrays.asList(T...) saw an unchecked warning. Java 7 lets the author assert at the declaration that the method does not pollute the heap — silencing the warning once, at the right place. In Java 7 @SafeVarargs is only legal on `static` methods, `final` instance methods, and constructors (all of which callers cannot override). Java 9 later relaxed this to allow `private` instance methods too (JEP 213, Milling Project Coin), since private methods are equally unoverridable.",
        tag: "language",
        code: {
          lang: "java",
          code: `// Library author asserts the varargs is used safely:
@SafeVarargs
public static <T> List<T> listOf(T... items) {
    List<T> result = new ArrayList<>();
    for (T item : items) result.add(item);
    return result;
}

// Callers no longer need @SuppressWarnings("unchecked") at the call site:
List<String> names = listOf("alice", "bob", "carol");`
        }
      },
      {
        name: "Binary integer literals",
        summary: "0b… for binary, alongside 0x and 0.",
        desc: "Numeric literals can be written in binary with a 0b (or 0B) prefix — useful for bit masks, register layouts, and protocol constants where reading the value as binary is more natural than as hex.",
        tag: "language",
        code: {
          lang: "java",
          code: `byte  flags    = (byte)  0b1010_0000;
short header   = (short) 0b1111_0000_1010_1010;
int   mask     =          0b0011_1111_1111_1111;
long  bigMask  =          0b1010_0000_1010_0000_1010_0000_1010_0000L;`
        }
      },
      {
        name: "Underscores in numeric literals",
        summary: "Group digits for readability.",
        desc: "An underscore between digits in any numeric literal (decimal, hex, binary, float, long) is a no-op at parse time but a huge win for readability. Must sit between two digits — not at the start or end, and not adjacent to the radix prefix or the type suffix.",
        tag: "language",
        code: {
          lang: "java",
          code: `int    million    = 1_000_000;
long   creditCard = 1234_5678_9012_3456L;
int    hexMask    = 0xFF_FF_FF_00;
int    binMask    = 0b1010_0101_0000_1111;
double pi         = 3.141_592_653_589_793;`
        }
      },
      {
        name: "Multi-catch & more-precise rethrow",
        summary: "catch (A | B e) — and tighter throws on rethrown exceptions.",
        desc: "Two related improvements. Multi-catch collapses several catch blocks that do the same thing into one (catch (IOException | SQLException e)); the caught variable is implicitly final and typed as the common supertype. More-precise rethrow lets a method catch a broad type (e.g. Exception) and still declare a narrower throws clause, because the compiler now tracks which specific checked types can actually reach the rethrow.",
        tag: "language",
        before: {
          lang: "java",
          code: `try {
    run();
} catch (IOException e) {
    log.error("io", e);
    throw new RuntimeException(e);
} catch (SQLException e) {
    log.error("sql", e);
    throw new RuntimeException(e);
}`
        },
        after: {
          lang: "java",
          code: `// Multi-catch — one block, one rewrap.
try {
    run();
} catch (IOException | SQLException e) {
    log.error("call failed", e);
    throw new RuntimeException(e);
}

// More-precise rethrow — Java 7 sees that only IOException
// and SQLException can leak through the catch (Exception),
// so the enclosing method's throws clause can name them
// directly instead of widening to Exception.
void copy() throws IOException, SQLException {
    try {
        run();
    } catch (Exception e) {
        cleanup();
        throw e;
    }
}`
        }
      },
      {
        name: "NIO.2 file system API",
        summary: "Path, Files, and a real file-system abstraction.",
        desc: "java.nio.file replaces the much-criticised java.io.File with Path (a typed file-system address), Files (a static-method utility for read/write/copy/move and tree walks), and a pluggable FileSystem (so a zip archive can be mounted as a file system). Symbolic links, file attributes, atomic moves, and a directory-change WatchService all become first-class. Errors come back as proper IOExceptions instead of boolean failure flags.",
        tag: "api",
        code: {
          lang: "java",
          code: `Path src = Paths.get("/tmp/in.txt");
Path dst = Paths.get("/tmp/out.txt");

// Read / write whole files in one call.
List<String> lines = Files.readAllLines(src, StandardCharsets.UTF_8);
Files.write(dst, lines, StandardCharsets.UTF_8);

// Atomic move + copy with explicit options.
Files.copy(src, dst, StandardCopyOption.REPLACE_EXISTING);
Files.move(src, dst, StandardCopyOption.ATOMIC_MOVE);

// Walk a directory tree as a Stream (Java 8 added Files.walk; in 7 use walkFileTree).
Files.walkFileTree(Paths.get("/var/log"), new SimpleFileVisitor<Path>() {
    @Override public FileVisitResult visitFile(Path p, BasicFileAttributes a) {
        System.out.println(p + " (" + a.size() + " bytes)");
        return FileVisitResult.CONTINUE;
    }
});

// Watch a directory for changes.
try (WatchService ws = FileSystems.getDefault().newWatchService()) {
    Paths.get("/tmp").register(ws, StandardWatchEventKinds.ENTRY_CREATE);
    WatchKey key = ws.take();
    for (WatchEvent<?> ev : key.pollEvents()) {
        System.out.println("created: " + ev.context());
    }
}`
        }
      },
      {
        name: "Fork/Join framework",
        summary: "Work-stealing parallelism for divide-and-conquer.",
        desc: "java.util.concurrent.ForkJoinPool with RecursiveTask / RecursiveAction provides a thread pool tuned for splitting one job into many small sub-tasks. Idle workers steal tasks from busy peers' queues — high utilisation without the developer having to micro-manage threads. This is the substrate Java 8's parallel streams (and Stream.parallel()) run on top of.",
        tag: "api",
        code: {
          lang: "java",
          code: `class SumTask extends RecursiveTask<Long> {
    private static final int THRESHOLD = 10_000;
    private final long[] data;
    private final int lo, hi;

    SumTask(long[] data, int lo, int hi) {
        this.data = data; this.lo = lo; this.hi = hi;
    }

    @Override protected Long compute() {
        if (hi - lo <= THRESHOLD) {
            long s = 0;
            for (int i = lo; i < hi; i++) s += data[i];
            return s;
        }
        int mid = (lo + hi) >>> 1;
        SumTask left  = new SumTask(data, lo, mid);
        SumTask right = new SumTask(data, mid, hi);
        left.fork();              // schedule async
        long r = right.compute(); // compute inline
        long l = left.join();     // wait for the fork
        return l + r;
    }
}

long total = ForkJoinPool.commonPool()
    .invoke(new SumTask(huge, 0, huge.length));`
        }
      },
      {
        name: "java.util.Objects",
        summary: "Null-safe equals / hashCode / requireNonNull, in the JDK.",
        desc: "A small utility class of static helpers that previously required either hand-rolled guards or a dependency on Guava / Apache Commons. The null-safe equals and hash methods are exactly what IDE-generated equals/hashCode boilerplate now uses; requireNonNull is the canonical fail-fast constructor guard.",
        tag: "api",
        code: {
          lang: "java",
          code: `public final class Order {
    private final String id;
    private final Customer customer;

    public Order(String id, Customer customer) {
        this.id       = Objects.requireNonNull(id, "id");
        this.customer = Objects.requireNonNull(customer, "customer");
    }

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Order)) return false;
        Order other = (Order) o;
        return Objects.equals(id, other.id)
            && Objects.equals(customer, other.customer);
    }

    @Override public int hashCode() {
        return Objects.hash(id, customer);
    }

    @Override public String toString() {
        return Objects.toString(id, "<no id>");
    }
}`
        }
      },
      {
        name: "invokedynamic (JSR 292)",
        summary: "A new JVM bytecode for dynamic call sites.",
        desc: "The first new bytecode added since Java 1.0. invokedynamic lets a call site bootstrap its target method lazily through a bootstrap method (a MethodHandle resolver), then cache and inline that target as if it had been resolved statically. Added for dynamic languages on the JVM (JRuby, Nashorn), it later became the load-bearing mechanism behind Java 8 lambdas (LambdaMetafactory), Java 9's StringConcatFactory, and Java 14+ record/switch desugaring. The user-facing surface that arrived alongside it is the java.lang.invoke package — MethodHandle and MethodHandles.Lookup.",
        tag: "jvm",
        code: {
          lang: "java",
          code: `// java.lang.invoke is the user-facing surface of JSR 292.
MethodHandles.Lookup lookup = MethodHandles.lookup();

MethodHandle len = lookup.findVirtual(
    String.class, "length", MethodType.methodType(int.class));

int n = (int) len.invokeExact("hello, invokedynamic"); // → 20

// Method handles can be adapted: bind arguments, change types,
// drop / insert parameters — all without reflection's overhead.
MethodHandle hi = lookup.findStatic(
    System.out.getClass(), "println",
    MethodType.methodType(void.class, String.class));
// In Java 8+, this same machinery is what a lambda compiles down to.`
        }
      },
      {
        name: "G1 garbage collector",
        summary: "Garbage-First collector, officially supported.",
        desc: "Available experimentally since 6u14, G1 became officially supported with Java 7 Update 4. Designed for multi-gigabyte heaps with predictable pause-time targets, G1 divides the heap into regions and prioritises collecting regions with the most garbage first (hence the name). Enabled via a JVM flag in 7; it later became the default collector in Java 9 (JEP 248).",
        tag: "jvm",
        code: {
          lang: "shell",
          code: `# Opt in to G1 explicitly on Java 7 (it was not yet the default).
java -XX:+UseG1GC \\
     -XX:MaxGCPauseMillis=200 \\
     -Xms4g -Xmx4g \\
     -jar app.jar

# Verify which collector the running JVM picked.
jcmd <pid> VM.flags | tr ' ' '\\n' | grep -E 'UseG1GC|UseParallelGC|UseConcMarkSweepGC'`
        }
      }
    ],
    deprecations: []
  }
);
