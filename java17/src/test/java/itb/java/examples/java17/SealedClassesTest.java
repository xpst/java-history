package itb.java.examples.java17;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SealedClassesTest {

    @Test
    void areaCircle() {
        assertEquals(Math.PI, SealedClasses.areaOf(new SealedClasses.Circle(1)), 1e-9);
    }

    @Test
    void areaSquare() {
        assertEquals(9.0, SealedClasses.areaOf(new SealedClasses.Square(3)));
    }

    @Test
    void areaTriangle() {
        assertEquals(6.0, SealedClasses.areaOf(new SealedClasses.Triangle(3, 4)));
    }
}
