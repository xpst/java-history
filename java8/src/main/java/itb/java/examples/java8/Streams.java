package itb.java.examples.java8;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/** Stream API — declarative bulk operations on sequences. */
public class Streams {

    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "banana", "cherry", "date", "elderberry");

        List<String> uppercased = words.stream()
                .filter(w -> w.length() > 4)
                .map(String::toUpperCase)
                .collect(Collectors.toList());
        System.out.println(uppercased);

        int sumOfSquares = IntStream.rangeClosed(1, 5).map(n -> n * n).sum();
        System.out.println("sum of 1²..5² = " + sumOfSquares);

        Map<Integer, List<String>> byLength = words.stream()
                .collect(Collectors.groupingBy(String::length));
        System.out.println(byLength);
    }

    public static int sumOfSquaresUpTo(int n) {
        return IntStream.rangeClosed(1, n).map(i -> i * i).sum();
    }

    public static Map<Integer, List<String>> groupByLength(List<String> words) {
        return words.stream().collect(Collectors.groupingBy(String::length));
    }
}
