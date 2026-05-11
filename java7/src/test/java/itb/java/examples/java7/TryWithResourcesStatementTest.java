package itb.java.examples.java7;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TryWithResourcesStatementTest {

    @Test
    void readerIsAutomaticallyClosed() throws IOException {
        TrackingReader reader = new TrackingReader(new StringReader("hello\nworld"));
        String first;
        try (BufferedReader br = new BufferedReader(reader)) {
            first = br.readLine();
        }
        assertEquals("hello", first);
        assertTrue(reader.isClosed(), "reader should be closed after try-with-resources");
    }

    @Test
    void resourceIsWrittenAndReadBack(@TempDir Path tmp) throws IOException {
        Path file = tmp.resolve("movies.txt");
        Files.write(file, "Java 7 Block Buster".getBytes(StandardCharsets.UTF_8));
        try (BufferedReader br = Files.newBufferedReader(file, StandardCharsets.UTF_8)) {
            assertEquals("Java 7 Block Buster", br.readLine());
        }
    }

    private static final class TrackingReader extends java.io.FilterReader {
        private boolean closed;

        TrackingReader(java.io.Reader in) {
            super(in);
        }

        @Override
        public void close() throws IOException {
            closed = true;
            super.close();
        }

        boolean isClosed() {
            return closed;
        }
    }
}
