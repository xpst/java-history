# Java 15

Text blocks ship as final, EdDSA arrives in the standard crypto library, and ZGC/Shenandoah become production GCs.

## Features

- [Text blocks](src/main/java/itb/java/examples/java15/TextBlocks.java) — multi-line string literals (finalized JEP 378).
- [String.formatted / stripIndent / translateEscapes](src/main/java/itb/java/examples/java15/StringNewMethods.java) — companion API added with text blocks.
- [EdDSA (Ed25519) signatures](src/main/java/itb/java/examples/java15/EdDsaCrypto.java) — built-in elliptic-curve signing.

Build & test: `../build.sh java15 test`
