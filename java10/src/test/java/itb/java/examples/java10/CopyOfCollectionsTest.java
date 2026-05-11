package itb.java.examples.java10;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CopyOfCollectionsTest {

    @Test
    void snapshotIsImmutable() {
        List<String> snap = CopyOfCollections.snapshot(Arrays.asList("a", "b"));
        assertThrows(UnsupportedOperationException.class, () -> snap.add("c"));
    }

    @Test
    void mutatingSourceDoesNotAffectSnapshot() {
        List<String> source = new ArrayList<>(Arrays.asList("a", "b"));
        List<String> snap = CopyOfCollections.snapshot(source);
        source.add("c");
        assertEquals(2, snap.size());
    }
}
