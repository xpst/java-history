package itb.java.examples.java7;

import org.junit.jupiter.api.Test;

import static itb.java.examples.java7.StringsInSwitchStatements.getTypeOfDayWithSwitchStatement;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class StringsInSwitchStatementsTest {

    @Test
    void weekdaysAreClassifiedAsMidweek() {
        assertEquals("Midweek", getTypeOfDayWithSwitchStatement("Wednesday"));
    }

    @Test
    void weekendsAreClassified() {
        assertEquals("Weekend", getTypeOfDayWithSwitchStatement("Saturday"));
        assertEquals("Weekend", getTypeOfDayWithSwitchStatement("Sunday"));
    }

    @Test
    void unknownInputThrows() {
        assertThrows(IllegalArgumentException.class,
                () -> getTypeOfDayWithSwitchStatement("Funday"));
    }
}
