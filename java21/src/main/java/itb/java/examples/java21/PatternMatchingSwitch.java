package itb.java.examples.java21;

/** Pattern matching for switch (final, JEP 441) — type patterns and record patterns
 *  in switch expressions, with exhaustiveness checking on sealed hierarchies. */
public class PatternMatchingSwitch {

    public sealed interface Shape permits Circle, Square, Triangle {}
    public record Circle(double radius) implements Shape {}
    public record Square(double side) implements Shape {}
    public record Triangle(double base, double height) implements Shape {}

    public static void main(String[] args) {
        Shape[] shapes = {new Circle(2), new Square(3), new Triangle(4, 5)};
        for (Shape s : shapes) {
            System.out.println(s + " → " + describe(s));
        }

        Object[] mixed = {"hello", 42, null, 3.14};
        for (Object o : mixed) {
            System.out.println(o + " → " + classify(o));
        }
    }

    public static double area(Shape s) {
        return switch (s) {
            case Circle(double r) -> Math.PI * r * r;
            case Square(double side) -> side * side;
            case Triangle(double b, double h) -> 0.5 * b * h;
        };
    }

    public static String describe(Shape s) {
        return switch (s) {
            case Circle c -> "circle r=" + c.radius();
            case Square sq -> "square side=" + sq.side();
            case Triangle t -> "triangle " + t.base() + "x" + t.height();
        };
    }

    public static String classify(Object o) {
        return switch (o) {
            case null -> "null";
            case String s when s.isBlank() -> "blank string";
            case String s -> "string of length " + s.length();
            case Integer n -> "int " + n;
            case Number n -> "number " + n.doubleValue();
            default -> "other";
        };
    }
}
