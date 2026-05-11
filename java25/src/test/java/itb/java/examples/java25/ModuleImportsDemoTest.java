package itb.java.examples.java25;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ModuleImportsDemoTest {

    @Test
    void groupByLengthBucketsCorrectly() {
        Map<Integer, List<String>> grouped =
                ModuleImportsDemo.groupByLength(List.of("a", "bb", "cc", "ddd"));
        assertEquals(3, grouped.size());
        assertEquals(List.of("a"), grouped.get(1));
    }

    @Test
    void sumOneToFive() {
        assertEquals(15, ModuleImportsDemo.sumOneTo(5));
    }
}
