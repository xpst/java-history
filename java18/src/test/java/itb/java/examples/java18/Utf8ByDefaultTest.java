package itb.java.examples.java18;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;

class Utf8ByDefaultTest {

    @Test
    void defaultCharsetIsUtf8() {
        assertEquals("UTF-8", Charset.defaultCharset().name());
    }

    @Test
    void roundTripWithNonAsciiPreservesContent(@TempDir Path tmp) throws IOException {
        Path file = tmp.resolve("greeting.txt");
        String text = "café — naïve – über";
        assertEquals(text, Utf8ByDefault.roundTripDefaultCharset(file, text));
    }
}
