package itb.java.examples.java11;

import java.util.List;
import java.util.stream.Collectors;

/** {@code String.isBlank}, {@code lines}, {@code repeat}, {@code strip} —
 *  small but high-impact additions to {@link String}. */
public class StringEnhancements {

    public static void main(String[] args) {
        System.out.println("isBlank: " + "   \t\n".isBlank());
        System.out.println("strip:   '" + "  hello  ".strip() + "'");
        System.out.println("repeat:  " + "abc".repeat(3));
        System.out.println("lines:   " + "a\nb\nc".lines().collect(Collectors.toList()));
    }

    public static List<String> nonBlankLines(String input) {
        return input.lines()
                .filter(line -> !line.isBlank())
                .map(String::strip)
                .collect(Collectors.toList());
    }

    public static String banner(String text, int repeats) {
        return ("=".repeat(repeats) + "\n" + text + "\n" + "=".repeat(repeats));
    }
}
