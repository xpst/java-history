# Java 12

Mostly a setup release for upcoming previews. Headline finalized additions are scattered API improvements.

## Features

- [Compact number formatting](src/main/java/itb/java/examples/java12/CompactNumberFormatting.java) — locale-aware "1.5K" / "2.3M".
- [`String.indent` & `String.transform`](src/main/java/itb/java/examples/java12/StringIndentTransform.java) — line-level reformatting and fluent transformation.
- [`Files.mismatch`](src/main/java/itb/java/examples/java12/FilesMismatchDemo.java) — byte-level diff position for two files.

Build & test: `../build.sh java12 test`
