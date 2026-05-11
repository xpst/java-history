package itb.java.examples.java25;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CompactSourceMainTest {

    @Test
    void greetIncludesName() {
        assertEquals("hello, ada", CompactSourceMain.greet("ada"));
    }
}
