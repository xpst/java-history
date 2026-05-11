package itb.java.examples.java20;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class RuntimeVersionDemoTest {

    @Test
    void atLeastJava20WhenBuiltOnJava20OrLater() {
        assertTrue(RuntimeVersionDemo.isAtLeast(20),
                "expected JVM ≥ 20, actually running on " + Runtime.version());
    }

    @Test
    void featureVersionIsPositive() {
        assertTrue(RuntimeVersionDemo.currentFeatureVersion() >= 20);
    }
}
