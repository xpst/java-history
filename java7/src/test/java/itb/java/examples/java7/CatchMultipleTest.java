package itb.java.examples.java7;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CatchMultipleTest {

    @Test
    void multiCatchHandlesAnyOfTheListedExceptions() {
        String caught = handle("Second");
        assertEquals("Second", caught);

        caught = handle("Third");
        assertEquals("Third", caught);
    }

    @Test
    void firstExceptionIsCaughtByItsOwnBranch() {
        assertEquals("First", handle("First"));
    }

    private String handle(String which) {
        try {
            CatchMultiple.rethrowException(which);
        } catch (CatchMultiple.FirstException e) {
            return "First";
        } catch (CatchMultiple.SecondException | CatchMultiple.ThirdException e) {
            return e.getClass().getSimpleName().replace("Exception", "");
        }
        return "none";
    }
}
