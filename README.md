# Java Evolution — Features & Deprecations from Java 8 to Today

This repository pairs **runnable Java code examples** for every release from Java 7 through Java 25 with a **static reference website** summarizing each release's headline features and deprecations.

The two halves reinforce each other: the website shows what changed in each release at a glance; the per-version Maven modules let you compile, run, and test the actual feature in code.

## Repository layout

| Path | What lives here |
| --- | --- |
| `java7/` … `java25/` | One standalone Maven module per Java release. Each holds 1–3 feature demos plus matching JUnit 5 tests. |
| `docs/` | The static reference website (HTML / CSS / React + Babel). Served by GitHub Pages. |
| `docs/vendor/` | React, ReactDOM, Babel-standalone, and Google Fonts (CSS + woff2) vendored locally so the site works offline. |
| `maven-settings.xml` | Project-local Maven settings file used by the build wrapper. |
| `build.sh` | Convenience wrapper that pins JDK 25 and dispatches to one (or all) of the per-version modules. |

There is no aggregator `pom.xml` at the repo root — each `java<N>/` directory is its own independently buildable Maven project.

## The reference website (`docs/`)

The site is a build-tool-free static page: React 18, Babel standalone, a small custom syntax highlighter, and the Google Fonts (Newsreader / IBM Plex Sans / JetBrains Mono) used for typography are all served from `docs/vendor/`. No bundler, no Node, no `package.json`, and **no external network requests at runtime**.

### View it locally

```bash
cd docs
python3 -m http.server 8000
# open http://localhost:8000/ in a browser
```

### Published on GitHub Pages

The site is published from the `/docs` folder on the default branch. After enabling GitHub Pages with **Settings → Pages → Source: Deploy from a branch → Branch: main, Folder: /docs**, the URL pattern is `https://<github-username>.github.io/<repo-name>/`.

### Site data

`docs/data.js` is the single source of truth for all version entries on the site. Each version is an object with `version`, `date`, `lts`, `blurb`, a `features` array, and a `deprecations` array. Add or amend entries there to update the site.

## Java code examples

Each `java<N>/` follows the same shape:

```
java<N>/
├── pom.xml                                       # standalone, JUnit 5, release=N
├── README.md                                     # feature index for this release
└── src/
    ├── main/java/itb/java/examples/java<N>/
    │   └── <Feature>.java                        # runnable demo with main()
    └── test/java/itb/java/examples/java<N>/
        └── <Feature>Test.java                    # JUnit 5 test in the same package
```

Per-module READMEs:

| Module | Release | Highlights |
| --- | --- | --- |
| [java7](java7/README.md) | 2011 | Binary / underscore literals, switch on String, try-with-resources, multi-catch, diamond operator |
| [java8](java8/README.md) | 2014 | Lambdas, Stream API, Optional |
| [java9](java9/README.md) | 2017 | Collection factories, private interface methods, Stream enhancements |
| [java10](java10/README.md) | 2018 | `var`, `List.copyOf`, unmodifiable collectors |
| [java11](java11/README.md) | 2018 LTS | HTTP Client, String methods, `Files.readString`/`writeString` |
| [java12](java12/README.md) | 2019 | Compact number formatting, `String.indent`/`transform`, `Files.mismatch` |
| [java13](java13/README.md) | 2019 | `ByteBuffer.slice(int, int)`, `FileSystems.newFileSystem(Path, Map)` |
| [java14](java14/README.md) | 2020 | Switch expressions, helpful `NullPointerException` messages |
| [java15](java15/README.md) | 2020 | Text blocks, `String.formatted`, EdDSA |
| [java16](java16/README.md) | 2021 | Records, pattern matching for `instanceof`, `Stream.toList()` |
| [java17](java17/README.md) | 2021 LTS | Sealed classes, enhanced PRNG, deserialization filters |
| [java18](java18/README.md) | 2022 | UTF-8 by default, Simple Web Server, Javadoc `@snippet` |
| [java19](java19/README.md) | 2022 | Sized collection factories, `Future.state()`, `ExecutorService` AutoCloseable |
| [java20](java20/README.md) | 2023 | Runtime version inspection (release was preview-heavy) |
| [java21](java21/README.md) | 2023 LTS | Virtual threads, pattern matching for switch, sequenced collections |
| [java22](java22/README.md) | 2024 | Unnamed variables, FFM API, multi-file source-code launch |
| [java23](java23/README.md) | 2024 | Markdown in Javadoc, GC info |
| [java24](java24/README.md) | 2025 | Stream gatherers, Class-File API |
| [java25](java25/README.md) | 2025 LTS | Compact source files & instance `main`, module imports, scoped values |

## Building & testing

The repo pins **JDK 25** and a project-local `maven-settings.xml`; the `build.sh` wrapper handles both:

```bash
./build.sh                                          # build every module (clean package)
./build.sh java8                                    # build just java8
./build.sh java8 test                               # build just java8, target test
./build.sh java8 -Dtest=LambdasTest test            # run a single test class
./build.sh -DskipTests                              # build everything, skip tests
./build.sh --help                                   # usage
```

The wrapper sets `JAVA_HOME` to the pinned JDK location, prepends its `bin/` to `PATH`, and passes `-s ./maven-settings.xml` so the project always builds against the same Maven configuration. Override the JDK location with `JAVA_HOME_OVERRIDE=/path/to/jdk` if needed.

Direct `mvn` invocation also works for any module:

```bash
cd java8
JAVA_HOME=/workspace/soft/jdk-25.0.3+9 PATH="$JAVA_HOME/bin:$PATH" \
  mvn -s ../maven-settings.xml clean package
```

## Adding a new Java release

1. Create `java<N>/` mirroring an existing module (e.g., copy from `java21/`).
2. Set `<release>N</release>` in the new `java<N>/pom.xml`.
3. Add feature classes under `src/main/java/itb/java/examples/java<N>/<Feature>.java`, each with a `main()` that demonstrates the feature.
4. Add matching `<Feature>Test.java` files under `src/test/java/itb/java/examples/java<N>/` in the **same package**.
5. Update `java<N>/README.md` with a feature index.
6. Optionally add a matching entry to `docs/data.js` so the site picks up the new release.

Run `./build.sh java<N> test` to verify; then `./build.sh` to confirm the full sweep is still green.
