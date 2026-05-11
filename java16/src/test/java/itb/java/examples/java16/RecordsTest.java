package itb.java.examples.java16;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class RecordsTest {

    @Test
    void canonicalEqualsByValue() {
        assertEquals(new Records.Point(1, 2), new Records.Point(1, 2));
        assertNotEquals(new Records.Point(1, 2), new Records.Point(1, 3));
    }

    @Test
    void accessorsExposeComponents() {
        Records.Point p = new Records.Point(3, 4);
        assertEquals(3, p.x());
        assertEquals(4, p.y());
        assertEquals(5.0, p.distanceTo(new Records.Point(0, 0)));
    }

    @Test
    void rectangleAreaUsesComponentAccessors() {
        Records.Rectangle r = new Records.Rectangle(new Records.Point(0, 0), new Records.Point(10, 5));
        assertEquals(50, r.area());
    }
}
