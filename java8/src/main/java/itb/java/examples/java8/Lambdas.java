package itb.java.examples.java8;

import java.util.Arrays;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Predicate;

/** Lambda expressions — concise syntax for instances of functional interfaces. */
public class Lambdas {

    public static void main(String[] args) {
        Predicate<String> isLong = s -> s.length() > 4;
        System.out.println(isLong.test("hello"));
        System.out.println(isLong.test("hi"));

        Function<Integer, Integer> square = n -> n * n;
        BiFunction<Integer, Integer, Integer> sum = (a, b) -> a + b;
        System.out.println(square.apply(7));
        System.out.println(sum.apply(3, 4));

        List<String> words = Arrays.asList("alpha", "bravo", "charlie");
        words.forEach(System.out::println);
    }

    public static int countLongerThan(List<String> words, int threshold) {
        return (int) words.stream().filter(w -> w.length() > threshold).count();
    }

    public static <T, R> R compose(T input, Function<T, R> f) {
        return f.apply(input);
    }
}
