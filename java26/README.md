# Java 26

First release after the Java 25 LTS. HTTP/3 lands in the standard `HttpClient`, the AOT cache works under any garbage collector, G1 sheds synchronization overhead, and the Applet API is finally removed.

## Features

- [HTTP/3 for `HttpClient`](src/main/java/itb/java/examples/java26/Http3Demo.java) — opt-in HTTP/3 in `java.net.http` (final, JEP 517).

Build & test: `../build.sh java26 test`

## Why only one runnable demo?

Java 26 is preview-heavy — 5 of the 10 JEPs are previews or incubators (Primitive Patterns 4th, Structured Concurrency 6th, Lazy Constants 2nd, PEM Encodings 2nd, Vector API 11th incubator). Per the project convention, the module ships **only finalized** features so the code compiles cleanly with `--release 26` and no `--enable-preview`. The site (`docs/data/java26.js`) covers the preview features too — they're tagged `preview` and hide behind the "Hide previews" toggle.

The other finalized Java 26 JEPs are JVM-level — JEP 516 (AOT object caching with any GC), JEP 522 (G1 throughput), JEP 500 (deep-reflection-mutates-final warnings), and JEP 504 (Applet removal) — none of them really lend themselves to a code demo, so HTTP/3 carries the module alone.
