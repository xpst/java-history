package itb.java.examples.java10;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class UnmodifiableCollectorsTest {

    @Test
    void oddsUpToTenIncludesAllOdds() {
        assertEquals(Arrays.asList(1, 3, 5, 7, 9), UnmodifiableCollectors.oddsUpTo(10));
    }

    @Test
    void lengthIndexIsImmutable() {
        Map<String, Integer> idx = UnmodifiableCollectors.lengthIndex(Arrays.asList("hi", "hello"));
        assertEquals(Integer.valueOf(5), idx.get("hello"));
        assertThrows(UnsupportedOperationException.class, () -> idx.put("foo", 3));
    }

    @Test
    void resultListIsImmutable() {
        List<Integer> result = UnmodifiableCollectors.oddsUpTo(5);
        assertThrows(UnsupportedOperationException.class, () -> result.add(99));
    }
}
