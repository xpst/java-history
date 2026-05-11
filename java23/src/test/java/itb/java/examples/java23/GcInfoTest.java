package itb.java.examples.java23;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;

class GcInfoTest {

    @Test
    void atLeastOneGarbageCollectorIsRegistered() {
        assertFalse(GcInfo.activeGcs().isEmpty());
        assertFalse(GcInfo.activeGcNames().isEmpty());
    }
}
