package itb.java.examples.java26;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public final class Http3Demo {

    private Http3Demo() {
    }

    public static HttpClient http3Client() {
        return HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_3)
                .connectTimeout(Duration.ofSeconds(5))
                .build();
    }

    public static HttpRequest http3Request(URI target) {
        return HttpRequest.newBuilder(target)
                .version(HttpClient.Version.HTTP_3)
                .GET()
                .build();
    }

    public static void main(String[] args) {
        URI target = args.length > 0
                ? URI.create(args[0])
                : URI.create("https://www.cloudflare.com/");

        HttpClient client = http3Client();
        HttpRequest request = http3Request(target);

        System.out.println("Client preferred version: " + client.version());
        System.out.println("Request preferred version: " + request.version().orElse(null));
        System.out.println("Sending: " + request.method() + " " + request.uri());

        try {
            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("HTTP status:  " + response.statusCode());
            System.out.println("Negotiated:   " + response.version());
            System.out.println("Body length:  " + response.body().length() + " chars");
        } catch (Exception e) {
            System.out.println("Network call failed (expected when offline): "
                    + e.getClass().getSimpleName() + ": " + e.getMessage());
        }
    }
}
