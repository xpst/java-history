package itb.java.examples.java15;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class StringNewMethodsTest {

    @Test
    void formattedSubstitutesArguments() {
        assertEquals("Hello, ada!", StringNewMethods.greet("ada"));
    }

    @Test
    void unescapeConvertsBackslashSequences() {
        assertEquals("line1\nline2", StringNewMethods.unescape("line1\\nline2"));
    }
}
