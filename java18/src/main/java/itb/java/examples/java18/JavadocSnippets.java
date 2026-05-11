package itb.java.examples.java18;

import java.util.List;
import java.util.stream.Collectors;

/** Demonstrates {@code @snippet} tags introduced in JEP 413. The runnable
 *  behavior is the same as before — only the documentation tooling differs.
 *
 * <p>Example usage of {@link #summarize(List)}:
 * {@snippet :
 *   var sizes = List.of("a", "bb", "ccc");
 *   var summary = JavadocSnippets.summarize(sizes); // @highlight substring="summarize"
 *   System.out.println(summary); // a=1, bb=2, ccc=3
 * }
 */
public class JavadocSnippets {

    /**
     * Builds a "{@code word=length}" summary for each entry, comma-separated.
     *
     * {@snippet :
     *   JavadocSnippets.summarize(List.of("hi")); // returns "hi=2"
     * }
     */
    public static String summarize(List<String> words) {
        return words.stream()
                .map(w -> w + "=" + w.length())
                .collect(Collectors.joining(", "));
    }

    public static void main(String[] args) {
        System.out.println(summarize(List.of("a", "bb", "ccc")));
    }
}
