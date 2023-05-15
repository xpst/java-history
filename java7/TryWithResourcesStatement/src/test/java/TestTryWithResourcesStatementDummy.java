import org.junit.Test;

import java.io.*;

public class TestTryWithResourcesStatementDummy {
    @Test
    public void test() {

        try (BufferedReader src = new BufferedReader(new FileReader(TestTryWithResourcesStatementDummy.class.getClassLoader().getResource("in.txt").getPath()));
             BufferedWriter dest = new BufferedWriter(new FileWriter("out.txt"))) {
            String line;
            while ((line = src.readLine()) != null) {
                System.out.println(line);
                dest.write(line);
                dest.newLine();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        // src and dest automatically close.
        // No need for finally to explicitly close the resources.
    }

    @Test
    public void testFile() {


        try (FileOutputStream fos = new FileOutputStream("movies.txt");

             DataOutputStream dos = new DataOutputStream(fos)) {

            dos.writeUTF("Java 7 Block Buster");

        } catch (IOException e) {

            // log the exception

        }

    }
}
