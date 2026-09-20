package itb.java.examples.java27;

import com.sun.management.HotSpotDiagnosticMXBean;
import com.sun.management.VMOption;

import java.lang.management.ManagementFactory;

/** Compact Object Headers by Default (final, JEP 534).
 *
 *  <p>Project Lilliput shrinks the object header on 64-bit platforms from 96 bits
 *  to 64. It was experimental in Java 24 (JEP 450), a supported product option in
 *  25, and is the default layout as of Java 27 — every object on the heap is 4
 *  bytes smaller, with no flag required.
 *
 *  <p>A related change: {@code UseCompressedClassPointers} became obsolete in 27
 *  (JDK-8363996). The JVM now always compresses class pointers, so the flag no
 *  longer exists and {@link HotSpotDiagnosticMXBean#getVMOption(String)} rejects it. */
public final class CompactObjectHeaders {

    private CompactObjectHeaders() {
    }

    public static HotSpotDiagnosticMXBean diagnostics() {
        return ManagementFactory.getPlatformMXBean(HotSpotDiagnosticMXBean.class);
    }

    /** Whether compact object headers are active in this JVM. */
    public static boolean enabled() {
        return Boolean.parseBoolean(flag("UseCompactObjectHeaders").getValue());
    }

    /** Where the flag's current value came from: DEFAULT, ERGONOMIC, COMMAND_LINE, ... */
    public static String origin(String flagName) {
        return flag(flagName).getOrigin().name();
    }

    public static VMOption flag(String flagName) {
        return diagnostics().getVMOption(flagName);
    }

    /** False on Java 27+, where the flag was made obsolete and removed. */
    public static boolean hasCompressedClassPointersFlag() {
        try {
            flag("UseCompressedClassPointers");
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public static void main(String[] args) {
        System.out.println("UseCompactObjectHeaders = " + enabled()
                + "  (origin: " + origin("UseCompactObjectHeaders") + ")");
        System.out.println("UseCompressedClassPointers still a flag? " + hasCompressedClassPointersFlag());
        System.out.println();
        System.out.println("Header size dropped from 96 to 64 bits per object.");
        System.out.println("Opt out with -XX:-UseCompactObjectHeaders (itself slated for deprecation).");
    }
}
