package itb.java.examples.java16;

import java.util.List;
import java.util.stream.Stream;

/** {@code Stream.toList()} — one-call terminal operation returning an unmodifiable
 *  {@link List} without a separate {@code Collectors.toUnmodifiableList()} import. */
public class StreamToList {

    public static void main(String[] args) {
        List<String> upper = Stream.of("alpha", "beta", "gamma")
                .map(String::toUpperCase)
                .toList();
        System.out.println(upper);

        try {
            upper.add("DELTA");
        } catch (UnsupportedOperationException e) {
            System.out.println("immutable as expected");
        }
    }

    public static List<Integer> squares(int from, int to) {
        return Stream.iterate(from, n -> n <= to, n -> n + 1)
                .map(n -> n * n)
                .toList();
    }
}
