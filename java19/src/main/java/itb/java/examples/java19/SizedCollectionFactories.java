package itb.java.examples.java19;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.WeakHashMap;

/** Sized collection factories — {@code HashMap.newHashMap(int)} and friends create
 *  hash-backed containers correctly pre-sized for the expected number of mappings,
 *  doing the {@code initialCapacity = ceil(n / loadFactor)} math for you. */
public class SizedCollectionFactories {

    public static void main(String[] args) {
        HashMap<String, Integer> m = HashMap.newHashMap(100);
        HashSet<String> s = HashSet.newHashSet(50);
        LinkedHashMap<String, String> l = LinkedHashMap.newLinkedHashMap(20);
        WeakHashMap<Object, Object> w = WeakHashMap.newWeakHashMap(10);

        System.out.println(m.getClass().getSimpleName() + " sized for 100");
        System.out.println(s.getClass().getSimpleName() + " sized for 50");
        System.out.println(l.getClass().getSimpleName() + " sized for 20");
        System.out.println(w.getClass().getSimpleName() + " sized for 10");
    }

    public static <K, V> HashMap<K, V> mapForExpectedSize(int expected) {
        return HashMap.newHashMap(expected);
    }
}
