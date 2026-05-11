# Java 24

Stream gatherers and the Class-File API both ship as final, retiring large categories of third-party libraries from active use.

## Features

- [Stream Gatherers](src/main/java/itb/java/examples/java24/StreamGathererDemo.java) — custom intermediate stream operations (final, JEP 485).
- [Class-File API](src/main/java/itb/java/examples/java24/ClassFileApiDemo.java) — read/write `.class` files via a typed model (final, JEP 484).

Build & test: `../build.sh java24 test`
