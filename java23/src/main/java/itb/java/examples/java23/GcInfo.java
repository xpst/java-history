package itb.java.examples.java23;

import java.lang.management.GarbageCollectorMXBean;
import java.lang.management.ManagementFactory;
import java.util.List;

/** Inspect the running JVM's GC choice. Java 23 finalized **generational ZGC** as
 *  the default ZGC mode (JEP 474). Whatever GC you observe here depends on JVM
 *  flags at launch time; this demo just reports what's actually in effect. */
public class GcInfo {

    public static void main(String[] args) {
        List<GarbageCollectorMXBean> gcs = activeGcs();
        System.out.println("active garbage collectors:");
        for (GarbageCollectorMXBean gc : gcs) {
            System.out.println("  - " + gc.getName());
        }
    }

    public static List<GarbageCollectorMXBean> activeGcs() {
        return ManagementFactory.getGarbageCollectorMXBeans();
    }

    public static List<String> activeGcNames() {
        return activeGcs().stream().map(GarbageCollectorMXBean::getName).toList();
    }
}
