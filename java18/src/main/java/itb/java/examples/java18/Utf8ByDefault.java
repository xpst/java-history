package itb.java.examples.java18;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;

/** UTF-8 by default (JEP 400) — {@code Charset.defaultCharset()} is UTF-8 on every
 *  platform unless explicitly overridden via {@code -Dfile.encoding}. */
public class Utf8ByDefault {

    public static void main(String[] args) throws IOException {
        System.out.println("default charset: " + Charset.defaultCharset());

        Path tmp = Files.createTempFile("utf8-demo-", ".txt");
        try {
            Files.writeString(tmp, "café — naïve – über");
            System.out.println(Files.readString(tmp));
        } finally {
            Files.deleteIfExists(tmp);
        }
    }

    public static String defaultCharsetName() {
        return Charset.defaultCharset().name();
    }

    /** Round-trip text using the default charset (UTF-8 in Java 18+). */
    public static String roundTripDefaultCharset(Path file, String text) throws IOException {
        Files.writeString(file, text);
        return Files.readString(file);
    }
}
