package itb.java.examples.java14;

/** Switch expressions — switch as an expression, with arrow form (no fall-through)
 *  and {@code yield} for multi-statement branches. */
public class SwitchExpressions {

    enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }

    public static void main(String[] args) {
        for (Day d : Day.values()) {
            System.out.println(d + " → " + categorize(d));
        }

        System.out.println("days in JAN: " + daysInMonth(1, 2024));
        System.out.println("days in FEB 2024 (leap): " + daysInMonth(2, 2024));
        System.out.println("days in FEB 2025: " + daysInMonth(2, 2025));
    }

    public static String categorize(Day d) {
        return switch (d) {
            case SAT, SUN -> "weekend";
            case MON, TUE, WED, THU, FRI -> "weekday";
        };
    }

    public static int daysInMonth(int month, int year) {
        return switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11 -> 30;
            case 2 -> {
                boolean leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
                yield leap ? 29 : 28;
            }
            default -> throw new IllegalArgumentException("invalid month: " + month);
        };
    }
}
