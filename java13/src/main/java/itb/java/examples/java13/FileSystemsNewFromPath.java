package itb.java.examples.java13;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

/** {@code FileSystems.newFileSystem(Path, Map)} — open a zip/jar file system from a
 *  {@link Path} without an extra {@code URI} ceremony. */
public class FileSystemsNewFromPath {

    public static void main(String[] args) throws IOException {
        Path zip = Files.createTempFile("demo-", ".zip");
        Files.delete(zip);
        Map<String, Object> create = new HashMap<>();
        create.put("create", "true");
        try (FileSystem fs = FileSystems.newFileSystem(URI.create("jar:" + zip.toUri()), create)) {
            Path inside = fs.getPath("/greeting.txt");
            Files.writeString(inside, "hello from inside the zip\n", StandardCharsets.UTF_8);
        }

        try (FileSystem fs = FileSystems.newFileSystem(zip, (ClassLoader) null)) {
            System.out.println(Files.readString(fs.getPath("/greeting.txt")));
        } finally {
            Files.deleteIfExists(zip);
        }
    }

    public static String readFromZip(Path zip, String entry) throws IOException {
        try (FileSystem fs = FileSystems.newFileSystem(zip, (ClassLoader) null)) {
            return Files.readString(fs.getPath(entry), StandardCharsets.UTF_8);
        }
    }
}
