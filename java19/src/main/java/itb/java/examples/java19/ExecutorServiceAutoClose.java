package itb.java.examples.java19;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

/** {@link ExecutorService} as {@link AutoCloseable} — try-with-resources cleanly
 *  shuts the pool down and awaits termination, replacing the manual
 *  shutdown / awaitTermination pattern in most call sites. */
public class ExecutorServiceAutoClose {

    public static void main(String[] args) {
        AtomicInteger counter = new AtomicInteger();
        try (ExecutorService pool = Executors.newFixedThreadPool(4)) {
            for (int i = 0; i < 8; i++) {
                pool.submit(counter::incrementAndGet);
            }
        }
        System.out.println("final count: " + counter.get());
    }

    public static int runAndCount(int tasks) {
        AtomicInteger counter = new AtomicInteger();
        try (ExecutorService pool = Executors.newFixedThreadPool(4)) {
            for (int i = 0; i < tasks; i++) {
                pool.submit(counter::incrementAndGet);
            }
        }
        return counter.get();
    }
}
