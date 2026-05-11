package itb.java.examples.java17;

import org.junit.jupiter.api.Test;

import java.io.InvalidClassException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class DeserializationFiltersTest {

    @Test
    void allowedClassRoundTrips() throws Exception {
        byte[] bytes = DeserializationFilters.writeObject(new DeserializationFilters.Allowed("hi"));
        Object back = DeserializationFilters.readWithFilter(bytes, DeserializationFilters.Allowed.class);
        assertEquals("hi", ((DeserializationFilters.Allowed) back).value);
    }

    @Test
    void disallowedClassIsRejected() throws Exception {
        byte[] bytes = DeserializationFilters.writeObject(new DeserializationFilters.Disallowed(42));
        assertThrows(InvalidClassException.class,
                () -> DeserializationFilters.readWithFilter(bytes, DeserializationFilters.Allowed.class));
    }
}
