package itb.java.examples.java22;

import java.util.Arrays;
import java.util.List;

/** Unnamed variables and patterns (final, JEP 456) — use {@code _} for variables,
 *  pattern components, and catch parameters that you don't need to name. */
public class UnnamedVariablesAndPatterns {

    public record Point(int x, int y) {}
    public record Box(Point topLeft, Point bottomRight) {}

    public static void main(String[] args) {
        for (int i = 0, _ = 0; i < 5; i++) {
            System.out.println("i=" + i);
        }

        List<String> inputs = Arrays.asList("12", "abc", "34");
        int parsedCount = 0;
        for (String s : inputs) {
            try {
                Integer.parseInt(s);
                parsedCount++;
            } catch (NumberFormatException _) {
                // we don't care about the details — the count tells us enough
            }
        }
        System.out.println("parsed=" + parsedCount);

        Box b = new Box(new Point(0, 0), new Point(10, 5));
        if (b instanceof Box(Point(int x1, _), Point(int x2, _))) {
            System.out.println("width = " + (x2 - x1));
        }
    }

    public static int countParseable(List<String> inputs) {
        int n = 0;
        for (String s : inputs) {
            try {
                Integer.parseInt(s);
                n++;
            } catch (NumberFormatException _) {
                // intentionally discard
            }
        }
        return n;
    }

    public static int boxWidth(Box b) {
        return switch (b) {
            case Box(Point(int x1, _), Point(int x2, _)) -> x2 - x1;
        };
    }
}
