package itb.java.examples.java19;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ExecutorServiceAutoCloseTest {

    @Test
    void allSubmittedTasksRunBeforePoolCloses() {
        assertEquals(20, ExecutorServiceAutoClose.runAndCount(20));
    }
}
