package itb.java.examples.java17;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InvalidClassException;
import java.io.ObjectInputFilter;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

/** Context-Specific Deserialization Filters (JEP 415) — attach a per-stream
 *  {@link ObjectInputFilter} that approves or rejects classes during deserialization.
 *  An essential mitigation for untrusted-input deserialization attacks. */
public class DeserializationFilters {

    public static class Allowed implements Serializable {
        private static final long serialVersionUID = 1L;
        public final String value;
        public Allowed(String value) { this.value = value; }
    }

    public static class Disallowed implements Serializable {
        private static final long serialVersionUID = 1L;
        public final int data;
        public Disallowed(int data) { this.data = data; }
    }

    /** Deserialize bytes, allowing only objects of {@code allowed} class. */
    public static Object readWithFilter(byte[] bytes, Class<?> allowed) throws IOException, ClassNotFoundException {
        try (ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes))) {
            in.setObjectInputFilter(ObjectInputFilter.allowFilter(c -> c == allowed, ObjectInputFilter.Status.REJECTED));
            return in.readObject();
        }
    }

    public static byte[] writeObject(Object o) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bos)) {
            out.writeObject(o);
        }
        return bos.toByteArray();
    }

    public static void main(String[] args) throws Exception {
        byte[] allowed = writeObject(new Allowed("ok"));
        byte[] denied = writeObject(new Disallowed(42));

        Object back = readWithFilter(allowed, Allowed.class);
        System.out.println("allowed round-trip: " + ((Allowed) back).value);

        try {
            readWithFilter(denied, Allowed.class);
        } catch (InvalidClassException e) {
            System.out.println("denied class rejected: " + e.getMessage());
        }
    }
}
