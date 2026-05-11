package itb.java.examples.java12;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class StringIndentTransformTest {

    @Test
    void indentPrefixesEveryLine() {
        assertEquals("    one\n    two\n", StringIndentTransform.indented("one\ntwo", 4));
    }

    @Test
    void transformAppliesArbitraryFunction() {
        assertEquals("5:hello", StringIndentTransform.transformLength("hello"));
    }
}
