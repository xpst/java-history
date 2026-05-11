package itb.java.examples.java9;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CollectionFactoriesTest {

    @Test
    void factoryListsAreImmutable() {
        List<String> weekend = CollectionFactories.weekendDays();
        assertEquals(2, weekend.size());
        assertThrows(UnsupportedOperationException.class, () -> weekend.add("Funday"));
    }

    @Test
    void mapFactoryReturnsExpectedEntries() {
        assertEquals(Integer.valueOf(44), CollectionFactories.dialCodes().get("GB"));
    }
}
