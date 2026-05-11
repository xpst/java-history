package itb.java.examples.java21;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.SequencedCollection;
import java.util.SequencedMap;
import java.util.SequencedSet;

/** Sequenced collections (final, JEP 431) — uniform first/last/reverse access across
 *  any ordered collection via {@link SequencedCollection}, {@link SequencedSet},
 *  {@link SequencedMap}. */
public class SequencedCollections {

    public static void main(String[] args) {
        SequencedCollection<String> list = new ArrayList<>(List.of("alpha", "bravo", "charlie"));
        list.addFirst("aardvark");
        list.addLast("delta");
        System.out.println("first=" + list.getFirst() + " last=" + list.getLast());
        System.out.println("reversed: " + list.reversed());

        SequencedSet<Integer> set = new LinkedHashSet<>(List.of(10, 20, 30));
        set.addFirst(5);
        System.out.println("set first=" + set.getFirst() + " last=" + set.getLast());

        SequencedMap<String, Integer> map = new LinkedHashMap<>();
        map.put("b", 2);
        map.put("c", 3);
        map.putFirst("a", 1);
        map.putLast("d", 4);
        System.out.println("map firstEntry=" + map.firstEntry() + " lastEntry=" + map.lastEntry());
    }

    public static <E> E firstOf(SequencedCollection<E> sc) {
        return sc.getFirst();
    }

    public static <E> E lastOf(SequencedCollection<E> sc) {
        return sc.getLast();
    }
}
