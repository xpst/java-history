package itb.java.examples.java22;

import java.lang.foreign.Arena;
import java.lang.foreign.MemoryLayout;
import java.lang.foreign.MemorySegment;
import java.lang.foreign.ValueLayout;
import java.nio.ByteOrder;

/** Foreign Function &amp; Memory API (final, JEP 454) — allocate and operate on
 *  native (off-heap) memory with type-safe accessors, without {@code sun.misc.Unsafe}. */
public class ForeignMemorySegments {

    public static void main(String[] args) {
        try (Arena arena = Arena.ofConfined()) {
            MemoryLayout layout = MemoryLayout.sequenceLayout(8, ValueLayout.JAVA_INT);
            MemorySegment segment = arena.allocate(layout);

            for (long i = 0; i < 8; i++) {
                segment.setAtIndex(ValueLayout.JAVA_INT, i, (int) (i * i));
            }

            long sum = 0;
            for (long i = 0; i < 8; i++) {
                sum += segment.getAtIndex(ValueLayout.JAVA_INT, i);
            }
            System.out.println("sum of i² for i in [0,8): " + sum);
        }
    }

    /** Allocate a confined off-heap segment, fill it with the given ints, and
     *  read them back. The arena is closed inside the method. */
    public static int[] roundTripInts(int[] values) {
        try (Arena arena = Arena.ofConfined()) {
            MemorySegment seg = arena.allocate((long) values.length * Integer.BYTES);
            for (int i = 0; i < values.length; i++) {
                seg.setAtIndex(ValueLayout.JAVA_INT, i, values[i]);
            }
            int[] out = new int[values.length];
            for (int i = 0; i < out.length; i++) {
                out[i] = seg.getAtIndex(ValueLayout.JAVA_INT, i);
            }
            return out;
        }
    }

    public static ByteOrder nativeByteOrder() {
        return ByteOrder.nativeOrder();
    }
}
