package io.github.jhipster.sample;

import java.util.Collections;
import java.util.concurrent.atomic.AtomicBoolean;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.extension.BeforeAllCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.utility.DockerImageName;

public class ReactiveSqlTestContainerExtension implements BeforeAllCallback {

    private static AtomicBoolean started = new AtomicBoolean(false);

    private static MySQLContainer<?> container = new MySQLContainer<>(DockerImageName.parse("mysql:8.0.27"))
        .withDatabaseName("jhipsterSampleGateway")
        .withTmpFs(Collections.singletonMap("/testtmpfs", "rw"));

    @Override
    public void beforeAll(ExtensionContext extensionContext) throws Exception {
        if (!started.get() && useTestcontainers()) {
            container.start();
            System.setProperty("spring.r2dbc.url", container.getJdbcUrl().replace("jdbc", "r2dbc"));
            System.setProperty("spring.r2dbc.username", container.getUsername());
            System.setProperty("spring.r2dbc.password", container.getPassword());
            System.setProperty("spring.liquibase.url", container.getJdbcUrl());
            System.setProperty("spring.liquibase.user", container.getUsername());
            System.setProperty("spring.liquibase.password", container.getPassword());
            started.set(true);
        }
    }

    private boolean useTestcontainers() {
        String systemProperties = StringUtils.defaultIfBlank(System.getProperty("spring.profiles.active"), "");
        String environmentVariables = StringUtils.defaultIfBlank(System.getenv("SPRING_PROFILES_ACTIVE"), "");

        return systemProperties.contains("testcontainers") || environmentVariables.contains("testcontainers");
    }
}
