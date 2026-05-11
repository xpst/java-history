package itb.java.examples.java16;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PatternMatchingInstanceOfTest {

    @Test
    void stringIsDescribedByLength() {
        assertEquals("string of length 5", PatternMatchingInstanceOf.describe("hello"));
    }

    @Test
    void integerHasItsOwnBranch() {
        assertEquals("int 42", PatternMatchingInstanceOf.describe(42));
    }

    @Test
    void numberBranchHandlesDouble() {
        assertEquals("number with double value 3.14", PatternMatchingInstanceOf.describe(3.14));
    }
}
