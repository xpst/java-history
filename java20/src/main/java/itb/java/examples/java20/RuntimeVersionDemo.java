package itb.java.examples.java20;

import java.lang.Runtime.Version;

/** {@link Runtime.Version} surface review. Java 20 itself finalized no headline
 *  language/API JEPs — it was a third or fourth preview round for the features
 *  that landed final in Java 21. This demo shows how to programmatically reason
 *  about the running JVM version, which is occasionally useful for libraries
 *  that want to enable feature-gated code paths cleanly. */
public class RuntimeVersionDemo {

    public static void main(String[] args) {
        Version v = Runtime.version();
        System.out.println("full:    " + v);
        System.out.println("feature: " + v.feature());
        System.out.println("interim: " + v.interim());
        System.out.println("update:  " + v.update());
        System.out.println("patch:   " + v.patch());
        System.out.println("pre:     " + v.pre());
        System.out.println("build:   " + v.build());
        System.out.println("at least 20? " + isAtLeast(20));
    }

    public static boolean isAtLeast(int featureVersion) {
        return Runtime.version().feature() >= featureVersion;
    }

    public static int currentFeatureVersion() {
        return Runtime.version().feature();
    }
}
