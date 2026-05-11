package itb.java.examples.java7;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class BinaryLiteralsTest {

    @Test
    void binaryAndHexLiteralsAreEqual() {
        int[] phasesBinary = {
                0b00110001,
                0b01100010,
                0b11000100,
                0b10001001,
                0b00010011,
                0b00100110,
                0b01001100,
                0b10011000
        };
        int[] phasesHex = {0x31, 0x62, 0xC4, 0x89, 0x13, 0x26, 0x4C, 0x98};

        assertArrayEquals(phasesBinary, phasesHex);
    }
}
