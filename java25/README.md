# Java 25 (LTS)

The fourth LTS of the six-month cadence. Compact source files, module-level imports, scoped values, and structured concurrency all reach final status.

## Features

- [Compact source files & instance `main`](src/main/java/itb/java/examples/java25/CompactSourceMain.java) — minimal entry points (final, JEP 512).
- [Module imports](src/main/java/itb/java/examples/java25/ModuleImportsDemo.java) — `import module java.base;` (final, JEP 511).
- [Scoped values](src/main/java/itb/java/examples/java25/ScopedValuesDemo.java) — immutable, scope-bound data carriers (final, JEP 506).

Build & test: `../build.sh java25 test`
