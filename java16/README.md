# Java 16

Records and pattern matching for `instanceof` both ship as final; `Stream.toList()` lands as the one-call replacement for `collect(toUnmodifiableList())`.

## Features

- [Records](src/main/java/itb/java/examples/java16/Records.java) — concise nominal tuples (final, JEP 395).
- [Pattern matching for `instanceof`](src/main/java/itb/java/examples/java16/PatternMatchingInstanceOf.java) — type-check and bind in one (final, JEP 394).
- [`Stream.toList()`](src/main/java/itb/java/examples/java16/StreamToList.java) — terminal op returning an unmodifiable list.

Build & test: `../build.sh java16 test`
