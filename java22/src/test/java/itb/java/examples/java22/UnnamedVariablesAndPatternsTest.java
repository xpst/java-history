package itb.java.examples.java22;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UnnamedVariablesAndPatternsTest {

    @Test
    void countParseableIgnoresExceptionsWithUnderscore() {
        assertEquals(2, UnnamedVariablesAndPatterns.countParseable(List.of("12", "abc", "34", "")));
    }

    @Test
    void boxWidthIgnoresYInRecordPattern() {
        UnnamedVariablesAndPatterns.Box b = new UnnamedVariablesAndPatterns.Box(
                new UnnamedVariablesAndPatterns.Point(2, 9),
                new UnnamedVariablesAndPatterns.Point(7, 99));
        assertEquals(5, UnnamedVariablesAndPatterns.boxWidth(b));
    }
}
