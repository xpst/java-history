package itb.java.examples.java21;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PatternMatchingSwitchTest {

    @Test
    void recordPatternDeconstructsCircle() {
        assertEquals(Math.PI, PatternMatchingSwitch.area(new PatternMatchingSwitch.Circle(1)), 1e-9);
        assertEquals(25.0, PatternMatchingSwitch.area(new PatternMatchingSwitch.Square(5)));
        assertEquals(6.0, PatternMatchingSwitch.area(new PatternMatchingSwitch.Triangle(3, 4)));
    }

    @Test
    void classifyHandlesNullAndGuardedBlank() {
        assertEquals("null", PatternMatchingSwitch.classify(null));
        assertEquals("blank string", PatternMatchingSwitch.classify("   "));
        assertEquals("string of length 5", PatternMatchingSwitch.classify("hello"));
        assertEquals("int 42", PatternMatchingSwitch.classify(42));
    }
}
