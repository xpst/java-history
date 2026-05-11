package itb.java.examples.java9;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;

class StreamEnhancementsTest {

    @Test
    void rangeBoundedIncludesEndpoints() {
        assertEquals(Arrays.asList(1, 2, 3, 4, 5), StreamEnhancements.rangeBounded(1, 5));
    }

    @Test
    void rangeBoundedEmptyWhenStartExceedsEnd() {
        assertEquals(Arrays.asList(), StreamEnhancements.rangeBounded(5, 1));
    }
}
