# Java 22

Unnamed bindings replace "we have to give it a name we don't care about." Foreign Function & Memory API graduates from preview. The `java` launcher can now run multi-file source programs without javac.

## Features

- [Unnamed variables and patterns](src/main/java/itb/java/examples/java22/UnnamedVariablesAndPatterns.java) — `_` for unused names (final, JEP 456).
- [Foreign Memory segments](src/main/java/itb/java/examples/java22/ForeignMemorySegments.java) — off-heap memory via `Arena` / `MemorySegment` (final, JEP 454).
- [Multi-file source-code launch](src/main/java/itb/java/examples/java22/MultiFileSourceLaunch.java) — run multi-file programs without `javac` (JEP 458).

Build & test: `../build.sh java22 test`
