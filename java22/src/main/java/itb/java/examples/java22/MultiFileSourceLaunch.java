package itb.java.examples.java22;

/** Launch Multi-File Source-Code Programs (final, JEP 458). Since Java 22 the
 *  {@code java} launcher can compile and run an entry-point {@code .java} file
 *  together with the other {@code .java} files in the same directory tree without
 *  a separate {@code javac} step or build tool.
 *
 *  <p>To launch this demo directly without Maven:
 *  <pre>
 *  cd src/main/java
 *  java itb/java/examples/java22/MultiFileSourceLaunch.java
 *  </pre>
 *
 *  The launcher resolves references to other classes in the source tree on the fly. */
public class MultiFileSourceLaunch {

    public static void main(String[] args) {
        Helper h = new Helper("multi-file launch");
        System.out.println(h.greet());
        System.out.println("launcher mode available since Java 22.");
    }

    /** Companion class in the same package — picked up automatically by the launcher. */
    static class Helper {
        private final String name;
        Helper(String name) { this.name = name; }
        String greet() { return "Hello from " + name + "!"; }
    }
}
