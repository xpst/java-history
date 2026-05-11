package itb.java.examples.java15;

/** {@code String.formatted}, {@code String.stripIndent}, {@code String.translateEscapes}
 *  — added alongside text blocks. */
public class StringNewMethods {

    public static void main(String[] args) {
        String msg = "user %s scored %d".formatted("ada", 42);
        System.out.println(msg);

        String raw = "   hello\n   world\n";
        System.out.println("[" + raw.stripIndent() + "]");

        String withEscapes = "line1\\nline2\\t!".translateEscapes();
        System.out.println(withEscapes);
    }

    public static String greet(String name) {
        return "Hello, %s!".formatted(name);
    }

    public static String unescape(String source) {
        return source.translateEscapes();
    }
}
