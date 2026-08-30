package io.github.jhipster.sample.aop.logging;

import java.util.Arrays;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.config.JHipsterConstants;

/**
 * Aspect for logging execution of service and repository Spring components.
 *
 * Reactive return types ({@link Mono} and {@link Flux}) are logged when they terminate, since the
 * advised method only assembles the pipeline and returns immediately.
 *
 * By default, it only runs with the "dev" profile.
 */
@Aspect
public class LoggingAspect {

    private final Environment env;

    public LoggingAspect(Environment env) {
        this.env = env;
    }

    /**
     * Pointcut that matches all repositories, services and Web REST endpoints.
     */
    @Pointcut(
        """
        within(@org.springframework.stereotype.Repository *)
        || within(@org.springframework.stereotype.Service *)
        || within(@org.springframework.web.bind.annotation.RestController *)
        """
    )
    public void springBeanPointcut() {
        // Method is empty as this is just a Pointcut, the implementations are in the advice methods.
    }

    /**
     * Pointcut that matches all Spring beans in the application's main packages.
     */
    @Pointcut(
        """
        within(io.github.jhipster.sample.repository..*)
        || within(io.github.jhipster.sample.service..*)
        || within(io.github.jhipster.sample.web.rest..*)
        """
    )
    public void applicationPackagePointcut() {
        // Method is empty as this is just a Pointcut, the implementations are in the advice methods.
    }

    /**
     * Retrieves the {@link Logger} associated to the given {@link JoinPoint}.
     *
     * @param joinPoint join point we want the logger for.
     * @return {@link Logger} associated to the given {@link JoinPoint}.
     */
    private Logger logger(JoinPoint joinPoint) {
        return LoggerFactory.getLogger(joinPoint.getSignature().getDeclaringTypeName());
    }

    /**
     * Advice that logs when a method is entered and exited, and methods throwing exceptions.
     *
     * For reactive return types, the exit or the error is logged when the returned publisher terminates.
     * Errors are handled here instead of an after throwing advice, which cannot access its join point when the
     * method is invoked lazily by the reactive transaction interceptor, outside the AOP invocation frame.
     *
     * @param joinPoint join point for advice.
     * @return result.
     * @throws Throwable rethrows the exception thrown by the advised method.
     */
    @Around("applicationPackagePointcut() && springBeanPointcut()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        var log = logger(joinPoint);
        if (log.isDebugEnabled()) {
            log.debug("Enter: {}() with argument[s] = {}", joinPoint.getSignature().getName(), Arrays.toString(joinPoint.getArgs()));
        }
        try {
            Object result = joinPoint.proceed();
            if (result instanceof Mono<?> mono) {
                return mono.doOnSuccess(value -> logExit(log, joinPoint, value)).doOnError(e -> logError(log, joinPoint, e));
            }
            if (result instanceof Flux<?> flux) {
                return flux.doOnComplete(() -> logExit(log, joinPoint, "completed")).doOnError(e -> logError(log, joinPoint, e));
            }
            logExit(log, joinPoint, result);
            return result;
        } catch (Throwable e) {
            logError(log, joinPoint, e);
            throw e;
        }
    }

    private void logExit(Logger log, JoinPoint joinPoint, Object result) {
        if (log.isDebugEnabled()) {
            log.debug("Exit: {}() with result = {}", joinPoint.getSignature().getName(), result);
        }
    }

    private void logError(Logger log, JoinPoint joinPoint, Throwable e) {
        if (e instanceof IllegalArgumentException) {
            logIllegalArgument(log, joinPoint);
        } else {
            logException(joinPoint, e);
        }
    }

    private void logIllegalArgument(Logger log, JoinPoint joinPoint) {
        if (log.isErrorEnabled()) {
            log.error("Illegal argument: {} in {}()", Arrays.toString(joinPoint.getArgs()), joinPoint.getSignature().getName());
        }
    }

    private void logException(JoinPoint joinPoint, Throwable e) {
        if (env.acceptsProfiles(Profiles.of(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT))) {
            logger(joinPoint).error(
                "Exception in {}() with cause = '{}' and exception = '{}'",
                joinPoint.getSignature().getName(),
                e.getCause() != null ? e.getCause() : "NULL",
                e.getMessage(),
                e
            );
        } else {
            logger(joinPoint).error(
                "Exception in {}() with cause = {}",
                joinPoint.getSignature().getName(),
                e.getCause() != null ? String.valueOf(e.getCause()) : "NULL"
            );
        }
    }
}
