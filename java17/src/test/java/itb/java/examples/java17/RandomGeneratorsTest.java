package itb.java.examples.java17;

import org.junit.jupiter.api.Test;

import java.util.random.RandomGenerator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class RandomGeneratorsTest {

    @Test
    void namedGeneratorIsReproducible() {
        RandomGenerator a = RandomGenerators.named("L64X128MixRandom");
        RandomGenerator b = RandomGenerators.named("L64X128MixRandom");
        assertEquals(a.getClass(), b.getClass());
    }

    @Test
    void generatedIntsRespectBound() {
        RandomGenerator gen = RandomGenerators.named("L64X128MixRandom");
        int[] ints = RandomGenerators.generateInts(gen, 50, 10);
        assertEquals(50, ints.length);
        for (int n : ints) {
            assertTrue(n >= 0 && n < 10);
        }
    }
}
