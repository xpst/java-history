package itb.java.examples.java25;

import module java.base;

/** Module Imports (final, JEP 511) — {@code import module M} pulls in every public
 *  type exported by module {@code M} in one line, replacing long {@code java.*}
 *  import blocks. */
public class ModuleImportsDemo {

    public static void main(String[] args) {
        // List, Map, ArrayList, IntStream, Collectors, Path, Files, … all available
        // via the single `import module java.base;` declaration above.
        List<String> words = List.of("alpha", "bravo", "charlie");
        Map<Integer, List<String>> grouped = words.stream()
                .collect(Collectors.groupingBy(String::length));
        System.out.println(grouped);

        int sum = IntStream.rangeClosed(1, 5).sum();
        System.out.println("1+2+3+4+5 = " + sum);
    }

    public static Map<Integer, List<String>> groupByLength(List<String> words) {
        return words.stream().collect(Collectors.groupingBy(String::length));
    }

    public static int sumOneTo(int n) {
        return IntStream.rangeClosed(1, n).sum();
    }
}
