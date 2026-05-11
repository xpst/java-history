/* Java 8 — March 18, 2014 */
window.JAVA_DATA.push(
  {
    version: 8,
    date: "March 18, 2014",
    codename: null,
    lts: true,
    blurb: "The watershed release. Lambdas, the Stream API, and a brand-new date/time library reshaped how Java code is written more than any version before or since.",
    features: [
      {
        name: "Lambda expressions",
        summary: "First-class functions, finally.",
        desc: "Anonymous-class boilerplate collapses into a single expression. Combined with functional interfaces, lambdas made Java's collection and concurrency APIs dramatically more expressive and enabled the Stream API.",
        tag: "language",
        before: {
          lang: "java",
          code: `Collections.sort(people, new Comparator<Person>() {
    @Override
    public int compare(Person a, Person b) {
        return a.getLastName().compareTo(b.getLastName());
    }
});`
        },
        after: {
          lang: "java",
          code: `// Lambda + method reference
people.sort((a, b) -> a.getLastName().compareTo(b.getLastName()));
people.sort(Comparator.comparing(Person::getLastName));`
        }
      },
      {
        name: "Stream API",
        summary: "Declarative pipelines for collections.",
        desc: "java.util.stream lets you chain map/filter/reduce operations over collections (and sources like files or generators). Streams encourage immutability, can run in parallel with one call, and pair naturally with lambdas.",
        tag: "api",
        code: {
          lang: "java",
          code: `List<String> topNames = people.stream()
    .filter(p -> p.getAge() >= 18)
    .map(Person::getFullName)
    .sorted()
    .limit(10)
    .collect(Collectors.toList());

double avgAge = people.parallelStream()
    .mapToInt(Person::getAge)
    .average()
    .orElse(0.0);`
        }
      },
      {
        name: "Optional<T>",
        summary: "A container for \"maybe null\".",
        desc: "Optional makes the absence of a value explicit in the type system, replacing many sentinel-null returns. Use it on return types; avoid it for parameters and fields.",
        tag: "api",
        code: {
          lang: "java",
          code: `Optional<User> user = repo.findById(id);

String displayName = user
    .map(User::getName)
    .filter(n -> !n.isEmpty())
    .orElse("Anonymous");

user.ifPresent(u -> log.info("found {}", u));
if (!user.isPresent()) log.warn("missing user {}", id);
// Note: Optional.ifPresentOrElse and String.isBlank arrived in Java 9 and 11.`
        }
      },
      {
        name: "java.time (JSR-310)",
        summary: "A modern, immutable date/time API.",
        desc: "Replaces the much-maligned java.util.Date and Calendar with immutable types: Instant, LocalDate, LocalDateTime, ZonedDateTime, Duration, Period. Thread-safe and timezone-aware by design.",
        tag: "api",
        code: {
          lang: "java",
          code: `LocalDate today = LocalDate.now();
LocalDate releaseDay = LocalDate.of(2014, Month.MARCH, 18);
Period since = Period.between(releaseDay, today);

ZonedDateTime meeting = ZonedDateTime
    .of(2026, 5, 12, 14, 30, 0, 0, ZoneId.of("Europe/Berlin"));

Duration timeLeft = Duration.between(Instant.now(), meeting.toInstant());`
        }
      },
      {
        name: "Default methods",
        summary: "Interfaces can ship behavior.",
        desc: "Default methods let interfaces evolve without breaking implementers — a prerequisite for retrofitting forEach, stream, and friends onto Collection. Use sparingly; an interface is still a contract first.",
        tag: "language",
        code: {
          lang: "java",
          code: `public interface Greeter {
    String name();

    default String greet() {
        return "Hello, " + name() + "!";
    }

    static Greeter of(String n) {
        return () -> n;
    }
}`
        }
      },
      {
        name: "CompletableFuture",
        summary: "Composable async without callback hell.",
        desc: "A Future you can chain, combine, and complete by hand. Replaces nested Future.get() patterns with thenApply/thenCompose/thenCombine pipelines and timeout/exception hooks.",
        tag: "api",
        code: {
          lang: "java",
          code: `CompletableFuture<String> page = CompletableFuture
    .supplyAsync(() -> http.get(url))
    .thenApply(this::parse)
    .thenCompose(this::enrich)
    .exceptionally(ex -> "fallback: " + ex.getMessage());

page.thenAccept(System.out::println);
// Note: .orTimeout / .completeOnTimeout arrived in Java 9.
// In Java 8 you wired a ScheduledExecutorService to complete the future yourself.`
        }
      }
    ],
    deprecations: [
      { what: "PermGen", kind: "removed", note: "Metaspace replaces it; class metadata now lives in native memory and grows as needed." },
      { what: "Old date/time types", kind: "discouraged", note: "java.util.Date and Calendar remain but are superseded by java.time for all new code." }
    ]
  }
);
