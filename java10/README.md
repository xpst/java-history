# Java 10

Six-month cadence opens with local-variable type inference and immutability conveniences.

## Features

- [Local-variable type inference (`var`)](src/main/java/itb/java/examples/java10/LocalVariableTypeInference.java) — concise local declarations.
- [`List.copyOf` / `Set.copyOf` / `Map.copyOf`](src/main/java/itb/java/examples/java10/CopyOfCollections.java) — truly immutable snapshots.
- [`Collectors.toUnmodifiableList/Set/Map`](src/main/java/itb/java/examples/java10/UnmodifiableCollectors.java) — terminal collectors that yield immutable results.

Build & test: `../build.sh java10 test`
