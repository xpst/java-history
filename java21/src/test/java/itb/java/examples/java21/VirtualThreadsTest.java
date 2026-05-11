package itb.java.examples.java21;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class VirtualThreadsTest {

    @Test
    void allSubmittedTasksComplete() {
        assertEquals(500, VirtualThreads.runManyTinyTasks(500));
    }
}
