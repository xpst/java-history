package itb.java.examples.java8;

import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class OptionalsTest {

    @Test
    void positiveIdYieldsPresentOptional() {
        Optional<String> found = Optionals.findUser(42);
        assertTrue(found.isPresent());
        assertEquals("user-42", found.get());
    }

    @Test
    void negativeIdYieldsEmpty() {
        assertFalse(Optionals.findUser(-1).isPresent());
    }

    @Test
    void describeReturnsAnonymousForEmpty() {
        assertEquals("anonymous", Optionals.describe(Optional.empty()));
        assertEquals("name=alice", Optionals.describe(Optional.of("alice")));
    }
}
