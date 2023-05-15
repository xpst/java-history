import org.junit.Assert;
import org.junit.Test;

public class TestUnderscoresLiterals {
    @Test
    public void test() {

        //Underscore in integral literal
        int a = 10_000;
        System.out.println("a = " + a);
        //Underscore in floating literal
        float b = 30.5_000f;
        System.out.println("b = " + b);
        //Underscore in binary literal
        int c = 0B10_10;
        System.out.println("c = " + c);
        //Underscore in hexadecimal literal
        int d = 0x1_1;
        System.out.println("d = " + d);
        //Underscore in octal literal
        int e = 01_1;
        System.out.println("e = " + e);
    }


    @Test
    public void testNumericLiterals() {
        int million = 1_000_000;
        long billion = 1_000_000_000L;
        double pi = 3.14_15_93;

        Assert.assertEquals(1000000, million);
        Assert.assertEquals(1000000000L, billion);
        Assert.assertEquals(3.141593, pi, 0.000001);
    }
}
