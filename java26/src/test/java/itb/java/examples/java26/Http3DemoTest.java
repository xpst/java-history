package itb.java.examples.java26;

import org.junit.jupiter.api.Test;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class Http3DemoTest {

    @Test
    void clientPrefersHttp3() {
        HttpClient client = Http3Demo.http3Client();
        assertNotNull(client);
        assertEquals(HttpClient.Version.HTTP_3, client.version(),
                "Client should be configured to prefer HTTP/3");
    }

    @Test
    void requestCarriesHttp3Preference() {
        HttpRequest request = Http3Demo.http3Request(URI.create("https://example.com/"));
        assertEquals(HttpClient.Version.HTTP_3, request.version().orElseThrow(),
                "Request should carry an HTTP_3 version preference");
        assertEquals("GET", request.method());
        assertEquals(URI.create("https://example.com/"), request.uri());
    }

    @Test
    void http3VersionEnumExists() {
        HttpClient.Version[] versions = HttpClient.Version.values();
        boolean hasHttp3 = false;
        for (HttpClient.Version v : versions) {
            if ("HTTP_3".equals(v.name())) {
                hasHttp3 = true;
                break;
            }
        }
        assertTrue(hasHttp3, "HttpClient.Version.HTTP_3 must be available in JDK 26+");
    }
}
