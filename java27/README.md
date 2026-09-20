# Java 27

Nine JEPs, none of them a language change. Java 27 is a release about defaults: G1 becomes the collector on every machine, compact object headers switch on by themselves, and TLS 1.3 gains post-quantum hybrid key exchange without a line of application code.

## Features

- [Post-quantum hybrid key exchange](src/main/java/itb/java/examples/java27/PostQuantumTls.java) - `X25519MLKEM768` leads the default TLS named-group list (final, JEP 527).
- [Compact object headers by default](src/main/java/itb/java/examples/java27/CompactObjectHeaders.java) - 96-bit headers drop to 64 with no flag (final, JEP 534).
- [G1 everywhere](src/main/java/itb/java/examples/java27/G1Everywhere.java) - no more Serial-by-ergonomics on small machines (final, JEP 523).

Build & test: `../build.sh java27 test`

This module needs **JDK 27** (`--release 27` requires javac 27). `build.sh` resolves it automatically through `jdk_for_module()`.

## What the demos assert

All three features are JVM-level, so the demos read the running JVM's own state rather than calling a new API:

- `PostQuantumTls` reads `SSLContext.getDefault().getDefaultSSLParameters().getNamedGroups()` and checks the hybrid scheme is first. It also shows the two non-default hybrids (`SecP256r1MLKEM768`, `SecP384r1MLKEM1024`) being selected explicitly. No network traffic is involved.
- `CompactObjectHeaders` reads `UseCompactObjectHeaders` through `HotSpotDiagnosticMXBean` and asserts both that it is on and that its origin is `DEFAULT`. It also checks that `UseCompressedClassPointers` no longer exists, which became obsolete in 27 (JDK-8363996).
- `G1Everywhere` reads the `GarbageCollectorMXBean` list and asserts a G1 collector is active without any `-XX:+UseG1GC` flag.

## The fourth finalized JEP

JEP 536 (JFR In-Process Data Redaction) is finalized in 27 but has no Java API - it is configured entirely through `-XX:FlightRecorderOptions:redact-key=...` and `redact-argument=...`, so there is nothing to demo in code. The site entry (`docs/data/java27.js`) covers it with shell examples.

## Why only three demos?

Java 27 is preview-heavy: 5 of its 9 JEPs are previews or incubators (Lazy Constants 3rd, Primitive Patterns 5th, Structured Concurrency 7th, PEM Encodings 3rd, Vector API 12th incubator). Per the project convention this module ships **only finalized** features, so everything compiles with `--release 27` and no `--enable-preview`. The site covers the preview work too, tagged `preview` and hidden by the "Hide previews" toggle.
