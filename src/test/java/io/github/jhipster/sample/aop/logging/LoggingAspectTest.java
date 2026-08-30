package io.github.jhipster.sample.aop.logging;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.read.ListAppender;
import java.util.List;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

class LoggingAspectTest {

    private static final String DECLARING_TYPE = "io.github.jhipster.sample.service.LoggedService";
    private static final String METHOD = "loggedMethod";

    private final Environment env = mock(Environment.class);
    private final ProceedingJoinPoint joinPoint = mock(ProceedingJoinPoint.class);
    private final ListAppender<ILoggingEvent> appender = new ListAppender<>();
    private LoggingAspect aspect;
    private Logger logger;

    @BeforeEach
    void setup() {
        Signature signature = mock(Signature.class);
        when(signature.getDeclaringTypeName()).thenReturn(DECLARING_TYPE);
        when(signature.getName()).thenReturn(METHOD);
        when(joinPoint.getSignature()).thenReturn(signature);
        when(joinPoint.getArgs()).thenReturn(new Object[] { "arg" });
        when(env.acceptsProfiles(any(Profiles.class))).thenReturn(true);

        logger = (Logger) LoggerFactory.getLogger(DECLARING_TYPE);
        logger.setLevel(Level.DEBUG);
        appender.start();
        logger.addAppender(appender);

        aspect = new LoggingAspect(env);
    }

    @AfterEach
    void teardown() {
        logger.detachAppender(appender);
        logger.setLevel(null);
    }

    private List<String> messages() {
        return appender.list.stream().map(ILoggingEvent::getFormattedMessage).toList();
    }

    @Test
    void logAroundLogsEnterAndExit() throws Throwable {
        when(joinPoint.proceed()).thenReturn("result");

        Object result = aspect.logAround(joinPoint);

        assertThat(result).isEqualTo("result");
        assertThat(messages()).containsExactly(
            "Enter: loggedMethod() with argument[s] = [arg]",
            "Exit: loggedMethod() with result = result"
        );
    }

    @Test
    void logAroundRethrowsIllegalArgumentException() throws Throwable {
        when(joinPoint.proceed()).thenThrow(new IllegalArgumentException("invalid"));

        assertThatThrownBy(() -> aspect.logAround(joinPoint))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("invalid");

        assertThat(messages()).contains("Illegal argument: [arg] in loggedMethod()");
    }

    @Test
    void logAroundRethrowsAndLogsExceptions() throws Throwable {
        when(joinPoint.proceed()).thenThrow(new IllegalStateException("failed"));

        assertThatThrownBy(() -> aspect.logAround(joinPoint))
            .isInstanceOf(IllegalStateException.class)
            .hasMessage("failed");

        assertThat(messages()).contains("Exception in loggedMethod() with cause = 'NULL' and exception = 'failed'");
    }

    @Test
    void logAroundLogsMonoResultWhenItCompletes() throws Throwable {
        when(joinPoint.proceed()).thenReturn(Mono.just("result"));

        Object result = aspect.logAround(joinPoint);

        assertThat(result).isInstanceOf(Mono.class);
        assertThat(messages()).containsExactly("Enter: loggedMethod() with argument[s] = [arg]");

        assertThat(((Mono<?>) result).block()).isEqualTo("result");
        assertThat(messages()).containsExactly(
            "Enter: loggedMethod() with argument[s] = [arg]",
            "Exit: loggedMethod() with result = result"
        );
    }

    @Test
    void logAroundLogsFluxCompletion() throws Throwable {
        when(joinPoint.proceed()).thenReturn(Flux.just("first", "second"));

        Object result = aspect.logAround(joinPoint);

        assertThat(result).isInstanceOf(Flux.class);
        assertThat(((Flux<?>) result).cast(String.class).collectList().block()).containsExactly("first", "second");
        assertThat(messages()).containsExactly(
            "Enter: loggedMethod() with argument[s] = [arg]",
            "Exit: loggedMethod() with result = completed"
        );
    }

    @Test
    void logAroundLogsMonoErrors() throws Throwable {
        when(joinPoint.proceed()).thenReturn(Mono.error(new IllegalStateException("failed")));

        Object result = aspect.logAround(joinPoint);

        assertThatThrownBy(() -> ((Mono<?>) result).block())
            .isInstanceOf(IllegalStateException.class)
            .hasMessage("failed");
        assertThat(messages()).contains("Exception in loggedMethod() with cause = 'NULL' and exception = 'failed'");
    }

    @Test
    void logAroundLogsMonoIllegalArgumentErrors() throws Throwable {
        when(joinPoint.proceed()).thenReturn(Mono.error(new IllegalArgumentException("invalid")));

        Object result = aspect.logAround(joinPoint);

        assertThatThrownBy(() -> ((Mono<?>) result).block()).isInstanceOf(IllegalArgumentException.class);
        assertThat(messages()).contains("Illegal argument: [arg] in loggedMethod()");
    }

    @Test
    void logAroundLogsExceptionsWithoutStackTraceOutsideDevProfile() throws Throwable {
        when(env.acceptsProfiles(any(Profiles.class))).thenReturn(false);
        when(joinPoint.proceed()).thenReturn(Mono.error(new IllegalStateException("failed", new RuntimeException("root"))));

        Object result = aspect.logAround(joinPoint);

        assertThatThrownBy(() -> ((Mono<?>) result).block()).isInstanceOf(IllegalStateException.class);
        assertThat(messages()).contains("Exception in loggedMethod() with cause = java.lang.RuntimeException: root");
        assertThat(appender.list).allSatisfy(event -> assertThat(event.getThrowableProxy()).isNull());
    }
}
