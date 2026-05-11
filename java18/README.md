# Java 18

UTF-8 finally becomes the platform-default charset, the JDK ships a basic static-file HTTP server, and Javadoc gains structured code snippets.

## Features

- [UTF-8 by default](src/main/java/itb/java/examples/java18/Utf8ByDefault.java) — `Charset.defaultCharset()` is now UTF-8 everywhere (JEP 400).
- [Simple Web Server](src/main/java/itb/java/examples/java18/SimpleWebServerDemo.java) — `SimpleFileServer` / `jwebserver` (JEP 408).
- [Javadoc `@snippet`](src/main/java/itb/java/examples/java18/JavadocSnippets.java) — structured inline code samples (JEP 413).

Build & test: `../build.sh java18 test`
