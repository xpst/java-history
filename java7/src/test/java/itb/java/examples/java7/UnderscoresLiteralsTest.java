package itb.java.examples.java7;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UnderscoresLiteralsTest {

    @Test
    void underscoresDoNotAlterNumericValue() {
        int million = 1_000_000;
        long billion = 1_000_000_000L;
        double pi = 3.14_15_93;

        assertEquals(1_000_000, million);
        assertEquals(1_000_000_000L, billion);
        assertEquals(3.141593, pi, 0.000001);
    }

    @Test
    void underscoresWorkInAllRadixes() {
        assertEquals(10, 0B10_10);
        assertEquals(17, 0x1_1);
        assertEquals(9, 01_1);
    }
}
