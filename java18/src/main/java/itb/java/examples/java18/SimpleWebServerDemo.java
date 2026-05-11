package itb.java.examples.java18;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.SimpleFileServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;

/** Simple Web Server (JEP 408) — minimal static file server bundled with the JDK,
 *  also exposed via the {@code jwebserver} tool. */
public class SimpleWebServerDemo {

    public static void main(String[] args) throws IOException {
        Path docs = Files.createTempDirectory("docs-");
        Files.writeString(docs.resolve("index.html"), "<h1>hello</h1>");

        HttpServer server = SimpleFileServer.createFileServer(
                new InetSocketAddress("127.0.0.1", 8000),
                docs,
                SimpleFileServer.OutputLevel.INFO);
        server.start();
        System.out.println("serving " + docs + " on http://127.0.0.1:8000/");
        System.out.println("press Ctrl+C to stop (or call server.stop(0) from code)");
    }

    /** Start a server bound to an ephemeral port, returning it for caller-controlled lifecycle. */
    public static HttpServer startEphemeral(Path docroot) throws IOException {
        HttpServer s = SimpleFileServer.createFileServer(
                new InetSocketAddress("127.0.0.1", 0),
                docroot,
                SimpleFileServer.OutputLevel.NONE);
        s.start();
        return s;
    }
}
