package itb.java.examples.java12;

/** {@code String.indent} and {@code String.transform} — readable line-level reformatting
 *  and arbitrary stringly transformations as part of a fluent chain. */
public class StringIndentTransform {

    public static void main(String[] args) {
        String raw = "one\ntwo\nthree";
        System.out.println(raw.indent(4));

        String shouted = "hello".transform(s -> s.toUpperCase() + "!");
        System.out.println(shouted);
    }

    public static String indented(String text, int spaces) {
        return text.indent(spaces);
    }

    public static String transformLength(String text) {
        return text.transform(s -> s.length() + ":" + s);
    }
}
