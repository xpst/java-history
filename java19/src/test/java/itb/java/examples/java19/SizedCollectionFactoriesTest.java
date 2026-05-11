package itb.java.examples.java19;

import org.junit.jupiter.api.Test;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SizedCollectionFactoriesTest {

    @Test
    void mapStartsEmptyAndAcceptsExpectedNumberWithoutResize() {
        HashMap<Integer, String> m = SizedCollectionFactories.mapForExpectedSize(64);
        assertEquals(0, m.size());
        for (int i = 0; i < 64; i++) m.put(i, "v" + i);
        assertEquals(64, m.size());
    }
}
