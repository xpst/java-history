package itb.java.examples.java11;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

/** {@code Files.readString} and {@code Files.writeString} — one-call text I/O. */
public class FilesReadWriteString {

    public static void main(String[] args) throws IOException {
        Path tmp = Files.createTempFile("java11-demo-", ".txt");
        try {
            Files.writeString(tmp, "first line\nsecond line\n", StandardCharsets.UTF_8);
            String content = Files.readString(tmp, StandardCharsets.UTF_8);
            System.out.println(content);
        } finally {
            Files.deleteIfExists(tmp);
        }
    }

    public static String roundTrip(Path file, String content) throws IOException {
        Files.writeString(file, content, StandardCharsets.UTF_8);
        return Files.readString(file, StandardCharsets.UTF_8);
    }
}
