package itb.java.examples.java19;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

/** {@code Future.state()} + {@link Future.State} enum — inspect a future's lifecycle
 *  position (RUNNING / SUCCESS / FAILED / CANCELLED) without polling exception/value. */
public class FutureStateDemo {

    public static void main(String[] args) throws Exception {
        CompletableFuture<String> done = CompletableFuture.completedFuture("ok");
        System.out.println("done: " + done.state());

        CompletableFuture<String> failed = CompletableFuture.failedFuture(new RuntimeException("nope"));
        System.out.println("failed: " + failed.state());

        CompletableFuture<String> running = new CompletableFuture<>();
        System.out.println("running: " + running.state());
        running.complete("late");
        System.out.println("after complete: " + running.state());
    }

    public static Future.State stateOf(Future<?> f) {
        return f.state();
    }
}
