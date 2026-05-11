# Java 20

Java 20 finalized **no headline language/API JEPs**. It was the preview/incubator round for the features that ship as final in Java 21 (virtual threads, pattern matching for switch, record patterns, scoped values, structured concurrency). Useful additions in 20 were almost entirely small internal/JVM improvements.

The single demo here illustrates programmatic access to `Runtime.Version`, which is the cleanest way for a library to feature-gate behavior on the running JVM version.

## Features

- [Runtime.Version inspection](src/main/java/itb/java/examples/java20/RuntimeVersionDemo.java) — programmatic JVM version reasoning.

Build & test: `../build.sh java20 test`
