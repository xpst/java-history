package itb.java.examples.java24;

import org.junit.jupiter.api.Test;

import java.net.URL;
import java.nio.file.Path;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

class ClassFileApiDemoTest {

    @Test
    void canListMethodsOfThisTestClassesByteArray() throws Exception {
        URL url = ClassFileApiDemoTest.class.getClassLoader()
                .getResource(ClassFileApiDemoTest.class.getName().replace('.', '/') + ".class");
        assertTrue(url != null);
        Path classFile = Path.of(url.toURI());

        List<String> methods = ClassFileApiDemo.methodNames(classFile);
        assertTrue(methods.contains("canListMethodsOfThisTestClassesByteArray"),
                "expected to find the test method in: " + methods);
    }
}
