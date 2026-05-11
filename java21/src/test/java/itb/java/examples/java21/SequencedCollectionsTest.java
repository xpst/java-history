package itb.java.examples.java21;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.SequencedCollection;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SequencedCollectionsTest {

    @Test
    void firstAndLastOfArrayList() {
        SequencedCollection<String> sc = new ArrayList<>(List.of("a", "b", "c"));
        assertEquals("a", SequencedCollections.firstOf(sc));
        assertEquals("c", SequencedCollections.lastOf(sc));
    }

    @Test
    void addFirstAndAddLastShiftEndpoints() {
        SequencedCollection<String> sc = new ArrayList<>(List.of("b"));
        sc.addFirst("a");
        sc.addLast("c");
        assertEquals(List.of("a", "b", "c"), List.copyOf(sc));
    }
}
