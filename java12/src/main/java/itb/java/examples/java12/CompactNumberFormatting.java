package itb.java.examples.java12;

import java.text.NumberFormat;
import java.util.Locale;

/** {@link NumberFormat#getCompactNumberInstance} — locale-aware compact rendering
 *  like "1.5K" or "2.3M". */
public class CompactNumberFormatting {

    public static void main(String[] args) {
        NumberFormat enShort = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.SHORT);
        NumberFormat enLong = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.LONG);

        System.out.println(enShort.format(1_500));
        System.out.println(enShort.format(2_300_000));
        System.out.println(enLong.format(2_300_000));
    }

    public static String shortEn(long value) {
        NumberFormat fmt = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.SHORT);
        fmt.setMaximumFractionDigits(1);
        return fmt.format(value);
    }

    public static String longEn(long value) {
        return NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.LONG).format(value);
    }
}
