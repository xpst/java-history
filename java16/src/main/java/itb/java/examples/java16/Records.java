package itb.java.examples.java16;

import java.util.List;

/** Records (finalized in JEP 395) — concise nominal tuples with auto-generated
 *  accessors, equals, hashCode, and toString. */
public class Records {

    public record Point(int x, int y) {
        public double distanceTo(Point other) {
            int dx = x - other.x;
            int dy = y - other.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }

    public record Rectangle(Point topLeft, Point bottomRight) {
        public int area() {
            return (bottomRight.x() - topLeft.x()) * (bottomRight.y() - topLeft.y());
        }
    }

    public static void main(String[] args) {
        Point a = new Point(0, 0);
        Point b = new Point(3, 4);

        System.out.println(a);
        System.out.println(b);
        System.out.println("distance: " + a.distanceTo(b));

        Rectangle r = new Rectangle(new Point(0, 0), new Point(10, 5));
        System.out.println(r + " area=" + r.area());

        List<Point> points = List.of(new Point(1, 1), new Point(1, 1), new Point(2, 3));
        System.out.println("equality from canonical equals: " + points.get(0).equals(points.get(1)));
    }
}
