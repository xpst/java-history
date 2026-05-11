package itb.java.examples.java10;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/** {@code Collectors.toUnmodifiableList/Set/Map} — terminal stream collectors that
 *  produce immutable results in one step. */
public class UnmodifiableCollectors {

    public static void main(String[] args) {
        List<String> letters = Stream.of("a", "b", "c")
                .collect(Collectors.toUnmodifiableList());
        Set<Integer> primes = Stream.of(2, 3, 5, 7, 11)
                .collect(Collectors.toUnmodifiableSet());
        Map<String, Integer> lengths = Stream.of("ada", "ruby")
                .collect(Collectors.toUnmodifiableMap(s -> s, String::length));

        System.out.println(letters);
        System.out.println(primes);
        System.out.println(lengths);
    }

    public static List<Integer> oddsUpTo(int n) {
        return Stream.iterate(1, i -> i <= n, i -> i + 2)
                .collect(Collectors.toUnmodifiableList());
    }

    public static Map<String, Integer> lengthIndex(List<String> words) {
        return words.stream()
                .distinct()
                .collect(Collectors.toUnmodifiableMap(s -> s, String::length));
    }
}
