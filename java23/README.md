# Java 23

Mostly an incremental release on the road to Java 25. Generational ZGC becomes the default ZGC mode, Markdown lands in Javadoc, and `sun.misc.Unsafe` is officially on the chopping block. Stream gatherers and most language features stayed preview.

## Features

- [Markdown in Javadoc](src/main/java/itb/java/examples/java23/MarkdownJavadoc.java) — `///` comments + CommonMark (JEP 467).
- [GC information](src/main/java/itb/java/examples/java23/GcInfo.java) — inspect the JVM's chosen collectors (companion to JEP 474: Generational ZGC default).

Build & test: `../build.sh java23 test`
