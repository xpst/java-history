package itb.java.examples.java10;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/** {@code List.copyOf}, {@code Set.copyOf}, {@code Map.copyOf} — produce a
 *  truly unmodifiable, type-correct snapshot of any source collection. */
public class CopyOfCollections {

    public static void main(String[] args) {
        var mutable = new ArrayList<>(List.of("a", "b", "c"));
        var snapshot = List.copyOf(mutable);

        mutable.add("d");
        System.out.println("mutable=" + mutable);
        System.out.println("snapshot=" + snapshot);

        var src = new HashMap<String, Integer>();
        src.put("x", 1);
        var snap = Map.copyOf(src);
        src.put("y", 2);
        System.out.println("snap=" + snap);
    }

    public static List<String> snapshot(List<String> source) {
        return List.copyOf(source);
    }

    public static Set<Integer> snapshotSet(Set<Integer> source) {
        return Set.copyOf(source);
    }
}
