package itb.java.examples.java15;

/** Text blocks (finalized in JEP 378) — multi-line string literals with automatic
 *  incidental-whitespace stripping. */
public class TextBlocks {

    public static void main(String[] args) {
        String json = """
                {
                  "name": "ada",
                  "year": 1815
                }
                """;
        System.out.println(json);

        String html = """
                <p>
                  Hello, <em>world</em>.
                </p>
                """;
        System.out.println(html);
    }

    public static String userJson(String name, int year) {
        return """
                {
                  "name": "%s",
                  "year": %d
                }
                """.formatted(name, year);
    }

    public static String shortHtml() {
        return """
                <p>hi</p>""";
    }
}
