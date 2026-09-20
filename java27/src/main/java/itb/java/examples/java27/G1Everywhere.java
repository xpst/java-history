package itb.java.examples.java27;

import java.lang.management.GarbageCollectorMXBean;
import java.lang.management.ManagementFactory;
import java.util.List;

/** Make G1 the Default Garbage Collector in All Environments (final, JEP 523).
 *
 *  <p>G1 has been the default since Java 9 — but only on machines HotSpot judged
 *  "server-class". A single CPU, or less than 1792 MB of RAM, and ergonomics
 *  silently chose the Serial collector instead, which regularly surprised people
 *  running containers with tight resource limits.
 *
 *  <p>Java 27 removes the split: G1 is now competitive with Serial at every heap
 *  size, so it is selected unconditionally when no collector is requested. Serial
 *  remains available via {@code -XX:+UseSerialGC}. */
public final class G1Everywhere {

    private G1Everywhere() {
    }

    public static List<GarbageCollectorMXBean> activeCollectors() {
        return ManagementFactory.getGarbageCollectorMXBeans();
    }

    public static List<String> activeCollectorNames() {
        return activeCollectors().stream().map(GarbageCollectorMXBean::getName).toList();
    }

    /** True when this JVM is running G1, whatever the machine's size. */
    public static boolean usingG1() {
        return activeCollectorNames().stream().anyMatch(name -> name.startsWith("G1"));
    }

    public static void main(String[] args) {
        System.out.println("active garbage collectors:");
        for (String name : activeCollectorNames()) {
            System.out.println("  - " + name);
        }
        System.out.println();
        System.out.println("running G1? " + usingG1());
        System.out.println("available processors: " + Runtime.getRuntime().availableProcessors());
        System.out.println("max heap (MB):        " + (Runtime.getRuntime().maxMemory() >> 20));
        System.out.println();
        System.out.println("Before JDK 27 a small-enough machine would have been given SerialGC here.");
    }
}
