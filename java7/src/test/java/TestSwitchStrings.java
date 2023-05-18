import org.junit.Assert;
import org.junit.Test;

import static itb.java.examples.java7.StringsInSwitchStatements.getTypeOfDayWithSwitchStatement;

public class TestSwitchStrings {

    @Test
    public void testDaysByShortName() {
        String day = "SAT";
        String fullDay = null;
        switch (day) {   // switch on String selector
            case "MON":
                fullDay = "Monday";
                break;
            case "TUE":
                fullDay = "Tuesday";
                break;
            case "WED":
                fullDay = "Wednesday";
                break;
            case "THU":
                fullDay = "Thursday";
                break;
            case "FRI":
                fullDay = "Friday";
                break;
            case "SAT":
                fullDay = "Saturday";
                break;
            case "SUN":
                fullDay = "Sunday";
                break;
            default:
                fullDay = "Invalid";
        }
        System.out.println(fullDay);
        Assert.assertEquals("Saturday", fullDay);

    }

    @Test
    public void testWeekDay() {
        String monday = getTypeOfDayWithSwitchStatement("Saturday");
        System.out.println(monday);
        Assert.assertEquals("Weekend", monday);
    }

    @Test
    public void testStringSwitch() {
        String fruit = "apple";
        String result;

        switch (fruit) {
            case "apple":
                result = "It's an apple";
                break;
            case "banana":
                result = "It's a banana";
                break;
            case "orange":
                result = "It's an orange";
                break;
            default:
                result = "Unknown fruit";
                break;
        }

        Assert.assertEquals("It's an apple", result);
    }

    @Test
    public void testStringSwitchStatus() {

        final String NEW = "newTrade";
        final String EXECUTE = "executeTrade";
        final String PENDING = "pendingTrade";

        String status = getStatus();
        String result = null;


        switch (status) {
            case NEW:
                result = "New Trade";
                break;
            case EXECUTE:
                result = "Execute Trade";
                break;
            case PENDING:
                result = "Pending Trade";
                break;
            default:
                break;
        }

        Assert.assertEquals("Execute Trade", result);
    }

    private String getStatus() {
        return "executeTrade";
    }

}
