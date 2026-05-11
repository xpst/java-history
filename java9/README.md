# Java 9

Brought modularity, the REPL, and a handful of refined APIs.

## Features

- [Collection factories](src/main/java/itb/java/examples/java9/CollectionFactories.java) — `List.of`, `Set.of`, `Map.of` for immutable literals.
- [Private interface methods](src/main/java/itb/java/examples/java9/PrivateInterfaceMethods.java) — share implementation across default methods without leaking it.
- [Stream enhancements](src/main/java/itb/java/examples/java9/StreamEnhancements.java) — `takeWhile`, `dropWhile`, and the bounded `iterate` overload.

Build & test: `../build.sh java9 test`
