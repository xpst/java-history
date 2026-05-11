package itb.java.examples.java12;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CompactNumberFormattingTest {

    @Test
    void shortFormUsesAbbreviations() {
        assertEquals("1.5K", CompactNumberFormatting.shortEn(1_500));
        assertEquals("2.3M", CompactNumberFormatting.shortEn(2_300_000));
    }

    @Test
    void longFormSpellsOutScale() {
        assertEquals("1 thousand", CompactNumberFormatting.longEn(1_000));
    }
}
