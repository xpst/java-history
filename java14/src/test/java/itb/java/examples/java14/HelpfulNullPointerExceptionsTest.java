package itb.java.examples.java14;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class HelpfulNullPointerExceptionsTest {

    @Test
    void messageNamesTheFieldThatWasNull() {
        HelpfulNullPointerExceptions.Order order = new HelpfulNullPointerExceptions.Order();
        order.customer = new HelpfulNullPointerExceptions.Customer();
        String msg = HelpfulNullPointerExceptions.triggerAndReport(order);

        assertNotNull(msg);
        assertTrue(msg.contains("address"),
                "expected helpful NPE message to name 'address' — got: " + msg);
    }
}
