package itb.java.examples.java17;

/** Sealed classes (final, JEP 409) — explicit, compiler-checked hierarchy closure.
 *  A sealed type names its permitted subtypes; the compiler refuses everything else. */
public class SealedClasses {

    public sealed interface Shape permits Circle, Square, Triangle {
        double area();
    }

    public record Circle(double radius) implements Shape {
        @Override public double area() { return Math.PI * radius * radius; }
    }

    public record Square(double side) implements Shape {
        @Override public double area() { return side * side; }
    }

    public record Triangle(double base, double height) implements Shape {
        @Override public double area() { return 0.5 * base * height; }
    }

    public static double areaOf(Shape s) {
        if (s instanceof Circle c) return c.area();
        if (s instanceof Square sq) return sq.area();
        if (s instanceof Triangle t) return t.area();
        throw new IllegalStateException("sealed hierarchy exhausted");
    }

    public static void main(String[] args) {
        Shape[] shapes = {new Circle(1), new Square(2), new Triangle(3, 4)};
        for (Shape s : shapes) {
            System.out.println(s + " area=" + areaOf(s));
        }
    }
}
