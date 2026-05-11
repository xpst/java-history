package itb.java.examples.java22;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ForeignMemorySegmentsTest {

    @Test
    void roundTripPreservesAllInts() {
        int[] input = {1, 2, 3, 5, 8, 13, 21};
        assertArrayEquals(input, ForeignMemorySegments.roundTripInts(input));
    }

    @Test
    void nativeByteOrderIsKnown() {
        assertNotNull(ForeignMemorySegments.nativeByteOrder());
    }
}
