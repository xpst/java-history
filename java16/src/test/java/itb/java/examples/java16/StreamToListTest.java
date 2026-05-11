package itb.java.examples.java16;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class StreamToListTest {

    @Test
    void squaresProducesExpectedSequence() {
        assertEquals(List.of(1, 4, 9, 16, 25), StreamToList.squares(1, 5));
    }

    @Test
    void resultListIsImmutable() {
        List<Integer> result = StreamToList.squares(1, 3);
        assertThrows(UnsupportedOperationException.class, () -> result.add(99));
    }
}
