package itb.java.examples.java11;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;

class StringEnhancementsTest {

    @Test
    void nonBlankLinesDropsEmptyAndWhitespace() {
        String input = "  first\n\n   \nsecond  \n";
        assertEquals(Arrays.asList("first", "second"), StringEnhancements.nonBlankLines(input));
    }

    @Test
    void bannerHasUnderlineMatchingRepeat() {
        String b = StringEnhancements.banner("HI", 4);
        assertEquals("====\nHI\n====", b);
    }
}
