package itb.java.examples.java16;

/** Pattern matching for {@code instanceof} (finalized in JEP 394) — bind the cast
 *  variable in the same expression that performs the type check. */
public class PatternMatchingInstanceOf {

    public static void main(String[] args) {
        Object[] inputs = {"hello", 42, 3.14, new int[]{1, 2, 3}};
        for (Object o : inputs) {
            System.out.println(describe(o));
        }
    }

    public static String describe(Object o) {
        if (o instanceof String s) {
            return "string of length " + s.length();
        } else if (o instanceof Integer n) {
            return "int " + n;
        } else if (o instanceof Number n) {
            return "number with double value " + n.doubleValue();
        } else if (o instanceof int[] arr) {
            return "int[] of length " + arr.length;
        }
        return "unknown";
    }
}
