package itb.java.examples.java23;

/// Demonstrates **Markdown** documentation comments introduced in JEP 467.
///
/// Markdown comments use the triple-slash `///` syntax and accept standard
/// CommonMark constructs in place of the HTML tags Javadoc used to require:
///
/// - lists with leading dashes
/// - inline `code spans`
/// - **bold** and *italic*
/// - [reference links](https://openjdk.org/jeps/467)
///
/// The runtime semantics are unchanged — Markdown is purely a documentation
/// affordance handled by javadoc.
public class MarkdownJavadoc {

    /// Returns the input unchanged.
    ///
    /// Useful for demonstrating that a markdown-documented method behaves
    /// exactly like one with HTML-tagged Javadoc.
    public static String echo(String input) {
        return input;
    }

    /// Adds two numbers.
    ///
    /// ```java
    /// // markdown fences render as code blocks in the generated documentation
    /// MarkdownJavadoc.add(2, 3); // → 5
    /// ```
    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(echo("hello"));
        System.out.println("2 + 3 = " + add(2, 3));
    }
}
