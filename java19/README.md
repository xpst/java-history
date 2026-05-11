# Java 19

Headline JEPs (virtual threads, structured concurrency, pattern matching for switch) were preview/incubator in 19 — they ship as final in 21. The finalized additions are a handful of useful API touches.

## Features

- [Sized collection factories](src/main/java/itb/java/examples/java19/SizedCollectionFactories.java) — `HashMap.newHashMap(int)` and friends.
- [`Future.state()`](src/main/java/itb/java/examples/java19/FutureStateDemo.java) — inspect lifecycle state without polling result/exception.
- [`ExecutorService` is `AutoCloseable`](src/main/java/itb/java/examples/java19/ExecutorServiceAutoClose.java) — try-with-resources owns shutdown.

Build & test: `../build.sh java19 test`
