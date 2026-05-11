package itb.java.examples.java13;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FileSystemsNewFromPathTest {

    @Test
    void roundTripIntoAndOutOfZip(@TempDir Path tmp) throws IOException {
        Path zip = tmp.resolve("test.zip");

        Map<String, Object> create = new HashMap<>();
        create.put("create", "true");
        try (FileSystem fs = FileSystems.newFileSystem(URI.create("jar:" + zip.toUri()), create)) {
            Files.writeString(fs.getPath("/note.txt"), "hi", StandardCharsets.UTF_8);
        }

        assertEquals("hi", FileSystemsNewFromPath.readFromZip(zip, "/note.txt"));
    }
}
