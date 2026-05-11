package itb.java.examples.java9;

/** Private interface methods — interfaces can now declare {@code private} helpers
 *  that are shared between default methods without leaking into the public API. */
public class PrivateInterfaceMethods {

    public interface Greeter {
        default String greet(String name) {
            return prefix() + " " + sanitize(name);
        }

        default String shout(String name) {
            return prefix().toUpperCase() + " " + sanitize(name).toUpperCase() + "!";
        }

        private String prefix() {
            return "Hello,";
        }

        private static String sanitize(String name) {
            return name == null ? "stranger" : name.trim();
        }
    }

    public static void main(String[] args) {
        Greeter g = new Greeter() {};
        System.out.println(g.greet("  Alice  "));
        System.out.println(g.shout(null));
    }
}
