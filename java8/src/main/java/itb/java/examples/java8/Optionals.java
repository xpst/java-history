package itb.java.examples.java8;

import java.util.Optional;

/** Optional&lt;T&gt; — explicit, type-safe representation of "value or absence". */
public class Optionals {

    public static void main(String[] args) {
        Optional<String> present = Optional.of("hello");
        Optional<String> absent = Optional.empty();

        System.out.println(present.isPresent());
        System.out.println(absent.isPresent());

        System.out.println(present.map(String::toUpperCase).orElse("(empty)"));
        System.out.println(absent.map(String::toUpperCase).orElse("(empty)"));

        present.ifPresent(s -> System.out.println("got: " + s));

        System.out.println(findUser(42));
        System.out.println(findUser(-1));
    }

    public static Optional<String> findUser(int id) {
        return id > 0 ? Optional.of("user-" + id) : Optional.empty();
    }

    public static String describe(Optional<String> maybeName) {
        return maybeName.map(n -> "name=" + n).orElse("anonymous");
    }
}
