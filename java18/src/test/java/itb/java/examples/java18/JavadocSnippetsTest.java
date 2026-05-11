package itb.java.examples.java18;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class JavadocSnippetsTest {

    @Test
    void summarizeFormatsAsWordEqualsLength() {
        assertEquals("a=1, bb=2, ccc=3", JavadocSnippets.summarize(List.of("a", "bb", "ccc")));
    }

    @Test
    void emptyInputYieldsEmptyOutput() {
        assertEquals("", JavadocSnippets.summarize(List.of()));
    }
}
