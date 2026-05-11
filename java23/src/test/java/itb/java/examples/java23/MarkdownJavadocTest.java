package itb.java.examples.java23;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MarkdownJavadocTest {

    @Test
    void echoReturnsInputUnchanged() {
        assertEquals("hello", MarkdownJavadoc.echo("hello"));
    }

    @Test
    void addReturnsSum() {
        assertEquals(5, MarkdownJavadoc.add(2, 3));
    }
}
