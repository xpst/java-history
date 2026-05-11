package itb.java.examples.java19;

import org.junit.jupiter.api.Test;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FutureStateDemoTest {

    @Test
    void completedFutureReportsSuccess() {
        assertEquals(Future.State.SUCCESS, FutureStateDemo.stateOf(CompletableFuture.completedFuture("x")));
    }

    @Test
    void failedFutureReportsFailed() {
        assertEquals(Future.State.FAILED, FutureStateDemo.stateOf(CompletableFuture.failedFuture(new RuntimeException())));
    }

    @Test
    void pendingFutureReportsRunning() {
        assertEquals(Future.State.RUNNING, FutureStateDemo.stateOf(new CompletableFuture<>()));
    }
}
