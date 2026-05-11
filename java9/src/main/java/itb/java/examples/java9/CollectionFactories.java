package itb.java.examples.java9;

import java.util.List;
import java.util.Map;
import java.util.Set;

/** Collection factory methods — concise, immutable List/Set/Map literals. */
public class CollectionFactories {

    public static void main(String[] args) {
        List<String> letters = List.of("a", "b", "c");
        Set<Integer> primes = Set.of(2, 3, 5, 7, 11);
        Map<String, Integer> codes = Map.of("US", 1, "GB", 44, "DE", 49);

        System.out.println(letters);
        System.out.println(primes);
        System.out.println(codes);
    }

    public static List<String> weekendDays() {
        return List.of("Saturday", "Sunday");
    }

    public static Map<String, Integer> dialCodes() {
        return Map.of("US", 1, "GB", 44, "DE", 49);
    }
}
