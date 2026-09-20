package itb.java.examples.java27;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class G1EverywhereTest {

    @Test
    void g1IsSelectedWithoutRequestingIt() {
        assertTrue(G1Everywhere.usingG1(),
                "JEP 523 selects G1 on every machine — active collectors: "
                        + G1Everywhere.activeCollectorNames());
    }

    @Test
    void atLeastOneCollectorIsRegistered() {
        assertFalse(G1Everywhere.activeCollectors().isEmpty());
        assertFalse(G1Everywhere.activeCollectorNames().isEmpty());
    }
}
