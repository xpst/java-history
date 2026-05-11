package itb.java.examples.java8;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LambdasTest {

    @Test
    void countLongerThanFiltersWithLambda() {
        assertEquals(2, Lambdas.countLongerThan(Arrays.asList("a", "bb", "ccc", "dddd"), 2));
    }

    @Test
    void composeAppliesFunctionInline() {
        assertEquals(Integer.valueOf(25), Lambdas.compose(5, n -> n * n));
    }
}
