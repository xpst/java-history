package itb.java.examples.java22;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MultiFileSourceLaunchTest {

    @Test
    void helperGreetsByName() {
        MultiFileSourceLaunch.Helper h = new MultiFileSourceLaunch.Helper("test");
        assertEquals("Hello from test!", h.greet());
    }
}
