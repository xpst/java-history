package itb.java.examples.java10;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LocalVariableTypeInferenceTest {

    @Test
    void firstNSquaresMatchesExpected() {
        assertEquals(Arrays.asList(1, 4, 9, 16), LocalVariableTypeInference.firstNSquares(4));
    }

    @Test
    void wordLengthsCountsCharacters() {
        Map<String, Integer> m = LocalVariableTypeInference.wordLengths(Arrays.asList("a", "bb", "ccc"));
        assertEquals(Integer.valueOf(1), m.get("a"));
        assertEquals(Integer.valueOf(3), m.get("ccc"));
    }
}
