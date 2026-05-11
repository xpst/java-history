package itb.java.examples.java9;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/** Stream enhancements — {@code takeWhile}, {@code dropWhile}, and the bounded {@code iterate}
 *  overload added in Java 9. */
public class StreamEnhancements {

    public static void main(String[] args) {
        List<Integer> taken = Stream.of(1, 2, 3, 4, 5, 1, 2)
                .takeWhile(n -> n < 4)
                .collect(Collectors.toList());
        System.out.println("takeWhile<4: " + taken);

        List<Integer> dropped = Stream.of(1, 2, 3, 4, 5, 1, 2)
                .dropWhile(n -> n < 4)
                .collect(Collectors.toList());
        System.out.println("dropWhile<4: " + dropped);

        List<Integer> firstFive = Stream.iterate(1, n -> n <= 5, n -> n + 1)
                .collect(Collectors.toList());
        System.out.println("iterate(1..5): " + firstFive);
    }

    public static List<Integer> takeAscending(List<Integer> input) {
        return input.stream()
                .takeWhile(n -> n.equals(input.get(0)) || n > input.get(0))
                .collect(Collectors.toList());
    }

    public static List<Integer> rangeBounded(int start, int endInclusive) {
        return Stream.iterate(start, n -> n <= endInclusive, n -> n + 1)
                .collect(Collectors.toList());
    }
}
