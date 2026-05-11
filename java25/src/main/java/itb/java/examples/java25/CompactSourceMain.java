package itb.java.examples.java25;

/** Compact source files & instance main methods (final, JEP 512).
 *
 * <p>In Java 25, an entry-point file can omit the surrounding {@code class}
 * declaration and use a plain {@code void main()} signature. This demo class
 * keeps the wrapper because it lives in a multi-class module, but shows the
 * minimal instance-main signature alongside the classic static one.
 *
 * <p>To run the truly compact form, drop a file containing only:
 * <pre>
 * void main() {
 *     System.out.println("Hello, Java 25!");
 * }
 * </pre>
 * and launch it with {@code java Hello.java}. */
public class CompactSourceMain {

    /** Instance main (no static, no args). Valid since JEP 512. */
    void main() {
        System.out.println("hello from instance main");
    }

    /** Static main retained for IDEs / launchers that still default to it. */
    public static void main(String[] args) {
        new CompactSourceMain().main();
        System.out.println("greeting: " + greet("world"));
    }

    public static String greet(String name) {
        return "hello, " + name;
    }
}
