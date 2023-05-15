package itb.java.examples.java7;

import java.util.ArrayList;
import java.util.List;

public class CreationWithTheDiamondOperator {

    /*
     https://docs.oracle.com/javase/7/docs/technotes/guides/language/type-inference-generic-instance-creation.html

     You can replace the type arguments required to invoke the constructor of a generic class
     with an empty set of type parameters (<>) as long as the compiler can infer the type arguments from the context.
     This pair of angle brackets is informally called the diamond.
     */

    public static void main(String[] args) {

        // Pre-JDK 7
        List<String> lst1 = new ArrayList<String>();
        // JDK 7 supports limited type inference for generic instance creation with diamond opeator <>
        List<String> lst2 = new ArrayList<>();

        lst1.add("Mon");
        lst1.add("Tue");
        lst2.add("Wed");
        lst2.add("Thu");

        for (String item : lst1) System.out.println(item);
        // Mon
        // Tue
        for (String item : lst2) System.out.println(item);
        // Wed
        // Thu

        //        List<String> lst3 = List.of("Fri", "Sat");  // JDK 9
        //        System.out.println(lst3);
        //        // [Fri, Sat]
        //        System.out.println(Arrays.toString(lst3.toArray()));
        //        // [Fri, Sat]
        //        lst3.forEach(System.out::println);   // JDK 8
        //        // Fri
        //        // Sat

    }

}
