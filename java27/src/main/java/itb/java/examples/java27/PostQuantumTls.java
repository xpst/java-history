package itb.java.examples.java27;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLParameters;
import java.util.Arrays;
import java.util.List;

/** Post-Quantum Hybrid Key Exchange for TLS 1.3 (final, JEP 527).
 *
 *  <p>Java 27 ships three hybrid key exchange schemes that pair a classical ECDHE
 *  group with ML-KEM, so a recorded handshake stays secure unless <em>both</em>
 *  halves are broken. Only {@code X25519MLKEM768} is enabled by default, and it
 *  sits at the front of the named-group list — applications using
 *  {@code javax.net.ssl} inherit the protection with no code change.
 *
 *  <p>The other two schemes, {@code SecP256r1MLKEM768} and
 *  {@code SecP384r1MLKEM1024}, are supported but must be selected explicitly,
 *  either per-connection via {@link SSLParameters#setNamedGroups(String[])} or
 *  JVM-wide via the {@code jdk.tls.namedGroups} system property. */
public final class PostQuantumTls {

    /** The one hybrid scheme enabled by default, and preferred over all others. */
    public static final String DEFAULT_HYBRID_GROUP = "X25519MLKEM768";

    private PostQuantumTls() {
    }

    /** The named groups the default SSLContext will offer, in preference order. */
    public static List<String> defaultNamedGroups() throws Exception {
        String[] groups = SSLContext.getDefault().getDefaultSSLParameters().getNamedGroups();
        return groups == null ? List.of() : List.of(groups);
    }

    /** True when the most-preferred named group is the post-quantum hybrid one. */
    public static boolean prefersPostQuantumHybrid() throws Exception {
        List<String> groups = defaultNamedGroups();
        return !groups.isEmpty() && DEFAULT_HYBRID_GROUP.equals(groups.get(0));
    }

    /** Build SSLParameters that offer exactly the given named groups, in order. */
    public static SSLParameters withNamedGroups(String... groups) throws Exception {
        SSLParameters params = SSLContext.getDefault().getDefaultSSLParameters();
        params.setNamedGroups(groups);
        return params;
    }

    public static void main(String[] args) throws Exception {
        System.out.println("default named groups (preference order):");
        for (String group : defaultNamedGroups()) {
            System.out.println("  " + group + (DEFAULT_HYBRID_GROUP.equals(group) ? "   <-- post-quantum hybrid" : ""));
        }
        System.out.println();
        System.out.println("prefers post-quantum hybrid? " + prefersPostQuantumHybrid());
        System.out.println("default protocols: "
                + Arrays.toString(SSLContext.getDefault().getDefaultSSLParameters().getProtocols()));

        SSLParameters custom = withNamedGroups("SecP384r1MLKEM1024", DEFAULT_HYBRID_GROUP);
        System.out.println("explicitly selected:  " + Arrays.toString(custom.getNamedGroups()));
    }
}
