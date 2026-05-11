package itb.java.examples.java9;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PrivateInterfaceMethodsTest {

    private static final PrivateInterfaceMethods.Greeter G = new PrivateInterfaceMethods.Greeter() {};

    @Test
    void defaultGreetUsesSharedHelpers() {
        assertEquals("Hello, Alice", G.greet("  Alice  "));
    }

    @Test
    void shoutUppercasesAndHandlesNull() {
        assertEquals("HELLO, STRANGER!", G.shout(null));
    }
}
