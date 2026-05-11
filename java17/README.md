# Java 17 (LTS)

Second LTS of the six-month cadence. Sealed classes are finalized, the random API gets a long-overdue overhaul, and serialization gains per-stream filters.

## Features

- [Sealed classes](src/main/java/itb/java/examples/java17/SealedClasses.java) — explicit, compiler-checked hierarchy closure (JEP 409).
- [Enhanced PRNG](src/main/java/itb/java/examples/java17/RandomGenerators.java) — `RandomGenerator` / `RandomGeneratorFactory` (JEP 356).
- [Deserialization filters](src/main/java/itb/java/examples/java17/DeserializationFilters.java) — `ObjectInputFilter` per stream (JEP 415).

Build & test: `../build.sh java17 test`
