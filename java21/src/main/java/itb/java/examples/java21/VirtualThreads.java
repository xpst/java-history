package itb.java.examples.java21;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

/** Virtual threads (final, JEP 444) — lightweight user-mode threads managed by the
 *  JVM, ideal for I/O-bound concurrent workloads. */
public class VirtualThreads {

    public static void main(String[] args) throws InterruptedException {
        AtomicInteger counter = new AtomicInteger();
        try (ExecutorService pool = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 10_000; i++) {
                pool.submit(() -> {
                    try {
                        Thread.sleep(1);
                    } catch (InterruptedException ignore) {
                        Thread.currentThread().interrupt();
                    }
                    counter.incrementAndGet();
                });
            }
        }
        System.out.println("ran " + counter.get() + " virtual-thread tasks");
        System.out.println("currently virtual? " + Thread.currentThread().isVirtual());
    }

    /** Run {@code count} tiny tasks on a virtual-thread executor and return the
     *  count of completions (which should equal {@code count}). */
    public static int runManyTinyTasks(int count) {
        AtomicInteger done = new AtomicInteger();
        try (ExecutorService pool = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < count; i++) {
                pool.submit(done::incrementAndGet);
            }
        }
        return done.get();
    }
}
