# Java 13

A small-surface release in terms of finalized features (most headline JEPs were preview/incubator). Two finalized API touches are demonstrated here; switch-expression `yield` and text blocks remained preview in 13.

## Features

- [`ByteBuffer.slice(int, int)`](src/main/java/itb/java/examples/java13/ByteBufferSliceOverloads.java) — explicit-range slicing without position/limit manipulation.
- [`FileSystems.newFileSystem(Path, Map)`](src/main/java/itb/java/examples/java13/FileSystemsNewFromPath.java) — open a zip/jar file system from a Path.

Build & test: `../build.sh java13 test`
