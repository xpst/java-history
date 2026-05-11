package itb.java.examples.java24;

import java.io.IOException;
import java.lang.classfile.ClassFile;
import java.lang.classfile.ClassModel;
import java.lang.classfile.MethodModel;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

/** Class-File API (final, JEP 484) — read, modify, and write {@code .class} files
 *  through a typed model that replaces years of ad-hoc bytecode libraries. */
public class ClassFileApiDemo {

    public static void main(String[] args) throws Exception {
        Path self = locateClassFile(ClassFileApiDemo.class);
        if (self == null) {
            System.out.println("class file not on filesystem — skip");
            return;
        }
        System.out.println("methods in " + ClassFileApiDemo.class.getSimpleName() + ":");
        for (String name : methodNames(self)) {
            System.out.println("  " + name);
        }
    }

    public static List<String> methodNames(Path classFile) throws IOException {
        byte[] bytes = Files.readAllBytes(classFile);
        ClassModel model = ClassFile.of().parse(bytes);
        List<String> names = new ArrayList<>();
        for (MethodModel m : model.methods()) {
            names.add(m.methodName().stringValue());
        }
        return names;
    }

    private static Path locateClassFile(Class<?> c) {
        try {
            String resource = c.getName().replace('.', '/') + ".class";
            URL url = c.getClassLoader().getResource(resource);
            if (url == null) return null;
            return Path.of(url.toURI());
        } catch (Exception e) {
            return null;
        }
    }
}
