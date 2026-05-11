package itb.java.examples.java13;

import org.junit.jupiter.api.Test;

import java.nio.ByteBuffer;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class ByteBufferSliceOverloadsTest {

    @Test
    void sliceReturnsExpectedRange() {
        ByteBuffer src = ByteBuffer.wrap(new byte[]{10, 20, 30, 40, 50});
        assertArrayEquals(new byte[]{20, 30, 40}, ByteBufferSliceOverloads.sliceTo(src, 1, 3));
    }

    @Test
    void sliceDoesNotAffectSourcePosition() {
        ByteBuffer src = ByteBuffer.wrap(new byte[]{10, 20, 30, 40, 50});
        ByteBufferSliceOverloads.sliceTo(src, 0, 2);
        assertArrayEquals(new byte[]{10, 20, 30, 40, 50}, src.array());
        assert src.position() == 0;
    }
}
