package itb.java.examples.java7;

public class CatchMultiple {

    /*

    https://docs.oracle.com/javase/7/docs/technotes/guides/language/catch-multiple.html

    Note: In case of catching multiple exceptions, if we are using super class,
    don’t use child class.
     */

    public static class FirstException extends Exception {
    }

    public static class SecondException extends Exception {
    }

    public static class ThirdException extends Exception {
    }

    public static void rethrowException(String exceptionName) throws FirstException, SecondException, ThirdException {
        switch (exceptionName) {
            case "First":
                throw new FirstException();
            case "Second":
                throw new SecondException();
            case "Third":
                throw new ThirdException();
            default:
                System.out.println("Nothing");
        }
    }


    public static void main(String[] args) {
        try {
            rethrowException("");
        } catch (FirstException | SecondException | ThirdException e) {
            // log and deal with all Exceptions
        }

        try {
            rethrowException("Second");
        } catch (FirstException e) {
            System.out.println("Exception First");
        } catch (SecondException | ThirdException e) {
            System.out.println("Exception Second or Third");
        }

    }

}
