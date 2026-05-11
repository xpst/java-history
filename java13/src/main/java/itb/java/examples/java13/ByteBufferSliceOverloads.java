package itb.java.examples.java13;

import java.nio.ByteBuffer;

/** New {@code ByteBuffer.slice(int, int)} overload — produce a slice for an explicit
 *  index range without first {@code position}/{@code limit} dance. */
public class ByteBufferSliceOverloads {

    public static void main(String[] args) {
        byte[] data = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        ByteBuffer buf = ByteBuffer.wrap(data);

        ByteBuffer middle = buf.slice(3, 4);
        System.out.println("position=" + middle.position() + " limit=" + middle.limit() + " capacity=" + middle.capacity());
        while (middle.hasRemaining()) {
            System.out.print(middle.get() + " ");
        }
        System.out.println();
    }

    public static byte[] sliceTo(ByteBuffer src, int index, int length) {
        ByteBuffer slice = src.slice(index, length);
        byte[] out = new byte[slice.remaining()];
        slice.get(out);
        return out;
    }
}
