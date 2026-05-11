package itb.java.examples.java11;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FilesReadWriteStringTest {

    @Test
    void roundTripPreservesContent(@TempDir Path tmp) throws IOException {
        Path file = tmp.resolve("greeting.txt");
        String content = "hello\nworld\n";
        assertEquals(content, FilesReadWriteString.roundTrip(file, content));
    }
}
