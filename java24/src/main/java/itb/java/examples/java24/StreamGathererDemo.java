package itb.java.examples.java24;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Gatherer;
import java.util.stream.Stream;

/** {@link Gatherer} (finalized in JEP 485) — a generalized intermediate operation
 *  that gives stream pipelines the same expressive power as {@code Collectors},
 *  but in non-terminal position. */
public class StreamGathererDemo {

    public static void main(String[] args) {
        List<List<Integer>> windows = Stream.of(1, 2, 3, 4, 5, 6, 7)
                .gather(slidingWindow(3))
                .toList();
        System.out.println(windows);
    }

    /** A simple sliding-window gatherer producing every contiguous subsequence of size {@code n}. */
    public static <T> Gatherer<T, ?, List<T>> slidingWindow(int n) {
        return Gatherer.<T, List<T>, List<T>>ofSequential(
                ArrayList::new,
                Gatherer.Integrator.ofGreedy((buffer, element, downstream) -> {
                    buffer.add(element);
                    if (buffer.size() == n) {
                        boolean ok = downstream.push(List.copyOf(buffer));
                        buffer.remove(0);
                        return ok;
                    }
                    return true;
                })
        );
    }

    public static List<List<Integer>> windowsOf(List<Integer> input, int n) {
        return input.stream().gather(slidingWindow(n)).toList();
    }
}
