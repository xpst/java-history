package itb.java.examples.java12;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FilesMismatchDemoTest {

    @Test
    void identicalFilesReportMinusOne(@TempDir Path tmp) throws IOException {
        Path a = tmp.resolve("a.txt");
        Path b = tmp.resolve("b.txt");
        Files.writeString(a, "same content", StandardCharsets.UTF_8);
        Files.writeString(b, "same content", StandardCharsets.UTF_8);
        assertEquals(-1L, FilesMismatchDemo.firstMismatch(a, b));
    }

    @Test
    void differingFilesReportFirstByteIndex(@TempDir Path tmp) throws IOException {
        Path a = tmp.resolve("a.txt");
        Path b = tmp.resolve("b.txt");
        Files.writeString(a, "hello world", StandardCharsets.UTF_8);
        Files.writeString(b, "hello there", StandardCharsets.UTF_8);
        assertEquals(6L, FilesMismatchDemo.firstMismatch(a, b));
    }
}
