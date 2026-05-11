package itb.java.examples.java10;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/** Local-variable type inference — {@code var} lets the compiler infer a local's type
 *  from its initializer, trimming boilerplate without sacrificing static typing. */
public class LocalVariableTypeInference {

    public static void main(String[] args) {
        var greeting = "hello";
        var primes = List.of(2, 3, 5, 7, 11);
        var byLength = new HashMap<Integer, String>();
        byLength.put(5, "hello");

        System.out.println(greeting);
        System.out.println(primes);
        System.out.println(byLength);

        for (var i = 0; i < 3; i++) {
            System.out.println("i=" + i);
        }
    }

    public static List<Integer> firstNSquares(int n) {
        var result = IntStream.rangeClosed(1, n)
                .map(i -> i * i)
                .boxed()
                .collect(Collectors.toList());
        return result;
    }

    public static Map<String, Integer> wordLengths(List<String> words) {
        var out = new HashMap<String, Integer>();
        for (var w : words) {
            out.put(w, w.length());
        }
        return out;
    }
}
