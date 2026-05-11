package itb.java.examples.java15;

import java.nio.charset.StandardCharsets;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;

/** EdDSA (Edwards-curve Digital Signature Algorithm) — Ed25519 signatures via the
 *  built-in "Ed25519" provider added in JEP 339. */
public class EdDsaCrypto {

    public static void main(String[] args) throws Exception {
        KeyPair kp = KeyPairGenerator.getInstance("Ed25519").generateKeyPair();
        byte[] message = "the body of a signed payload".getBytes(StandardCharsets.UTF_8);

        byte[] sig = sign(kp.getPrivate(), message);
        System.out.println("signature length: " + sig.length + " bytes");
        System.out.println("verifies: " + verify(kp.getPublic(), message, sig));
    }

    public static byte[] sign(PrivateKey key, byte[] message) throws Exception {
        Signature s = Signature.getInstance("Ed25519");
        s.initSign(key);
        s.update(message);
        return s.sign();
    }

    public static boolean verify(PublicKey key, byte[] message, byte[] signature) throws Exception {
        Signature s = Signature.getInstance("Ed25519");
        s.initVerify(key);
        s.update(message);
        return s.verify(signature);
    }
}
