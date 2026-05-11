package itb.java.examples.java7;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CreationWithTheDiamondOperatorTest {

    @Test
    void diamondOperatorInfersGenericType() {
        List<String> list = new ArrayList<>();
        list.add("A");

        List<? extends String> more = new ArrayList<>();
        list.addAll(more);

        assertEquals(1, list.size());
        assertEquals("A", list.get(0));
    }
}
