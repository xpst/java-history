package itb.java.examples.java11;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/** {@code java.net.http.HttpClient} — the standardized, non-blocking HTTP client that
 *  replaces {@code HttpURLConnection} for modern code. */
public class HttpClientDemo {

    public static void main(String[] args) throws Exception {
        var client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(3))
                .build();

        var request = HttpRequest.newBuilder()
                .uri(URI.create("https://example.com/"))
                .timeout(Duration.ofSeconds(3))
                .GET()
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("status: " + response.statusCode());
            System.out.println("first 100 chars: " + response.body().substring(0, Math.min(100, response.body().length())));
        } catch (Exception e) {
            System.out.println("network unavailable: " + e.getMessage());
        }
    }

    /** Build (but do not send) a GET request for the given URI. */
    public static HttpRequest buildGet(String uri) {
        return HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .GET()
                .build();
    }

    /** Send the request synchronously and return the body as a String. */
    public static String fetchBody(HttpClient client, String uri) throws Exception {
        HttpRequest req = buildGet(uri);
        return client.send(req, HttpResponse.BodyHandlers.ofString()).body();
    }
}
