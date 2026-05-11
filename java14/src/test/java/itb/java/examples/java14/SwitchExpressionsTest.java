package itb.java.examples.java14;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class SwitchExpressionsTest {

    @Test
    void weekendCategorization() {
        assertEquals("weekend", SwitchExpressions.categorize(SwitchExpressions.Day.SAT));
        assertEquals("weekend", SwitchExpressions.categorize(SwitchExpressions.Day.SUN));
        assertEquals("weekday", SwitchExpressions.categorize(SwitchExpressions.Day.WED));
    }

    @Test
    void leapYearFebruary() {
        assertEquals(29, SwitchExpressions.daysInMonth(2, 2024));
        assertEquals(28, SwitchExpressions.daysInMonth(2, 2025));
        assertEquals(31, SwitchExpressions.daysInMonth(7, 2024));
    }

    @Test
    void invalidMonthThrows() {
        assertThrows(IllegalArgumentException.class, () -> SwitchExpressions.daysInMonth(13, 2024));
    }
}
