package itb.java.examples.java14;

/** Helpful NullPointerExceptions (JEP 358) — the JVM now names the variable, method,
 *  and array index involved in a chained dereference that produced a {@code null}. */
public class HelpfulNullPointerExceptions {

    public static class Address { public String city; }
    public static class Customer { public Address address; }
    public static class Order { public Customer customer; }

    public static void main(String[] args) {
        Order order = new Order();
        order.customer = new Customer();
        try {
            int len = order.customer.address.city.length();
            System.out.println(len);
        } catch (NullPointerException e) {
            System.out.println("got: " + e.getMessage());
        }
    }

    /** Trigger the NPE inside a nested dereference and return the JVM's helpful message. */
    public static String triggerAndReport(Order order) {
        try {
            order.customer.address.city.length();
            return "no NPE";
        } catch (NullPointerException e) {
            return e.getMessage();
        }
    }
}
