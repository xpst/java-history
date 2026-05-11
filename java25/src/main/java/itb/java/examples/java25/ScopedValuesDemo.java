package itb.java.examples.java25;

/** Scoped Values (final, JEP 506) — immutable, scoped data carriers for callee-only
 *  reads. They replace many {@code ThreadLocal} use cases: cheaper, scope-safe, and
 *  naturally cleared at scope exit. */
public class ScopedValuesDemo {

    public static final ScopedValue<String> REQUEST_ID = ScopedValue.newInstance();

    public static void main(String[] args) {
        ScopedValue.where(REQUEST_ID, "req-42").run(() -> {
            handle();
        });
        System.out.println("after scope: bound? " + REQUEST_ID.isBound());
    }

    static void handle() {
        System.out.println("handling request " + REQUEST_ID.get());
    }

    public static String runWithRequestId(String id) {
        return ScopedValue.where(REQUEST_ID, id).call(() -> REQUEST_ID.get());
    }

    public static boolean boundOutsideScope() {
        return REQUEST_ID.isBound();
    }
}
