# Java 21 (LTS)

The third LTS of the six-month cadence. Virtual threads, pattern matching for switch, and record patterns all ship as final; sequenced collections unify first/last/reverse access across ordered containers.

## Features

- [Virtual threads](src/main/java/itb/java/examples/java21/VirtualThreads.java) — lightweight user-mode threads (final, JEP 444).
- [Pattern matching for switch](src/main/java/itb/java/examples/java21/PatternMatchingSwitch.java) — type / record patterns, guards, null branches (final, JEP 441).
- [Sequenced collections](src/main/java/itb/java/examples/java21/SequencedCollections.java) — `getFirst` / `getLast` / `reversed` on any ordered collection (JEP 431).

Build & test: `../build.sh java21 test`
