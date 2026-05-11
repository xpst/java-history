package itb.java.examples.java12;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

/** {@code Files.mismatch} — efficient byte-level comparison of two files, returning
 *  the position of the first difference or -1 if identical. */
public class FilesMismatchDemo {

    public static void main(String[] args) throws IOException {
        Path a = Files.createTempFile("a-", ".txt");
        Path b = Files.createTempFile("b-", ".txt");
        try {
            Files.writeString(a, "hello world", StandardCharsets.UTF_8);
            Files.writeString(b, "hello there", StandardCharsets.UTF_8);
            long pos = Files.mismatch(a, b);
            System.out.println("first difference at offset: " + pos);

            Files.writeString(b, "hello world", StandardCharsets.UTF_8);
            System.out.println("after fix: " + Files.mismatch(a, b));
        } finally {
            Files.deleteIfExists(a);
            Files.deleteIfExists(b);
        }
    }

    public static long firstMismatch(Path a, Path b) throws IOException {
        return Files.mismatch(a, b);
    }
}
