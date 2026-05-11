# Java 11

The first LTS of the six-month cadence. Standardizes the HTTP client and rounds out String/Files ergonomics.

## Features

- [HTTP Client](src/main/java/itb/java/examples/java11/HttpClientDemo.java) — `java.net.http.HttpClient`, replacing `HttpURLConnection`.
- [String enhancements](src/main/java/itb/java/examples/java11/StringEnhancements.java) — `isBlank`, `lines`, `repeat`, `strip`.
- [`Files.readString` / `Files.writeString`](src/main/java/itb/java/examples/java11/FilesReadWriteString.java) — single-call text I/O.

Build & test: `../build.sh java11 test`
