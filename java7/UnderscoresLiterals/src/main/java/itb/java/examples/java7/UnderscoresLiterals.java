package itb.java.examples.java7;

public class UnderscoresLiterals {

    /*
     https://docs.oracle.com/javase/7/docs/technotes/guides/language/underscores-literals.html

     In Java SE 7 and later, any number of underscore characters (_) can appear anywhere between digits in a numerical literal. This feature enables you, for example, to separate groups of digits in numeric literals, which can improve the readability of your code.

     You can place underscores only between digits; you cannot place underscores in the following places:
       - At the beginning or end of a number
       - Adjacent to a decimal point in a floating point literal
       - Prior to an F or L suffix
       - In positions where a string of digits is expected
     */

    public static void main(String[] args) {

        long creditCardNumber = 1234_5678_9012_3456L;
        long socialSecurityNumber = 999_99_9999L;
        float pi = 	3.14_15F;
        long hexBytes = 0xFF_EC_DE_5E;
        long hexWords = 0xCAFE_BABE;
        long maxLong = 0x7fff_ffff_ffff_ffffL;
        byte nybbles = 0b0010_0101;
        long bytes = 0b11010010_01101001_10010100_10010010;


        // The following examples demonstrate valid and invalid underscore placements (which are highlighted) in numeric literals:

        //float pi1 = 3_.1415F;      // Invalid; cannot put underscores adjacent to a decimal point
        //float pi2 = 3._1415F;      // Invalid; cannot put underscores adjacent to a decimal point
        //long socialSecurityNumber1 = 999_99_9999_L;         // Invalid; cannot put underscores prior to an L suffix

        //int x1 = _52;              // This is an identifier, not a numeric literal
        int x2 = 5_2;              // OK (decimal literal)
        //int x3 = 52_;              // Invalid; cannot put underscores at the end of a literal
        int x4 = 5_______2;        // OK (decimal literal)

        //int x5 = 0_x52;            // Invalid; cannot put underscores in the 0x radix prefix
        //int x6 = 0x_52;            // Invalid; cannot put underscores at the beginning of a number
        int x7 = 0x5_2;            // OK (hexadecimal literal)
        //int x8 = 0x52_;            // Invalid; cannot put underscores at the end of a number

        int x9 = 0_52;             // OK (octal literal)
        int x10 = 05_2;            // OK (octal literal)
        //int x11 = 052_;            // Invalid; cannot put underscores at the end of a number


        // Some 32-bit 'int' literal values
        int anInt1 = 0b0101_0000_1010_0010_1101_0000_1010_0010;
        int anInt2 = 0b0011_1000;

        // An 8-bit 'byte' literal value. By default, literal values are 'int'.
        // Need to cast to 'byte'
        byte aByte = (byte)0b0110_1101;

        // A 16-bit 'short' literal value
        short aShort = (short)0b0111_0101_0000_0101;

        // A 64-bit 'long' literal value. Long literals requires suffix "L".
        long aLong = 0b1000_0101_0001_0110_1000_0101_0000_1010_0010_1101_0100_0101_1010_0001_0100_0101L;

        // Formatted output: "%d" for integer in decimal, "%x" in hexadecimal, "%o" in octal.
        // Take note that "%b" prints true or false (for null), NOT binary.
        System.out.printf("%d(%x)(%o)(%b)\n", anInt1, anInt1, anInt1, anInt1);
        System.out.printf("%d(%x)(%o)(%b)\n", aByte, aByte, aByte, aByte);

    }

}
