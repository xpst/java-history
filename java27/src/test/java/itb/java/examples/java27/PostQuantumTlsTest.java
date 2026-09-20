package itb.java.examples.java27;

import org.junit.jupiter.api.Test;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLParameters;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PostQuantumTlsTest {

    @Test
    void hybridGroupLeadsTheDefaultPreferenceOrder() throws Exception {
        List<String> groups = PostQuantumTls.defaultNamedGroups();
        assertTrue(groups.contains(PostQuantumTls.DEFAULT_HYBRID_GROUP),
                "expected the default named groups to offer X25519MLKEM768 — got: " + groups);
        assertEquals(PostQuantumTls.DEFAULT_HYBRID_GROUP, groups.get(0),
                "JEP 527 puts the hybrid group first — got: " + groups);
        assertTrue(PostQuantumTls.prefersPostQuantumHybrid());
    }

    @Test
    void otherHybridSchemesCanBeSelectedExplicitly() throws Exception {
        String[] chosen = {"SecP384r1MLKEM1024", "SecP256r1MLKEM768"};
        SSLParameters params = PostQuantumTls.withNamedGroups(chosen);
        assertArrayEquals(chosen, params.getNamedGroups());
    }

    @Test
    void tls13IsAvailableToNegotiateTheHybridGroup() throws Exception {
        List<String> protocols = List.of(SSLContext.getDefault().getDefaultSSLParameters().getProtocols());
        assertTrue(protocols.contains("TLSv1.3"),
                "hybrid key exchange is TLS 1.3 only — got: " + protocols);
    }
}
