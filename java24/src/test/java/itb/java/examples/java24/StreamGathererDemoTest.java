package itb.java.examples.java24;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class StreamGathererDemoTest {

    @Test
    void slidingWindowOfThreeOverFiveItems() {
        List<List<Integer>> windows = StreamGathererDemo.windowsOf(List.of(1, 2, 3, 4, 5), 3);
        assertEquals(List.of(List.of(1, 2, 3), List.of(2, 3, 4), List.of(3, 4, 5)), windows);
    }

    @Test
    void windowLargerThanInputProducesEmptyResult() {
        assertEquals(List.of(), StreamGathererDemo.windowsOf(List.of(1, 2), 5));
    }
}
