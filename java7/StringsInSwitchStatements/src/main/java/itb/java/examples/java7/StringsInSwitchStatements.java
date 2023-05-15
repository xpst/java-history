package itb.java.examples.java7;

public class StringsInSwitchStatements {

    /*
    https://docs.oracle.com/javase/7/docs/technotes/guides/language/strings-switch.html
    https://www.w3schools.blog/java-7-string-in-switch-case-statement
    */

    public static void main(String[] args) {
        boolean create = false;
        boolean verbose = false;
        boolean debug = false;

        for (String arg : args) {
            switch (arg) {
                case "-c":
                    create = true;
                    break;
                case "-v":
                    verbose = true;
                    break;
                case "-d":
                    debug = true;
                    break;
                default:
                    System.out.println("invalid option");
                    System.exit(1);
            }
        }

        System.out.println("create: " + create);
        System.out.println("verbose: " + verbose);
        System.out.println("debug: " + debug);


        String game = "java";
        switch (game) {
            case "sql":
                System.out.println("Learn sql");
                break;
            case "java":
                System.out.println("Learn java");
                break;
            case "angularjs":
                System.out.println("Learn angularjs");
                break;
            default:
                System.out.println("invalid option");
        }
    }

    public static String getTypeOfDayWithSwitchStatement(String aDayOfWeekArg) {
        String typeOfDay;
        switch (aDayOfWeekArg) {
            case "Monday":
                typeOfDay = "Start of work week";
                break;
            case "Tuesday":
            case "Wednesday":
            case "Thursday":
                typeOfDay = "Midweek";
                break;
            case "Friday":
                typeOfDay = "End of work week";
                break;
            case "Saturday":
            case "Sunday":
                typeOfDay = "Weekend";
                break;
            default:
                throw new IllegalArgumentException("Invalid day of the week: " + aDayOfWeekArg);
        }
        return typeOfDay;
    }

}
