package itb.java.examples.java8;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class StreamsTest {

    @Test
    void sumOfSquaresUpToFive() {
        assertEquals(1 + 4 + 9 + 16 + 25, Streams.sumOfSquaresUpTo(5));
    }

    @Test
    void groupByLengthBucketsCorrectly() {
        Map<Integer, ?> grouped = Streams.groupByLength(Arrays.asList("a", "bb", "cc", "ddd"));
        assertEquals(3, grouped.size());
        assertTrue(grouped.containsKey(1));
        assertTrue(grouped.containsKey(2));
        assertTrue(grouped.containsKey(3));
    }
}
