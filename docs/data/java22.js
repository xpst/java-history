/* Java 22 — March 19, 2024 */
window.JAVA_DATA.push(
  {
    version: 22,
    date: "March 19, 2024",
    codename: null,
    lts: false,
    blurb: "Unnamed variables landed final; the Foreign Function & Memory API finally exited preview after seven incubations; statements-before-super(...) loosened constructor rules.",
    features: [
      {
        name: "Unnamed variables and patterns",
        summary: "_ for the values you don't care about.",
        desc: "Underscore is now legal again — as a name for a variable, pattern, or catch parameter you intend to ignore. Pairs perfectly with record patterns: you can deconstruct without naming every component.",
        tag: "language",
        before: {
          lang: "java",
          code: `for (Map.Entry<String, Integer> e : counts.entrySet()) {
    String unusedKey = e.getKey();   // boilerplate name
    process(e.getValue());
}

try { /* ... */ }
catch (IOException ignored) { /* ... */ }`
        },
        after: {
          lang: "java",
          code: `for (var _ : counts.entrySet()) {        // I don't even need .getValue
    counter.increment();
}

if (obj instanceof Pair<Integer, String>(int n, _)) {
    System.out.println(n);                // ignore the String
}

try { /* ... */ }
catch (IOException _) { /* ... */ }`
        }
      },
      {
        name: "Foreign Function & Memory API (final)",
        summary: "Panama, standardized.",
        desc: "Call native libraries and manage off-heap memory without JNI. Arena scopes deterministically free native memory; downcall handles bind to native symbols by name.",
        tag: "api",
        code: {
          lang: "java",
          code: `Linker  linker = Linker.nativeLinker();
SymbolLookup libc = linker.defaultLookup();

MethodHandle strlen = linker.downcallHandle(
    libc.find("strlen").orElseThrow(),
    FunctionDescriptor.of(ValueLayout.JAVA_LONG, ValueLayout.ADDRESS));

try (Arena arena = Arena.ofConfined()) {
    MemorySegment cStr = arena.allocateUtf8String("Hello, native!");
    long n = (long) strlen.invoke(cStr);
}`
        }
      },
      {
        name: "Statements before super(...) / this(...)",
        summary: "Validate constructor args before calling super.",
        desc: "Constructors can now contain statements before the explicit constructor invocation, as long as those statements don't reference this. Useful for argument validation and transformation without throwing inside the super call.",
        tag: "preview",
        before: {
          lang: "java",
          code: `public PositiveBigInt(long value) {
    super(value < 0
        ? -value   // hacky: had to validate inside the super call
        : value);
    // would throw too late
}`
        },
        after: {
          lang: "java",
          code: `public PositiveBigInt(long value) {
    if (value < 0)
        throw new IllegalArgumentException("must be positive");
    var bytes = BigInteger.valueOf(value).toByteArray();
    super(bytes);
}`
        }
      },
      {
        name: "Stream gatherers (preview)",
        summary: "Build your own intermediate stream operations.",
        desc: "Gatherer is the long-awaited counterpart to Collector for intermediate ops. Lets you implement custom windowing, debouncing, scan, and other stateful streaming patterns without leaving the Stream pipeline.",
        tag: "preview",
        code: {
          lang: "java",
          code: `// Sliding window of size 3
List<List<Integer>> windows = Stream.of(1, 2, 3, 4, 5, 6)
    .gather(Gatherers.windowSliding(3))
    .toList();
// [[1,2,3], [2,3,4], [3,4,5], [4,5,6]]

// Custom: running sum
Gatherer<Integer, ?, Integer> runningSum = Gatherer.ofSequential(
    () -> new int[1],
    (state, elem, downstream) -> {
        state[0] += elem;
        return downstream.push(state[0]);
    });`
        }
      },
      {
        name: "Class-file API (preview)",
        summary: "Bytecode manipulation, in the JDK.",
        desc: "A standard, JDK-owned API for reading and writing .class files. Aims to replace ASM as the canonical choice for instrumentation, code generation, and bytecode tooling.",
        tag: "preview",
        code: {
          lang: "java",
          code: `byte[] bytes = ClassFile.of().build(
    ClassDesc.of("HelloWorld"),
    classBuilder -> classBuilder
        .withVersion(ClassFile.JAVA_22_VERSION, 0)
        .withMethod("main", MethodTypeDesc.of(CD_void, CD_String.arrayType()),
            ClassFile.ACC_PUBLIC | ClassFile.ACC_STATIC,
            mb -> mb.withCode(cb -> cb
                .getstatic(CD_System, "out", CD_PrintStream)
                .ldc("Hello, world")
                .invokevirtual(CD_PrintStream, "println", MethodTypeDesc.of(CD_void, CD_String))
                .return_())));`
        }
      }
    ],
    deprecations: [
      { what: "Old GC flags", kind: "obsolete", note: "Several long-deprecated GC tuning flags removed or made no-ops." }
    ]
  }
);
