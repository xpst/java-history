import org.junit.Test;

public class TestCatchMultiple {
    @Test
    public void test() {
        try {
            int array[] = new int[5];
            array[5] = 20 / 0;
        } catch (ArithmeticException | ArrayIndexOutOfBoundsException e) {
            System.out.println(e.getMessage());
        }
    }
}
