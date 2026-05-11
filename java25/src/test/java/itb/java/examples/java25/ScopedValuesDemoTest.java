package itb.java.examples.java25;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

class ScopedValuesDemoTest {

    @Test
    void valueIsVisibleInsideScope() {
        assertEquals("req-99", ScopedValuesDemo.runWithRequestId("req-99"));
    }

    @Test
    void scopedValueIsNotBoundOutsideScope() {
        assertFalse(ScopedValuesDemo.boundOutsideScope());
    }
}
