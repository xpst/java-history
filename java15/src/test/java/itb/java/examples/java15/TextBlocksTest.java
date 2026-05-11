package itb.java.examples.java15;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TextBlocksTest {

    @Test
    void userJsonInterpolatesFields() {
        String json = TextBlocks.userJson("ada", 1815);
        assertTrue(json.contains("\"name\": \"ada\""));
        assertTrue(json.contains("\"year\": 1815"));
    }

    @Test
    void shortHtmlEqualsExpected() {
        assertEquals("<p>hi</p>", TextBlocks.shortHtml());
    }
}
