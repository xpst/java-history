package itb.java.examples.java15;

import org.junit.jupiter.api.Test;

import java.nio.charset.StandardCharsets;
import java.security.KeyPair;
import java.security.KeyPairGenerator;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class EdDsaCryptoTest {

    @Test
    void validSignatureVerifies() throws Exception {
        KeyPair kp = KeyPairGenerator.getInstance("Ed25519").generateKeyPair();
        byte[] msg = "payload".getBytes(StandardCharsets.UTF_8);
        byte[] sig = EdDsaCrypto.sign(kp.getPrivate(), msg);
        assertTrue(EdDsaCrypto.verify(kp.getPublic(), msg, sig));
    }

    @Test
    void tamperedMessageFailsVerification() throws Exception {
        KeyPair kp = KeyPairGenerator.getInstance("Ed25519").generateKeyPair();
        byte[] msg = "payload".getBytes(StandardCharsets.UTF_8);
        byte[] sig = EdDsaCrypto.sign(kp.getPrivate(), msg);
        byte[] tampered = "PAYLOAD".getBytes(StandardCharsets.UTF_8);
        assertFalse(EdDsaCrypto.verify(kp.getPublic(), tampered, sig));
    }
}
