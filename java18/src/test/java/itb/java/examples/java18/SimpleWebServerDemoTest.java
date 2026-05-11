package itb.java.examples.java18;

import com.sun.net.httpserver.HttpServer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SimpleWebServerDemoTest {

    @Test
    void servesStaticFileFromDocroot(@TempDir Path docs) throws IOException, InterruptedException {
        Files.writeString(docs.resolve("hello.txt"), "hi there");
        HttpServer server = SimpleWebServerDemo.startEphemeral(docs);
        try {
            int port = server.getAddress().getPort();
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create("http://127.0.0.1:" + port + "/hello.txt"))
                    .GET()
                    .build();
            HttpResponse<String> resp = HttpClient.newHttpClient()
                    .send(req, HttpResponse.BodyHandlers.ofString());
            assertEquals(200, resp.statusCode());
            assertTrue(resp.body().contains("hi there"));
        } finally {
            server.stop(0);
        }
    }
}
