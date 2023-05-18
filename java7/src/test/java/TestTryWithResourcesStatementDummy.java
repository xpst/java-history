import org.junit.Test;

import java.io.*;

public class TestTryWithResourcesStatementDummy {
    @Test
    public void test() {

        String fileName = "out.txt";

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
        deleteFile(fileName);
    }

    @Test
    public void testFile() {

        String fileName = "movies.txt";

        try (FileOutputStream fos = new FileOutputStream("movies.txt");
             DataOutputStream dos = new DataOutputStream(fos)) {
            dos.writeUTF("Java 7 Block Buster");
        } catch (IOException e) {
            // log the exception
        }

        deleteFile(fileName);
    }

    private void deleteFile(final String aFileName) {
        File fileToDelete = new File(aFileName);
        if (fileToDelete.delete()) {
            System.out.println("File deleted successfully.");
        } else {
            System.out.println("Failed to delete the file.");
        }
    }
}
