# Java 14

Switch expressions land as a final language feature; the JVM starts naming the variable that produced a `NullPointerException`. Most other JEPs (records, pattern matching for `instanceof`, text blocks) remained in preview here.

## Features

- [Switch expressions](src/main/java/itb/java/examples/java14/SwitchExpressions.java) — arrow form, `yield`, exhaustive over enums, expression-position results.
- [Helpful NullPointerExceptions](src/main/java/itb/java/examples/java14/HelpfulNullPointerExceptions.java) — JVM now points to the exact null dereference in a chain.

Build & test: `../build.sh java14 test`
