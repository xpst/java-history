package itb.java.examples.java17;

import java.util.random.RandomGenerator;
import java.util.random.RandomGeneratorFactory;

/** Enhanced Pseudo-Random Number Generators (JEP 356) — the {@link RandomGenerator}
 *  interface unifies legacy {@link java.util.Random} with newer algorithms (L64X128,
 *  Xoshiro, etc.) accessed by name via the factory. */
public class RandomGenerators {

    public static void main(String[] args) {
        RandomGeneratorFactory.all()
                .filter(f -> !f.name().equals("ThreadLocalRandom"))
                .limit(5)
                .forEach(f -> System.out.printf("%-20s period=%s%n", f.name(), f.period()));

        RandomGenerator r = RandomGenerator.of("L64X128MixRandom");
        for (int i = 0; i < 3; i++) {
            System.out.println(r.nextInt(100));
        }
    }

    public static RandomGenerator named(String algorithm) {
        return RandomGenerator.of(algorithm);
    }

    public static int[] generateInts(RandomGenerator gen, int count, int boundExclusive) {
        int[] out = new int[count];
        for (int i = 0; i < count; i++) out[i] = gen.nextInt(boundExclusive);
        return out;
    }
}
