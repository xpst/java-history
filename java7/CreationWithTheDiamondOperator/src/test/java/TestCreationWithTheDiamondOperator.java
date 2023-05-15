import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class TestCreationWithTheDiamondOperator {
    @Test
    public void test() {
        List<String> list = new ArrayList<>();
        list.add("A");

        // The following statement should fail since addAll expects
        // Collection<? extends String>

        //list.addAll(new ArrayList<>());


        // The following statements compile:
        List<? extends String> list2 = new ArrayList<>();
        list.addAll(list2);
    }
}
