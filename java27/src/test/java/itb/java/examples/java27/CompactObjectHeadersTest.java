package itb.java.examples.java27;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CompactObjectHeadersTest {

    @Test
    void compactHeadersAreOnWithoutAnyFlag() {
        assertTrue(CompactObjectHeaders.enabled(),
                "JEP 534 makes compact object headers the default in JDK 27");
        assertEquals("DEFAULT", CompactObjectHeaders.origin("UseCompactObjectHeaders"),
                "the value should come from the JVM default, not the command line");
    }

    @Test
    void compressedClassPointersFlagIsGone() {
        assertFalse(CompactObjectHeaders.hasCompressedClassPointersFlag(),
                "UseCompressedClassPointers became obsolete in JDK 27 (JDK-8363996)");
    }
}
